import { supabase } from './supabase';
import { AskALocal, CreateAskLocalData } from '../types';
import { executeCreditTransaction } from './creditService';
import { createAskAnsweredNotification } from './notificationService';

/**
 * Service for Ask a Local functionality
 * Handles question creation, answering, and retrieval
 */

/**
 * Creates a new Ask a Local question with credit deduction
 * 
 * @param userId - User ID creating the question
 * @param questionData - Question creation data
 * @returns Promise<{question: AskALocal, creditResult: any}> - Created question and credit result
 * 
 * @throws {Error} If question creation fails or insufficient credits
 */
export async function createAskLocalQuestion(userId: string, questionData: CreateAskLocalData): Promise<{question: AskALocal, creditResult: any}> {
  try {
    // First, deduct credits atomically
    const creditResult = await executeCreditTransaction(userId, {
      destinationId: questionData.destinationId,
      type: 'ask_local',
      content: questionData.question,
      imageUrl: undefined
    });

    if (!creditResult || !creditResult.success) {
      throw new Error(creditResult?.error || 'Failed to process credit transaction');
    }

    // Then create the question
    const { data: newQuestion, error: insertError } = await supabase
      .from('ask_a_local')
      .insert({
        user_id: userId,
        destination_id: questionData.destinationId,
        question: questionData.question
      })
      .select('*')
      .single();

    if (insertError) {
      throw new Error(`Failed to create question: ${insertError.message}`);
    }

    // Fetch the complete question with related data
    const { data: question, error: fetchError } = await supabase
      .from('ask_a_local')
      .select(`
        *,
        user:users!user_id (
          id,
          username,
          credits,
          reputation
        ),
        destination:destinations!destination_id (
          id,
          name,
          country
        )
      `)
      .eq('id', newQuestion.id)
      .single();

    if (fetchError) {
      throw new Error(`Failed to fetch created question: ${fetchError.message}`);
    }

    return { question, creditResult: creditResult.creditResult };
  } catch (error) {
    console.error('Create ask local question error:', error);
    throw error;
  }
}

/**
 * Answers an Ask a Local question
 * 
 * @param questionId - ID of the question to answer
 * @param answer - Answer text
 * @param answeredBy - User ID of the person answering
 * @returns Promise<AskALocal> - Updated question
 * 
 * @throws {Error} If answering fails
 */
export async function answerAskLocalQuestion(questionId: string, answer: string, answeredBy: string): Promise<AskALocal> {
  try {
    // First, check if the question exists and is in pending status
    const { data: existingQuestion, error: checkError } = await supabase
      .from('ask_a_local')
      .select('id, status, user_id')
      .eq('id', questionId)
      .single();

    if (checkError || !existingQuestion) {
      throw new Error(`Question not found: ${checkError?.message || 'Question does not exist'}`);
    }

    if (existingQuestion.status !== 'pending') {
      throw new Error(`Question is not in pending status: ${existingQuestion.status}`);
    }

    // Update the question
    const { data: updatedQuestion, error: updateError } = await supabase
      .from('ask_a_local')
      .update({
        answer,
        answered_by: answeredBy,
        status: 'answered',
        updated_at: new Date().toISOString()
      })
      .eq('id', questionId)
      .select('*')
      .single();

    if (updateError) {
      throw new Error(`Failed to answer question: ${updateError.message}`);
    }

    // Fetch the complete question with related data
    const { data: question, error: fetchError } = await supabase
      .from('ask_a_local')
      .select(`
        *,
        user:users!user_id (
          id,
          username,
          credits,
          reputation
        ),
        destination:destinations!destination_id (
          id,
          name,
          country
        ),
        answered_by_user:users!answered_by (
          id,
          username,
          credits,
          reputation
        )
      `)
      .eq('id', questionId)
      .single();

    if (fetchError) {
      throw new Error(`Failed to fetch updated question: ${fetchError.message}`);
    }

    // Create notification for the question asker
    try {
      await createAskAnsweredNotification(
        question.user.id,
        questionId,
        question.destination.name
      );
    } catch (notificationError) {
      console.error('Failed to create notification:', notificationError);
      // Don't fail the main operation if notification creation fails
    }

    return question;
  } catch (error) {
    console.error('Answer ask local question error:', error);
    throw error;
  }
}

/**
 * Fetches Ask a Local questions for a destination
 * 
 * @param destinationId - Destination ID
 * @returns Promise<AskALocal[]> - Array of questions
 * 
 * @throws {Error} If query fails
 */
export async function getAskALocalQuestions(destinationId: string): Promise<AskALocal[]> {
  try {
    const { data: questions, error } = await supabase
      .from('ask_a_local')
      .select(`
        *,
        user:users!user_id (
          id,
          username,
          credits,
          reputation
        ),
        destination:destinations!destination_id (
          id,
          name,
          country
        ),
        answered_by_user:users!answered_by (
          id,
          username,
          credits,
          reputation
        )
      `)
      .eq('destination_id', destinationId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch questions: ${error.message}`);
    }

    return questions || [];
  } catch (error) {
    console.error('Get ask local questions error:', error);
    throw error;
  }
}

/**
 * Marks a question as helpful or not helpful
 * 
 * @param questionId - Question ID
 * @param isHelpful - Whether the answer was helpful
 * @returns Promise<boolean> - Success status
 * 
 * @throws {Error} If update fails
 */
export async function markQuestionHelpful(questionId: string, isHelpful: boolean): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('ask_a_local')
      .update({ is_helpful: isHelpful })
      .eq('id', questionId);

    if (error) {
      throw new Error(`Failed to mark question helpful: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error('Mark question helpful error:', error);
    throw error;
  }
}

/**
 * Closes an Ask a Local question
 * 
 * @param questionId - Question ID
 * @returns Promise<boolean> - Success status
 * 
 * @throws {Error} If update fails
 */
export async function closeAskLocalQuestion(questionId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('ask_a_local')
      .update({ status: 'closed' })
      .eq('id', questionId);

    if (error) {
      throw new Error(`Failed to close question: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error('Close ask local question error:', error);
    throw error;
  }
}
