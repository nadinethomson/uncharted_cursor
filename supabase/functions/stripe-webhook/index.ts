import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.9.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2022-11-15',
    })

    // Initialize Supabase client with service role key
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the webhook signature
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      return new Response(
        JSON.stringify({ error: 'No signature provided' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get the raw body
    const body = await req.text()

    // Verify the webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        console.log('Processing checkout.session.completed:', session.id)

        // Get the purchase record
        const { data: purchase, error: purchaseError } = await supabaseClient
          .from('credit_purchases')
          .select('*')
          .eq('stripe_session_id', session.id)
          .single()

        if (purchaseError || !purchase) {
          console.error('Purchase not found:', purchaseError)
          return new Response(
            JSON.stringify({ error: 'Purchase not found' }),
            { 
              status: 404, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        // Check if already processed
        if (purchase.status === 'completed') {
          console.log('Purchase already processed:', session.id)
          return new Response(
            JSON.stringify({ message: 'Already processed' }),
            { 
              status: 200, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        // Start a transaction to atomically update everything
        const { error: transactionError } = await supabaseClient.rpc('process_credit_purchase', {
          purchase_id: purchase.id,
          user_id: purchase.user_id,
          credits_to_add: purchase.credits_purchased,
          payment_intent_id: session.payment_intent as string
        })

        if (transactionError) {
          console.error('Transaction failed:', transactionError)
          return new Response(
            JSON.stringify({ error: 'Transaction failed' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        console.log('Successfully processed purchase:', session.id)
        break
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute
        console.log('Charge disputed:', dispute.id)
        // Handle dispute logic here if needed
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        console.log('Charge refunded:', charge.id)
        
        // Find the purchase and mark as refunded
        const { data: purchase, error: purchaseError } = await supabaseClient
          .from('credit_purchases')
          .select('*')
          .eq('stripe_payment_intent_id', charge.payment_intent)
          .single()

        if (purchase && !purchaseError) {
          // Update purchase status
          await supabaseClient
            .from('credit_purchases')
            .update({ status: 'refunded' })
            .eq('id', purchase.id)

          // Deduct credits from user
          await supabaseClient.rpc('deduct_credits', {
            user_id: purchase.user_id,
            amount: purchase.credits_purchased,
            reason: 'refund'
          })
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(
      JSON.stringify({ received: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
