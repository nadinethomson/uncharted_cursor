import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.9.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Credit packages configuration
const CREDIT_PACKAGES = {
  small: {
    name: 'Starter Pack',
    credits: 10,
    price: 1.00,
    description: 'Perfect for trying out the platform'
  },
  medium: {
    name: 'Explorer Pack', 
    credits: 50,
    price: 5.00,
    description: 'Great for regular travelers'
  },
  large: {
    name: 'Adventure Pack',
    credits: 110,
    price: 10.00,
    description: 'Best value with 10% bonus credits',
    bonus: 10
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Starting create-checkout-session function')
    
    // Check if Stripe key is available
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY not found in environment variables')
      return new Response(
        JSON.stringify({ error: 'Stripe configuration missing' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2022-11-15',
    })

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://bmsbzktasztwdnfouypb.supabase.co'
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY')
    
    const supabaseClient = createClient(
      supabaseUrl,
      supabaseServiceKey,
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the user from the request
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    const { package: packageType } = await req.json()

    if (!packageType || !CREDIT_PACKAGES[packageType as keyof typeof CREDIT_PACKAGES]) {
      return new Response(
        JSON.stringify({ error: 'Invalid package type' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const packageConfig = CREDIT_PACKAGES[packageType as keyof typeof CREDIT_PACKAGES]

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `${packageConfig.name} - ${packageConfig.credits} Credits`,
              description: packageConfig.description,
            },
            unit_amount: Math.round(packageConfig.price * 100), // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${Deno.env.get('SITE_URL')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get('SITE_URL')}/profile`,
      metadata: {
        userId: user.id,
        packageType,
        credits: packageConfig.credits.toString(),
        amount: packageConfig.price.toString(),
      },
    })

    // Create pending purchase record
    const { error: insertError } = await supabaseClient
      .from('credit_purchases')
      .insert({
        user_id: user.id,
        stripe_session_id: session.id,
        amount_gbp: packageConfig.price,
        credits_purchased: packageConfig.credits,
        status: 'pending'
      })

    if (insertError) {
      console.error('Error creating purchase record:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to create purchase record' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
