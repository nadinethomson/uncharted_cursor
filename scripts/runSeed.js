// Simple script to run the seed RPC function
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSeed() {
  console.log('🌱 Running seed function...');
  
  try {
    const { data, error } = await supabase.rpc('seed_destinations');
    
    if (error) {
      console.error('❌ Error running seed:', error);
      return;
    }
    
    console.log('✅ Seed function completed successfully');
    
    // Verify by fetching destinations
    const { data: destinations, error: fetchError } = await supabase
      .from('destinations')
      .select('name, country, trip_style_tags, interest_tags, budget_category, distance_km')
      .limit(10);
    
    if (fetchError) {
      console.error('❌ Error fetching destinations:', fetchError);
      return;
    }
    
    console.log('✅ Verified', destinations.length, 'destinations in database:');
    destinations.forEach((dest, index) => {
      console.log(`   ${index + 1}. ${dest.name}, ${dest.country}`);
      console.log(`      Trip Style: ${dest.trip_style_tags.join(', ')}`);
      console.log(`      Interests: ${dest.interest_tags.join(', ')}`);
      console.log(`      Budget: ${dest.budget_category}, Distance: ${dest.distance_km}km`);
    });
    
    console.log('\n🎯 Destinations ready for quiz testing!');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the seed function
runSeed();







