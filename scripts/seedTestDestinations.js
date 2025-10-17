// Seed script for 10 test destinations
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const testDestinations = [
  {
    name: "Santorini, Greece",
    country: "Greece",
    trip_style_tags: ["romantic", "luxury", "relaxation"],
    interest_tags: ["photography", "sunset", "architecture", "wine"],
    overview: "Iconic white-washed buildings against the Aegean Sea. Perfect for romantic getaways and stunning photography.",
    key_attractions: ["Oia Village", "Red Beach", "Wine Tasting", "Sunset Views"],
    sustainability: "Medium",
    best_season: "May-October",
    image_url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
    budget_category: "High",
    distance_km: 2500
  },
  {
    name: "Kyoto, Japan",
    country: "Japan", 
    trip_style_tags: ["cultural", "historical", "spiritual"],
    interest_tags: ["temples", "gardens", "traditional", "zen"],
    overview: "Ancient capital with 2000+ temples, traditional gardens, and authentic Japanese culture.",
    key_attractions: ["Fushimi Inari Shrine", "Bamboo Grove", "Golden Pavilion", "Geisha District"],
    sustainability: "High",
    best_season: "March-May, October-November",
    image_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
    budget_category: "Medium",
    distance_km: 9000
  },
  {
    name: "Banff National Park, Canada",
    country: "Canada",
    trip_style_tags: ["adventure", "nature", "outdoor"],
    interest_tags: ["hiking", "wildlife", "mountains", "photography"],
    overview: "Stunning Rocky Mountain landscapes with pristine lakes, glaciers, and abundant wildlife.",
    key_attractions: ["Lake Louise", "Moraine Lake", "Icefields Parkway", "Wildlife Viewing"],
    sustainability: "High",
    best_season: "June-September",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    budget_category: "Medium",
    distance_km: 3000
  },
  {
    name: "Marrakech, Morocco",
    country: "Morocco",
    trip_style_tags: ["cultural", "adventure", "exotic"],
    interest_tags: ["markets", "architecture", "spices", "desert"],
    overview: "Vibrant souks, stunning architecture, and gateway to the Sahara Desert.",
    key_attractions: ["Jemaa el-Fnaa", "Bahia Palace", "Atlas Mountains", "Desert Tours"],
    sustainability: "Medium",
    best_season: "October-April",
    image_url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800",
    budget_category: "Low",
    distance_km: 4000
  },
  {
    name: "Reykjavik, Iceland",
    country: "Iceland",
    trip_style_tags: ["adventure", "nature", "unique"],
    interest_tags: ["northern-lights", "geysers", "glaciers", "photography"],
    overview: "Land of fire and ice with dramatic landscapes, geothermal wonders, and the Northern Lights.",
    key_attractions: ["Blue Lagoon", "Golden Circle", "Northern Lights", "Glacier Tours"],
    sustainability: "High",
    best_season: "June-August, December-March",
    image_url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
    budget_category: "High",
    distance_km: 2000
  },
  {
    name: "Bali, Indonesia",
    country: "Indonesia",
    trip_style_tags: ["relaxation", "spiritual", "tropical"],
    interest_tags: ["beaches", "temples", "yoga", "culture"],
    overview: "Tropical paradise with ancient temples, pristine beaches, and rich spiritual culture.",
    key_attractions: ["Ubud Temples", "Rice Terraces", "Beach Resorts", "Volcano Hiking"],
    sustainability: "Medium",
    best_season: "April-October",
    image_url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800",
    budget_category: "Low",
    distance_km: 12000
  },
  {
    name: "Costa Rica",
    country: "Costa Rica",
    trip_style_tags: ["adventure", "nature", "eco-friendly"],
    interest_tags: ["wildlife", "rainforest", "beaches", "adventure"],
    overview: "Biodiversity hotspot with rainforests, volcanoes, and pristine beaches. Eco-tourism paradise.",
    key_attractions: ["Monteverde Cloud Forest", "Arenal Volcano", "Manuel Antonio Park", "Tortuguero"],
    sustainability: "High",
    best_season: "December-April",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    budget_category: "Medium",
    distance_km: 4000
  },
  {
    name: "Prague, Czech Republic",
    country: "Czech Republic",
    trip_style_tags: ["cultural", "historical", "romantic"],
    interest_tags: ["architecture", "history", "beer", "music"],
    overview: "Medieval charm with Gothic architecture, rich history, and vibrant cultural scene.",
    key_attractions: ["Charles Bridge", "Prague Castle", "Old Town Square", "Beer Culture"],
    sustainability: "Medium",
    best_season: "April-October",
    image_url: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800",
    budget_category: "Low",
    distance_km: 1000
  },
  {
    name: "New Zealand South Island",
    country: "New Zealand",
    trip_style_tags: ["adventure", "nature", "outdoor"],
    interest_tags: ["hiking", "mountains", "lakes", "adventure"],
    overview: "Dramatic landscapes with fjords, mountains, and pristine wilderness. Adventure capital of the world.",
    key_attractions: ["Milford Sound", "Queenstown", "Franz Josef Glacier", "Hiking Trails"],
    sustainability: "High",
    best_season: "December-March",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    budget_category: "High",
    distance_km: 18000
  },
  {
    name: "Portugal Algarve",
    country: "Portugal",
    trip_style_tags: ["relaxation", "beach", "affordable"],
    interest_tags: ["beaches", "seafood", "golf", "history"],
    overview: "Stunning coastline with golden beaches, dramatic cliffs, and charming fishing villages.",
    key_attractions: ["Benagil Cave", "Lagos Beaches", "Golf Courses", "Seafood Cuisine"],
    sustainability: "Medium",
    best_season: "May-October",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    budget_category: "Low",
    distance_km: 2000
  }
];

async function seedDestinations() {
  console.log('🌱 Seeding database with test destinations...');
  
  try {
    // Clear existing destinations first
    const { error: deleteError } = await supabase
      .from('destinations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (deleteError) {
      console.warn('⚠️ Could not clear existing destinations:', deleteError.message);
    }
    
    // Insert new destinations
    const { data, error } = await supabase
      .from('destinations')
      .insert(testDestinations)
      .select();
    
    if (error) {
      console.error('❌ Error seeding destinations:', error);
      return;
    }
    
    console.log('✅ Successfully seeded', data.length, 'destinations:');
    data.forEach((dest, index) => {
      console.log(`   ${index + 1}. ${dest.name}, ${dest.country}`);
    });
    
    console.log('\n🎯 Destinations ready for quiz testing!');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the seed function
seedDestinations();


