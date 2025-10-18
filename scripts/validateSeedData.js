// Validation script for seed data
// This script validates the structure and content of the seed data without requiring database connection

const europeDestinations = require('./seedEuropeDestinations');
const northAmericaDestinations = require('./seedNorthAmericaDestinations');
const southAmericaDestinations = require('./seedSouthAmericaDestinations');
const africaDestinations = require('./seedAfricaDestinations');
const oceaniaDestinations = require('./seedOceaniaDestinations');

// Asia destinations (first 10 from the original file)
const asiaDestinations = [
  {
    name: "Kyoto, Japan",
    country: "JP",
    trip_style_tags: ["Cultural", "Relaxed", "Spiritual"],
    interest_tags: ["Culture", "Food", "History", "Temples"],
    overview: "Ancient capital with 2000+ temples, traditional gardens, and authentic Japanese culture. Perfect for spiritual and cultural experiences.",
    key_attractions: [
      { name: "Fushimi Inari Shrine", description: "Iconic shrine with thousands of vermillion torii gates", image_url: null },
      { name: "Arashiyama Bamboo Grove", description: "Serene bamboo forest for peaceful meditation", image_url: null },
      { name: "Kinkaku-ji (Golden Pavilion)", description: "Zen temple with stunning golden reflection", image_url: null },
      { name: "Gion District", description: "Traditional geisha district with historic teahouses", image_url: null }
    ],
    sustainability: "High",
    best_season: "Spring (March-May), Autumn (October-November)",
    image_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    distance_km: 9000,
    budget_category: "Medium"
  },
  {
    name: "Bali, Indonesia",
    country: "ID",
    trip_style_tags: ["Relaxed", "Spiritual", "Tropical"],
    interest_tags: ["Beaches", "Culture", "Food", "Yoga"],
    overview: "Tropical paradise with stunning beaches, ancient temples, and vibrant culture. Perfect for relaxation and spiritual experiences.",
    key_attractions: [
      { name: "Tegallalang Rice Terraces", description: "Stunning terraced rice fields with traditional farming", image_url: null },
      { name: "Uluwatu Temple", description: "Ancient sea temple on dramatic cliffs with sunset views", image_url: null },
      { name: "Tirta Empul Temple", description: "Sacred water temple for purification rituals", image_url: null },
      { name: "Mount Batur", description: "Active volcano with sunrise hiking opportunities", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "Dry season (April-October)",
    image_url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
    distance_km: 12000,
    budget_category: "Low"
  },
  {
    name: "Siem Reap, Cambodia",
    country: "KH",
    trip_style_tags: ["Cultural", "Adventure", "Historical"],
    interest_tags: ["Culture", "History", "Adventure", "Temples"],
    overview: "Gateway to the magnificent Angkor Wat temple complex. Rich history and authentic local experiences in Southeast Asia.",
    key_attractions: [
      { name: "Angkor Wat", description: "Largest religious monument in the world, built in 12th century", image_url: null },
      { name: "Ta Prohm Temple", description: "Famous for massive tree roots growing through ruins", image_url: null },
      { name: "Bayon Temple", description: "Temple with 216 smiling faces carved in stone", image_url: null },
      { name: "Tonle Sap Lake", description: "Floating villages and unique water-based communities", image_url: null }
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
    trip_style_tags: ["Cultural", "Food", "Historical"],
    interest_tags: ["Culture", "Food", "History", "Street Food"],
    overview: "Vibrant capital with rich history, incredible street food, and French colonial architecture. Perfect for food lovers.",
    key_attractions: [
      { name: "Old Quarter", description: "Historic district with narrow streets and traditional shops", image_url: null },
      { name: "Hoan Kiem Lake", description: "Peaceful lake in the heart of the city", image_url: null },
      { name: "Temple of Literature", description: "Vietnam's first university, built in 1070", image_url: null },
      { name: "Ho Chi Minh Mausoleum", description: "Resting place of Vietnam's revolutionary leader", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "Spring (March-April), Autumn (October-November)",
    image_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
    distance_km: 4000,
    budget_category: "Low"
  },
  {
    name: "Kerala, India",
    country: "IN",
    trip_style_tags: ["Nature", "Cultural", "Relaxed"],
    interest_tags: ["Nature", "Culture", "Food", "Backwaters"],
    overview: "Backwaters, spice plantations, and pristine beaches. Known as 'God's Own Country' with rich biodiversity.",
    key_attractions: [
      { name: "Alleppey Backwaters", description: "Network of canals perfect for houseboat cruises", image_url: null },
      { name: "Munnar Tea Plantations", description: "Rolling hills covered in tea plantations", image_url: null },
      { name: "Kochi Fort", description: "Historic port city with colonial architecture", image_url: null },
      { name: "Periyar National Park", description: "Wildlife sanctuary with elephants and tigers", image_url: null }
    ],
    sustainability: "High",
    best_season: "Winter (October-March)",
    image_url: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    distance_km: 6000,
    budget_category: "Low"
  },
  {
    name: "Tokyo, Japan",
    country: "JP",
    trip_style_tags: ["Cultural", "Food", "Modern"],
    interest_tags: ["Culture", "Food", "Technology", "Shopping"],
    overview: "Ultra-modern metropolis blending cutting-edge technology with ancient traditions. Perfect for urban exploration.",
    key_attractions: [
      { name: "Senso-ji Temple", description: "Tokyo's oldest temple in historic Asakusa", image_url: null },
      { name: "Shibuya Crossing", description: "World's busiest pedestrian crossing", image_url: null },
      { name: "Tsukiji Fish Market", description: "World's largest fish market with fresh sushi", image_url: null },
      { name: "Tokyo Skytree", description: "Tallest structure in Japan with panoramic views", image_url: null }
    ],
    sustainability: "High",
    best_season: "Spring (March-May), Autumn (September-November)",
    image_url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    distance_km: 9000,
    budget_category: "High"
  },
  {
    name: "Seoul, South Korea",
    country: "KR",
    trip_style_tags: ["Cultural", "Food", "Modern"],
    interest_tags: ["Culture", "Food", "Technology", "K-Pop"],
    overview: "Dynamic capital blending ancient palaces with modern skyscrapers. Center of K-culture and technology.",
    key_attractions: [
      { name: "Gyeongbokgung Palace", description: "Largest of Seoul's five grand palaces", image_url: null },
      { name: "Myeongdong", description: "Famous shopping district with street food", image_url: null },
      { name: "N Seoul Tower", description: "Iconic tower with panoramic city views", image_url: null },
      { name: "Bukchon Hanok Village", description: "Traditional Korean village in the city", image_url: null }
    ],
    sustainability: "High",
    best_season: "Spring (April-June), Autumn (September-November)",
    image_url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc",
    distance_km: 8000,
    budget_category: "Medium"
  },
  {
    name: "Bangkok, Thailand",
    country: "TH",
    trip_style_tags: ["Cultural", "Food", "Urban"],
    interest_tags: ["Culture", "Food", "Temples", "Shopping"],
    overview: "Vibrant capital with ornate temples, floating markets, and world-class street food. Perfect for cultural immersion.",
    key_attractions: [
      { name: "Grand Palace", description: "Royal residence with stunning architecture", image_url: null },
      { name: "Wat Pho", description: "Temple of the Reclining Buddha", image_url: null },
      { name: "Chatuchak Weekend Market", description: "World's largest weekend market", image_url: null },
      { name: "Floating Markets", description: "Traditional markets on the water", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "Cool season (November-February)",
    image_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
    distance_km: 2000,
    budget_category: "Low"
  },
  {
    name: "Singapore",
    country: "SG",
    trip_style_tags: ["Cultural", "Modern", "Food"],
    interest_tags: ["Culture", "Food", "Technology", "Gardens"],
    overview: "Modern city-state with diverse cultures, world-class cuisine, and innovative urban planning. Perfect for food and culture lovers.",
    key_attractions: [
      { name: "Gardens by the Bay", description: "Futuristic gardens with supertrees", image_url: null },
      { name: "Marina Bay Sands", description: "Iconic hotel with infinity pool", image_url: null },
      { name: "Chinatown", description: "Historic district with temples and food", image_url: null },
      { name: "Sentosa Island", description: "Resort island with beaches and attractions", image_url: null }
    ],
    sustainability: "High",
    best_season: "Year-round (tropical climate)",
    image_url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
    distance_km: 1000,
    budget_category: "High"
  },
  {
    name: "Hong Kong",
    country: "HK",
    trip_style_tags: ["Cultural", "Modern", "Food"],
    interest_tags: ["Culture", "Food", "Shopping", "Skyline"],
    overview: "Dynamic metropolis where East meets West, with stunning skyline, world-class cuisine, and vibrant culture.",
    key_attractions: [
      { name: "Victoria Peak", description: "Highest point with panoramic city views", image_url: null },
      { name: "Star Ferry", description: "Historic ferry across Victoria Harbour", image_url: null },
      { name: "Temple Street Night Market", description: "Famous night market with street food", image_url: null },
      { name: "Big Buddha", description: "Giant bronze Buddha statue on Lantau Island", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "Autumn (October-December), Spring (March-May)",
    image_url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
    distance_km: 2000,
    budget_category: "High"
  }
];

// Combine all destinations
const allDestinations = [
  ...asiaDestinations,
  ...europeDestinations,
  ...northAmericaDestinations,
  ...southAmericaDestinations,
  ...africaDestinations,
  ...oceaniaDestinations
];

function validateDestination(destination, index) {
  const errors = [];
  
  // Required fields
  const requiredFields = ['name', 'country', 'trip_style_tags', 'interest_tags', 'overview', 'sustainability', 'best_season', 'budget_category', 'distance_km'];
  
  for (const field of requiredFields) {
    if (!destination[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  
  // Validate data types
  if (destination.trip_style_tags && !Array.isArray(destination.trip_style_tags)) {
    errors.push('trip_style_tags must be an array');
  }
  
  if (destination.interest_tags && !Array.isArray(destination.interest_tags)) {
    errors.push('interest_tags must be an array');
  }
  
  if (destination.key_attractions && !Array.isArray(destination.key_attractions)) {
    errors.push('key_attractions must be an array');
  }
  
  // Validate sustainability values
  const validSustainability = ['Low', 'Medium', 'High'];
  if (destination.sustainability && !validSustainability.includes(destination.sustainability)) {
    errors.push(`Invalid sustainability value: ${destination.sustainability}`);
  }
  
  // Validate budget category values
  const validBudgetCategories = ['Low', 'Medium', 'High'];
  if (destination.budget_category && !validBudgetCategories.includes(destination.budget_category)) {
    errors.push(`Invalid budget_category value: ${destination.budget_category}`);
  }
  
  // Validate distance_km is a number
  if (destination.distance_km && typeof destination.distance_km !== 'number') {
    errors.push('distance_km must be a number');
  }
  
  return errors;
}

function validateSeedData() {
  console.log('🔍 Validating comprehensive seed data...');
  console.log(`Total destinations: ${allDestinations.length}`);
  
  let totalErrors = 0;
  let destinationsWithErrors = 0;
  
  for (let i = 0; i < allDestinations.length; i++) {
    const destination = allDestinations[i];
    const errors = validateDestination(destination, i);
    
    if (errors.length > 0) {
      destinationsWithErrors++;
      totalErrors += errors.length;
      console.log(`\n❌ Destination ${i + 1}: ${destination.name}`);
      errors.forEach(error => console.log(`   - ${error}`));
    }
  }
  
  console.log('\n📊 Validation Summary:');
  console.log(`✅ Valid destinations: ${allDestinations.length - destinationsWithErrors}`);
  console.log(`❌ Destinations with errors: ${destinationsWithErrors}`);
  console.log(`🔢 Total errors: ${totalErrors}`);
  
  if (totalErrors === 0) {
    console.log('\n🎉 All destinations are valid!');
  } else {
    console.log('\n⚠️  Some destinations have validation errors.');
  }
  
  // Show breakdown by continent
  console.log('\n📊 Destination breakdown:');
  console.log(`Asia: ${asiaDestinations.length}`);
  console.log(`Europe: ${europeDestinations.length}`);
  console.log(`North America: ${northAmericaDestinations.length}`);
  console.log(`South America: ${southAmericaDestinations.length}`);
  console.log(`Africa: ${africaDestinations.length}`);
  console.log(`Oceania: ${oceaniaDestinations.length}`);
  
  // Show sample destinations
  console.log('\n🌟 Sample destinations:');
  allDestinations.slice(0, 5).forEach((dest, index) => {
    console.log(`${index + 1}. ${dest.name}, ${dest.country} - ${dest.trip_style_tags.join(', ')}`);
  });
  
  return totalErrors === 0;
}

// Run validation
const isValid = validateSeedData();

if (isValid) {
  console.log('\n✅ Seed data validation passed! Ready for database insertion.');
} else {
  console.log('\n❌ Seed data validation failed. Please fix errors before proceeding.');
  process.exit(1);
}

