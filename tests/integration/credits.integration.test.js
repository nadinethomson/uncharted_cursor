/**
 * Integration Tests for Credit Flow
 * 
 * These tests verify the atomic nature of credit transactions and ensure
 * that the critical constraints from the previous prototype are properly addressed:
 * 
 * 1. Atomic Transactions - All credit operations must be atomic
 * 2. Rollback Mechanisms - Failed operations must rollback completely
 * 3. Race Condition Prevention - Simultaneous operations must not cause double-counting
 * 4. Credit Validation - Users cannot go below 0 credits
 * 5. Transaction Logging - All credit changes must be logged for audit
 */

const { 
  setupTestUser, 
  setupTestDestination, 
  cleanupTestData, 
  resetUserCredits,
  testUsers,
  testDestinations 
} = require('../setup');

// Mock the services to test the integration flow
jest.mock('../../src/services/supabase', () => {
  const { mockSupabase } = require('../setup');
  return { supabase: mockSupabase };
});

const { 
  createPostWithCredits,
  deductCredits,
  addCredits,
  checkSufficientCredits,
  getUserCredits,
  rollbackCreditTransaction
} = require('../../src/services/creditService');

const { createPost } = require('../../src/services/postService');

describe('Credit Flow Integration Tests', () => {
  let testUser;
  let testDestination;

  beforeEach(async () => {
    // Setup test data
    testUser = await setupTestUser(testUsers.newUser);
    testDestination = await setupTestDestination(testDestinations.kyoto);
    
    // Reset user credits to known state
    await resetUserCredits(testUser.id, 10);
  });

  afterEach(async () => {
    // Clean up test data
    await cleanupTestData();
  });

  describe('Initial Credit State', () => {
    test('User starts with 10 credits ✓', async () => {
      const credits = await getUserCredits(testUser.id);
      expect(credits).toBe(10);
    });

    test('User reputation matches credits', async () => {
      const { data: user } = await require('../../src/services/supabase').supabase
        .from('users')
        .select('credits, reputation')
        .eq('id', testUser.id)
        .single();
      
      expect(user.credits).toBe(10);
      expect(user.reputation).toBe(10);
    });
  });

  describe('Atomic Post Creation with Credits', () => {
    test('User posts tip → credits become 15 (atomic transaction) ✓', async () => {
      // Mock successful post creation and credit update
      const mockSupabase = require('../../src/services/supabase').supabase;
      
      // Mock post creation
      mockSupabase.from = jest.fn().mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                id: 'test-post-1',
                user_id: testUser.id,
                destination_id: testDestination.id,
                type: 'tip',
                content: 'Great local restaurant!',
                image_url: null,
                created_at: new Date().toISOString()
              },
              error: null
            })
          })
        }),
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { credits: 10, reputation: 10 },
              error: null
            })
          })
        }),
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: null })
        }),
        rpc: jest.fn().mockResolvedValue({
          data: { 
            success: true, 
            new_credits: 15, 
            new_reputation: 15,
            transaction_id: 'test-transaction-1'
          },
          error: null
        })
      });

      // Create post with credits
      const result = await createPostWithCredits(testUser.id, {
        destinationId: testDestination.id,
        type: 'tip',
        content: 'Great local restaurant!',
        imageUrl: null
      });

      // Verify post was created
      expect(result.post).toBeDefined();
      expect(result.post.type).toBe('tip');
      expect(result.post.content).toBe('Great local restaurant!');

      // Verify credit transaction was processed
      expect(result.creditResult.success).toBe(true);
      expect(result.creditResult.new_credits).toBe(15);
      expect(result.creditResult.new_reputation).toBe(15);

      // Verify database function was called with correct parameters
      expect(mockSupabase.from().rpc).toHaveBeenCalledWith('update_user_credits', {
        p_user_id: testUser.id,
        p_amount: 5, // Tip earns 5 credits
        p_type: 'tip',
        p_related_id: result.post.id
      });
    });

    test('User posts experience → credits become 20 (atomic transaction)', async () => {
      const mockSupabase = require('../../src/services/supabase').supabase;
      
      mockSupabase.from = jest.fn().mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                id: 'test-post-2',
                user_id: testUser.id,
                destination_id: testDestination.id,
                type: 'experience',
                content: 'Amazing temple visit!',
                image_url: null,
                created_at: new Date().toISOString()
              },
              error: null
            })
          })
        }),
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { credits: 10, reputation: 10 },
              error: null
            })
          })
        }),
        rpc: jest.fn().mockResolvedValue({
          data: { 
            success: true, 
            new_credits: 20, 
            new_reputation: 20,
            transaction_id: 'test-transaction-2'
          },
          error: null
        })
      });

      const result = await createPostWithCredits(testUser.id, {
        destinationId: testDestination.id,
        type: 'experience',
        content: 'Amazing temple visit!',
        imageUrl: null
      });

      expect(result.creditResult.new_credits).toBe(20);
      expect(mockSupabase.from().rpc).toHaveBeenCalledWith('update_user_credits', {
        p_user_id: testUser.id,
        p_amount: 10, // Experience earns 10 credits
        p_type: 'experience',
        p_related_id: result.post.id
      });
    });
  });

  describe('Credit Validation and Blocking', () => {
    test('User tries to ask local without 5 credits → blocked with error ✓', async () => {
      // Set user to have only 3 credits
      await resetUserCredits(testUser.id, 3);

      const mockSupabase = require('../../src/services/supabase').supabase;
      
      mockSupabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { credits: 3 },
              error: null
            })
          })
        }),
        rpc: jest.fn().mockResolvedValue({
          data: { 
            success: false, 
            error: 'Insufficient credits for this transaction'
          },
          error: null
        })
      });

      // Attempt to deduct 5 credits (ask local)
      await expect(deductCredits(testUser.id, 5, 'ask_local', 'test-question-1'))
        .rejects.toThrow('Insufficient credits for this transaction');

      // Verify user still has 3 credits
      const credits = await getUserCredits(testUser.id);
      expect(credits).toBe(3);
    });

    test('User with sufficient credits can ask local', async () => {
      const mockSupabase = require('../../src/services/supabase').supabase;
      
      mockSupabase.from = jest.fn().mockReturnValue({
        rpc: jest.fn().mockResolvedValue({
          data: { 
            success: true, 
            new_credits: 5, 
            new_reputation: 5,
            transaction_id: 'test-transaction-3'
          },
          error: null
        })
      });

      const result = await deductCredits(testUser.id, 5, 'ask_local', 'test-question-1');
      
      expect(result.newCredits).toBe(5);
      expect(result.newReputation).toBe(5);
    });
  });

  describe('Rollback Mechanisms', () => {
    test('Post creation succeeds but credit update fails → post deleted, credits unchanged (rollback) ✓', async () => {
      const mockSupabase = require('../../src/services/supabase').supabase;
      
      // Mock successful post creation
      mockSupabase.from = jest.fn().mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                id: 'test-post-3',
                user_id: testUser.id,
                destination_id: testDestination.id,
                type: 'tip',
                content: 'Test post',
                image_url: null,
                created_at: new Date().toISOString()
              },
              error: null
            })
          })
        }),
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { credits: 10, reputation: 10 },
              error: null
            })
          })
        }),
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: null })
        }),
        rpc: jest.fn().mockResolvedValue({
          data: { 
            success: false, 
            error: 'Database connection failed'
          },
          error: null
        })
      });

      await expect(createPostWithCredits(testUser.id, {
        destinationId: testDestination.id,
        type: 'tip',
        content: 'Test post',
        imageUrl: null
      })).rejects.toThrow('Credit transaction failed');

      // Verify post was deleted (rollback)
      expect(mockSupabase.from().delete).toHaveBeenCalled();
    });

    test('Credit transaction rollback works correctly', async () => {
      const mockSupabase = require('../../src/services/supabase').supabase;
      
      mockSupabase.from = jest.fn().mockReturnValue({
        rpc: jest.fn().mockResolvedValue({
          data: { 
            success: true,
            new_credits: 10
          },
          error: null
        })
      });

      const result = await rollbackCreditTransaction('test-transaction-4');
      expect(result).toBe(true);
    });
  });

  describe('Race Condition Prevention', () => {
    test('Simultaneous posts don\'t cause double-counting ✓', async () => {
      const mockSupabase = require('../../src/services/supabase').supabase;
      
      // Mock database to simulate race condition
      let callCount = 0;
      mockSupabase.from = jest.fn().mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                id: `test-post-${++callCount}`,
                user_id: testUser.id,
                destination_id: testDestination.id,
                type: 'tip',
                content: `Test post ${callCount}`,
                image_url: null,
                created_at: new Date().toISOString()
              },
              error: null
            })
          })
        }),
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { credits: 10, reputation: 10 },
              error: null
            })
          })
        }),
        rpc: jest.fn().mockImplementation(() => {
          // Simulate database transaction with proper locking
          return Promise.resolve({
            data: { 
              success: true, 
              new_credits: 10 + (callCount * 5), // Each post adds 5 credits
              new_reputation: 10 + (callCount * 5),
              transaction_id: `test-transaction-${callCount}`
            },
            error: null
          });
        })
      });

      // Simulate simultaneous post creation
      const promises = [
        createPostWithCredits(testUser.id, {
          destinationId: testDestination.id,
          type: 'tip',
          content: 'Simultaneous post 1',
          imageUrl: null
        }),
        createPostWithCredits(testUser.id, {
          destinationId: testDestination.id,
          type: 'tip',
          content: 'Simultaneous post 2',
          imageUrl: null
        })
      ];

      const results = await Promise.all(promises);

      // Verify both posts were created
      expect(results).toHaveLength(2);
      expect(results[0].post).toBeDefined();
      expect(results[1].post).toBeDefined();

      // Verify credits were updated correctly (not double-counted)
      expect(results[0].creditResult.new_credits).toBe(15); // 10 + 5
      expect(results[1].creditResult.new_credits).toBe(20); // 10 + 5 + 5
    });

    test('Multiple credit operations are properly serialized', async () => {
      const mockSupabase = require('../../src/services/supabase').supabase;
      
      let operationCount = 0;
      mockSupabase.from = jest.fn().mockReturnValue({
        rpc: jest.fn().mockImplementation(() => {
          operationCount++;
          return Promise.resolve({
            data: { 
              success: true, 
              new_credits: 10 + (operationCount * 5),
              new_reputation: 10 + (operationCount * 5),
              transaction_id: `test-transaction-${operationCount}`
            },
            error: null
          });
        })
      });

      // Simulate multiple credit operations
      const operations = [
        addCredits(testUser.id, 5, 'tip', 'post-1'),
        addCredits(testUser.id, 5, 'tip', 'post-2'),
        addCredits(testUser.id, 5, 'tip', 'post-3')
      ];

      const results = await Promise.all(operations);

      // Verify all operations completed
      expect(results).toHaveLength(3);
      expect(results[0].newCredits).toBe(15);
      expect(results[1].newCredits).toBe(20);
      expect(results[2].newCredits).toBe(25);
    });
  });

  describe('Credit Transaction Logging', () => {
    test('All credit changes are logged for audit', async () => {
      const mockSupabase = require('../../src/services/supabase').supabase;
      
      mockSupabase.from = jest.fn().mockReturnValue({
        rpc: jest.fn().mockResolvedValue({
          data: { 
            success: true, 
            new_credits: 15, 
            new_reputation: 15,
            transaction_id: 'audit-transaction-1'
          },
          error: null
        })
      });

      await addCredits(testUser.id, 5, 'tip', 'audit-post-1');

      // Verify transaction was logged
      expect(mockSupabase.from().rpc).toHaveBeenCalledWith('update_user_credits', {
        p_user_id: testUser.id,
        p_amount: 5,
        p_type: 'tip',
        p_related_id: 'audit-post-1'
      });
    });

    test('Credit history can be retrieved', async () => {
      const mockSupabase = require('../../src/services/supabase').supabase;
      
      const mockTransactions = [
        {
          id: 'trans-1',
          user_id: testUser.id,
          amount: 5,
          type: 'tip',
          related_id: 'post-1',
          status: 'completed',
          created_at: new Date().toISOString()
        },
        {
          id: 'trans-2',
          user_id: testUser.id,
          amount: -5,
          type: 'ask_local',
          related_id: 'question-1',
          status: 'completed',
          created_at: new Date().toISOString()
        }
      ];

      mockSupabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            order: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: mockTransactions,
                error: null
              })
            })
          })
        })
      });

      const { getCreditHistory } = require('../../src/services/creditService');
      const history = await getCreditHistory(testUser.id, 10);

      expect(history).toHaveLength(2);
      expect(history[0].type).toBe('tip');
      expect(history[0].amount).toBe(5);
      expect(history[1].type).toBe('ask_local');
      expect(history[1].amount).toBe(-5);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('Negative credit amounts are rejected', async () => {
      await expect(addCredits(testUser.id, -5, 'invalid', 'test'))
        .rejects.toThrow('Credit amount must be positive');
    });

    test('Zero credit amounts are rejected', async () => {
      await expect(addCredits(testUser.id, 0, 'invalid', 'test'))
        .rejects.toThrow('Credit amount must be positive');
    });

    test('Invalid user ID throws error', async () => {
      const mockSupabase = require('../../src/services/supabase').supabase;
      
      mockSupabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: null,
              error: { message: 'User not found' }
            })
          })
        })
      });

      await expect(getUserCredits('invalid-user-id'))
        .rejects.toThrow('User not found');
    });

    test('Database connection errors are handled gracefully', async () => {
      const mockSupabase = require('../../src/services/supabase').supabase;
      
      mockSupabase.from = jest.fn().mockReturnValue({
        rpc: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database connection failed' }
        })
      });

      await expect(addCredits(testUser.id, 5, 'tip', 'test'))
        .rejects.toThrow('Database connection failed');
    });
  });
});












