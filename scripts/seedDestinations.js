// Seed script for Uncharted Travel App destinations
// Run with: node scripts/seedDestinations.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Comprehensive destination data
const destinations = [
  // Asia
  {
    name: "Kyoto, Japan",
    country: "JP",
    trip_style_tags: ["Cultural", "Relaxed"],
    interest_tags: ["Culture", "Food", "History"],
    overview: "Experience authentic Japanese culture in ancient temples and traditional gardens. Kyoto offers serene experiences away from Tokyo's hustle.",
    key_attractions: [
      {
        name: "Fushimi Inari Shrine",
        description: "Iconic shrine with thousands of vermillion torii gates. Less crowded in early morning.",
        image_url: null
      },
      {
        name: "Arashiyama Bamboo Grove",
        description: "Serene bamboo forest. Visit outside peak hours for peaceful experience.",
        image_url: null
      }
    ],
    sustainability: "Medium",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    distance_km: 8000,
    budget_category: "Medium"
  },
  {
    name: "Bali, Indonesia",
    country: "ID",
    trip_style_tags: ["Relaxed", "Nature"],
    interest_tags: ["Nature", "Culture", "Food"],
    overview: "Tropical paradise with stunning beaches, ancient temples, and vibrant culture. Perfect for relaxation and spiritual experiences.",
    key_attractions: [
      {
        name: "Tegallalang Rice Terraces",
        description: "Stunning terraced rice fields with traditional farming methods.",
        image_url: null
      },
      {
        name: "Uluwatu Temple",
        description: "Ancient sea temple perched on dramatic cliffs with sunset views.",
        image_url: null
      }
    ],
    sustainability: "Low",
    best_season: "Dry season (April-October)",
    image_url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
    distance_km: 5000,
    budget_category: "Low"
  },
  {
    name: "Siem Reap, Cambodia",
    country: "KH",
    trip_style_tags: ["Cultural", "Adventure"],
    interest_tags: ["Culture", "History", "Adventure"],
    overview: "Gateway to the magnificent Angkor Wat temple complex. Rich history and authentic local experiences.",
    key_attractions: [
      {
        name: "Angkor Wat",
        description: "Largest religious monument in the world, built in the 12th century.",
        image_url: null
      },
      {
        name: "Ta Prohm Temple",
        description: "Famous for massive tree roots growing through temple ruins.",
        image_url: null
      }
    ],
    sustainability: "Medium",
    best_season: "Dry season (November-March)",
    image_url: "https://images.unsplash.com/photo-1548013146-72479768bada",
    distance_km: 3000,
    budget_category: "Low"
  },
  {
    name: "Hanoi, Vietnam",
    country: "VN",
    trip_style_tags: ["Cultural", "Food"],
    interest_tags: ["Culture", "Food", "History"],
    overview: "Vibrant capital with rich history, incredible street food, and French colonial architecture.",
    key_attractions: [
      {
        name: "Old Quarter",
        description: "Historic district with narrow streets, traditional shops, and street food.",
        image_url: null
      },
      {
        name: "Hoan Kiem Lake",
        description: "Peaceful lake in the heart of the city with historic significance.",
        image_url: null
      }
    ],
    sustainability: "Medium",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
    distance_km: 4000,
    budget_category: "Low"
  },
  {
    name: "Kerala, India",
    country: "IN",
    trip_style_tags: ["Nature", "Cultural"],
    interest_tags: ["Nature", "Culture", "Food"],
    overview: "Backwaters, spice plantations, and pristine beaches. Known as 'God's Own Country'.",
    key_attractions: [
      {
        name: "Alleppey Backwaters",
        description: "Network of canals and lagoons perfect for houseboat cruises.",
        image_url: null
      },
      {
        name: "Munnar Tea Plantations",
        description: "Rolling hills covered in tea plantations with cool climate.",
        image_url: null
      }
    ],
    sustainability: "High",
    best_season: "Winter (October-March)",
    image_url: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    distance_km: 6000,
    budget_category: "Low"
  },

  // Europe
  {
    name: "Santorini, Greece",
    country: "GR",
    trip_style_tags: ["Relaxed", "Cultural"],
    interest_tags: ["Culture", "Food", "History"],
    overview: "Stunning sunsets, white-washed buildings, and crystal-clear waters make Santorini a perfect romantic getaway.",
    key_attractions: [
      {
        name: "Oia Village",
        description: "Famous for its sunset views and traditional Cycladic architecture.",
        image_url: null
      },
      {
        name: "Red Beach",
        description: "Unique beach with red volcanic sand and dramatic cliffs.",
        image_url: null
      }
    ],
    sustainability: "Low",
    best_season: "Summer",
    image_url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    distance_km: 2000,
    budget_category: "High"
  },
  {
    name: "Prague, Czech Republic",
    country: "CZ",
    trip_style_tags: ["Cultural", "Food"],
    interest_tags: ["Culture", "History", "Food"],
    overview: "Medieval architecture, rich history, and vibrant culture. One of Europe's most beautiful cities.",
    key_attractions: [
      {
        name: "Charles Bridge",
        description: "Historic bridge with baroque statues and stunning city views.",
        image_url: null
      },
      {
        name: "Prague Castle",
        description: "Largest ancient castle complex in the world.",
        image_url: null
      }
    ],
    sustainability: "Medium",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1541849546-216549ae216d",
    distance_km: 1000,
    budget_category: "Medium"
  },
  {
    name: "Reykjavik, Iceland",
    country: "IS",
    trip_style_tags: ["Nature", "Adventure"],
    interest_tags: ["Nature", "Adventure", "Sustainability"],
    overview: "Land of fire and ice with geysers, glaciers, and the Northern Lights. Perfect for nature lovers.",
    key_attractions: [
      {
        name: "Blue Lagoon",
        description: "Geothermal spa with milky blue waters and silica mud.",
        image_url: null
      },
      {
        name: "Golden Circle",
        description: "Route featuring geysers, waterfalls, and national parks.",
        image_url: null
      }
    ],
    sustainability: "High",
    best_season: "Summer, Winter",
    image_url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e",
    distance_km: 4000,
    budget_category: "High"
  },
  {
    name: "Porto, Portugal",
    country: "PT",
    trip_style_tags: ["Cultural", "Food"],
    interest_tags: ["Culture", "Food", "History"],
    overview: "Charming city with colorful buildings, port wine, and rich history. Less touristy than Lisbon.",
    key_attractions: [
      {
        name: "Ribeira District",
        description: "Historic riverside district with colorful houses and cafes.",
        image_url: null
      },
      {
        name: "Livraria Lello",
        description: "Beautiful bookshop that inspired Harry Potter's library.",
        image_url: null
      }
    ],
    sustainability: "Medium",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b",
    distance_km: 1500,
    budget_category: "Medium"
  },
  {
    name: "Copenhagen, Denmark",
    country: "DK",
    trip_style_tags: ["Cultural", "Food"],
    interest_tags: ["Culture", "Food", "Sustainability"],
    overview: "Sustainable city with world-class cuisine, design, and cycling culture. Perfect for food lovers.",
    key_attractions: [
      {
        name: "Nyhavn Harbor",
        description: "Colorful 17th-century waterfront with restaurants and cafes.",
        image_url: null
      },
      {
        name: "Tivoli Gardens",
        description: "Historic amusement park in the city center.",
        image_url: null
      }
    ],
    sustainability: "High",
    best_season: "Summer",
    image_url: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc",
    distance_km: 800,
    budget_category: "High"
  },

  // North America
  {
    name: "Banff National Park, Canada",
    country: "CA",
    trip_style_tags: ["Nature", "Adventure"],
    interest_tags: ["Nature", "Adventure", "Sustainability"],
    overview: "Breathtaking mountain landscapes, pristine lakes, and abundant wildlife in Canada's oldest national park.",
    key_attractions: [
      {
        name: "Lake Louise",
        description: "Famous turquoise lake surrounded by snow-capped mountains.",
        image_url: null
      },
      {
        name: "Moraine Lake",
        description: "Stunning glacial lake with the Valley of the Ten Peaks.",
        image_url: null
      }
    ],
    sustainability: "High",
    best_season: "Summer, Winter",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 3000,
    budget_category: "Medium"
  },
  {
    name: "San Francisco, USA",
    country: "US",
    trip_style_tags: ["Cultural", "Food"],
    interest_tags: ["Culture", "Food", "History"],
    overview: "Diverse city with iconic landmarks, world-class cuisine, and vibrant neighborhoods.",
    key_attractions: [
      {
        name: "Golden Gate Bridge",
        description: "Iconic suspension bridge with stunning bay views.",
        image_url: null
      },
      {
        name: "Alcatraz Island",
        description: "Former federal prison with fascinating history and bay views.",
        image_url: null
      }
    ],
    sustainability: "Medium",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    distance_km: 5000,
    budget_category: "High"
  },
  {
    name: "New Orleans, USA",
    country: "US",
    trip_style_tags: ["Cultural", "Food"],
    interest_tags: ["Culture", "Food", "History"],
    overview: "Vibrant music scene, unique cuisine, and rich cultural heritage. The birthplace of jazz.",
    key_attractions: [
      {
        name: "French Quarter",
        description: "Historic district with colorful buildings, jazz clubs, and cafes.",
        image_url: null
      },
      {
        name: "Jackson Square",
        description: "Historic park with street performers and local artists.",
        image_url: null
      }
    ],
    sustainability: "Low",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0",
    distance_km: 2000,
    budget_category: "Medium"
  },

  // South America
  {
    name: "Machu Picchu, Peru",
    country: "PE",
    trip_style_tags: ["Adventure", "Cultural"],
    interest_tags: ["Culture", "History", "Adventure"],
    overview: "Ancient Incan citadel perched high in the Andes, offering incredible hiking and cultural experiences.",
    key_attractions: [
      {
        name: "Inca Trail",
        description: "4-day trek through stunning Andean landscapes to Machu Picchu.",
        image_url: null
      },
      {
        name: "Huayna Picchu",
        description: "Steep mountain peak with panoramic views of Machu Picchu.",
        image_url: null
      }
    ],
    sustainability: "High",
    best_season: "Dry season (May-October)",
    image_url: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
    distance_km: 6000,
    budget_category: "Low"
  },
  {
    name: "Buenos Aires, Argentina",
    country: "AR",
    trip_style_tags: ["Cultural", "Food"],
    interest_tags: ["Culture", "Food", "History"],
    overview: "Passionate city with tango, world-class steakhouses, and European architecture.",
    key_attractions: [
      {
        name: "La Boca Neighborhood",
        description: "Colorful neighborhood with tango shows and local art.",
        image_url: null
      },
      {
        name: "Recoleta Cemetery",
        description: "Famous cemetery with elaborate mausoleums and Evita's tomb.",
        image_url: null
      }
    ],
    sustainability: "Medium",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 8000,
    budget_category: "Medium"
  },
  {
    name: "Cartagena, Colombia",
    country: "CO",
    trip_style_tags: ["Cultural", "Relaxed"],
    interest_tags: ["Culture", "History", "Food"],
    overview: "Colonial city with colorful architecture, vibrant culture, and Caribbean charm.",
    key_attractions: [
      {
        name: "Old Town",
        description: "UNESCO World Heritage site with colonial architecture and cobblestone streets.",
        image_url: null
      },
      {
        name: "Castillo San Felipe",
        description: "Massive fortress with underground tunnels and city views.",
        image_url: null
      }
    ],
    sustainability: "Medium",
    best_season: "Dry season (December-March)",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 3000,
    budget_category: "Low"
  },

  // Africa
  {
    name: "Marrakech, Morocco",
    country: "MA",
    trip_style_tags: ["Cultural", "Adventure"],
    interest_tags: ["Culture", "History", "Food"],
    overview: "Vibrant city with bustling souks, historic palaces, and rich cultural heritage.",
    key_attractions: [
      {
        name: "Jemaa el-Fnaa",
        description: "Famous square with street performers, food stalls, and local culture.",
        image_url: null
      },
      {
        name: "Bahia Palace",
        description: "19th-century palace with beautiful gardens and intricate architecture.",
        image_url: null
      }
    ],
    sustainability: "Low",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e",
    distance_km: 4000,
    budget_category: "Low"
  },
  {
    name: "Cape Town, South Africa",
    country: "ZA",
    trip_style_tags: ["Nature", "Cultural"],
    interest_tags: ["Nature", "Culture", "Adventure"],
    overview: "Stunning coastal city with Table Mountain, wine regions, and diverse culture.",
    key_attractions: [
      {
        name: "Table Mountain",
        description: "Iconic flat-topped mountain with panoramic city and ocean views.",
        image_url: null
      },
      {
        name: "Robben Island",
        description: "Former prison island where Nelson Mandela was held, now a museum.",
        image_url: null
      }
    ],
    sustainability: "Medium",
    best_season: "Summer (December-February)",
    image_url: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
    distance_km: 12000,
    budget_category: "Medium"
  },

  // Oceania
  {
    name: "Queenstown, New Zealand",
    country: "NZ",
    trip_style_tags: ["Adventure", "Nature"],
    interest_tags: ["Nature", "Adventure", "Sustainability"],
    overview: "Adventure capital with stunning landscapes, outdoor activities, and pristine nature.",
    key_attractions: [
      {
        name: "Milford Sound",
        description: "Fjord with dramatic cliffs, waterfalls, and wildlife cruises.",
        image_url: null
      },
      {
        name: "Bungee Jumping",
        description: "Birthplace of commercial bungee jumping with various jump sites.",
        image_url: null
      }
    ],
    sustainability: "High",
    best_season: "Summer (December-February)",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 15000,
    budget_category: "High"
  },
  {
    name: "Sydney, Australia",
    country: "AU",
    trip_style_tags: ["Cultural", "Relaxed"],
    interest_tags: ["Culture", "Food", "History"],
    overview: "Vibrant harbor city with iconic landmarks, world-class beaches, and diverse culture.",
    key_attractions: [
      {
        name: "Sydney Opera House",
        description: "Iconic performing arts venue with distinctive shell-like architecture.",
        image_url: null
      },
      {
        name: "Bondi Beach",
        description: "Famous beach with great surfing, coastal walks, and beach culture.",
        image_url: null
      }
    ],
    sustainability: "Medium",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 12000,
    budget_category: "High"
  }
];

async function seedDestinations() {
  console.log('Starting to seed destinations...');
  
  try {
    // Clear existing destinations (optional - remove if you want to keep existing data)
    console.log('Clearing existing destinations...');
    const { error: deleteError } = await supabase
      .from('destinations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (deleteError) {
      console.warn('Warning: Could not clear existing destinations:', deleteError.message);
    }

    // Insert new destinations
    console.log(`Inserting ${destinations.length} destinations...`);
    const { data, error } = await supabase
      .from('destinations')
      .insert(destinations);

    if (error) {
      console.error('Error inserting destinations:', error);
      return;
    }

    console.log('✅ Successfully seeded destinations!');
    console.log(`Inserted ${destinations.length} destinations`);

    // Verify the data
    const { data: count, error: countError } = await supabase
      .from('destinations')
      .select('id', { count: 'exact' });

    if (!countError) {
      console.log(`Total destinations in database: ${count.length}`);
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the seed function
seedDestinations();











