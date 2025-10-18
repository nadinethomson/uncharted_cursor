// Oceania destinations for comprehensive seed data
// This file contains Oceanian destinations to be merged with the main seed file

const oceaniaDestinations = [
  {
    name: "Queenstown, New Zealand",
    country: "NZ",
    trip_style_tags: ["Adventure", "Nature", "Outdoor"],
    interest_tags: ["Adventure", "Nature", "Mountains", "Lakes"],
    overview: "Adventure capital with stunning landscapes, outdoor activities, and pristine nature. Perfect for adventure and nature lovers.",
    key_attractions: [
      { name: "Milford Sound", description: "Fjord with dramatic cliffs, waterfalls, and wildlife cruises", image_url: null },
      { name: "Bungee Jumping", description: "Birthplace of commercial bungee jumping", image_url: null },
      { name: "Skiing", description: "World-class ski resorts with stunning mountain views", image_url: null },
      { name: "Lake Wakatipu", description: "Beautiful lake with water activities and scenic cruises", image_url: null }
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
    trip_style_tags: ["Cultural", "Beach", "Modern"],
    interest_tags: ["Culture", "Beaches", "Architecture", "Food"],
    overview: "Vibrant harbor city with iconic landmarks, world-class beaches, and diverse culture. Perfect for culture and beach lovers.",
    key_attractions: [
      { name: "Sydney Opera House", description: "Iconic performing arts venue with distinctive architecture", image_url: null },
      { name: "Bondi Beach", description: "Famous beach with great surfing and coastal walks", image_url: null },
      { name: "Harbour Bridge", description: "Iconic bridge with climbing and city views", image_url: null },
      { name: "Royal Botanic Garden", description: "Beautiful gardens with harbor views", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 12000,
    budget_category: "High"
  },
  {
    name: "Melbourne, Australia",
    country: "AU",
    trip_style_tags: ["Cultural", "Food", "Artistic"],
    interest_tags: ["Culture", "Food", "Art", "Coffee"],
    overview: "Cultural capital with world-class cuisine, arts scene, and coffee culture. Perfect for food and culture lovers.",
    key_attractions: [
      { name: "Federation Square", description: "Cultural precinct with galleries and events", image_url: null },
      { name: "Queen Victoria Market", description: "Historic market with local produce and crafts", image_url: null },
      { name: "Great Ocean Road", description: "Scenic coastal drive with stunning rock formations", image_url: null },
      { name: "Yarra Valley", description: "Wine region with tastings and scenic views", image_url: null }
    ],
    sustainability: "High",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 12000,
    budget_category: "Medium"
  },
  {
    name: "Auckland, New Zealand",
    country: "NZ",
    trip_style_tags: ["Cultural", "Modern", "Outdoor"],
    interest_tags: ["Culture", "Nature", "Adventure", "Food"],
    overview: "Largest city with diverse culture, outdoor activities, and stunning natural beauty. Perfect for culture and nature lovers.",
    key_attractions: [
      { name: "Sky Tower", description: "Tallest structure in New Zealand with panoramic views", image_url: null },
      { name: "Waiheke Island", description: "Island with wineries, beaches, and art galleries", image_url: null },
      { name: "Auckland Domain", description: "Large park with gardens and museums", image_url: null },
      { name: "Hobbiton", description: "Movie set from The Lord of the Rings", image_url: null }
    ],
    sustainability: "High",
    best_season: "Summer (December-February)",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 15000,
    budget_category: "Medium"
  },
  {
    name: "Brisbane, Australia",
    country: "AU",
    trip_style_tags: ["Cultural", "Relaxed", "Outdoor"],
    interest_tags: ["Culture", "Nature", "Food", "Art"],
    overview: "Relaxed city with outdoor lifestyle, cultural attractions, and nearby natural wonders. Perfect for culture and nature lovers.",
    key_attractions: [
      { name: "South Bank", description: "Cultural precinct with parks, galleries, and restaurants", image_url: null },
      { name: "Lone Pine Koala Sanctuary", description: "World's first koala sanctuary", image_url: null },
      { name: "Moreton Island", description: "Sand island with beaches and water activities", image_url: null },
      { name: "Queensland Art Gallery", description: "State art gallery with diverse collections", image_url: null }
    ],
    sustainability: "High",
    best_season: "Winter (June-August)",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 12000,
    budget_category: "Medium"
  },
  {
    name: "Wellington, New Zealand",
    country: "NZ",
    trip_style_tags: ["Cultural", "Food", "Artistic"],
    interest_tags: ["Culture", "Food", "Art", "Film"],
    overview: "Capital city with vibrant arts scene, world-class cuisine, and film industry. Perfect for culture and food lovers.",
    key_attractions: [
      { name: "Te Papa Museum", description: "National museum with interactive exhibits", image_url: null },
      { name: "Cable Car", description: "Historic funicular with city views", image_url: null },
      { name: "Weta Workshop", description: "Special effects studio for films", image_url: null },
      { name: "Zealandia", description: "Urban wildlife sanctuary with native birds", image_url: null }
    ],
    sustainability: "High",
    best_season: "Summer (December-February)",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 15000,
    budget_category: "Medium"
  },
  {
    name: "Perth, Australia",
    country: "AU",
    trip_style_tags: ["Relaxed", "Beach", "Outdoor"],
    interest_tags: ["Beaches", "Nature", "Food", "Wine"],
    overview: "Isolated city with beautiful beaches, wine regions, and relaxed lifestyle. Perfect for beach and wine lovers.",
    key_attractions: [
      { name: "Kings Park", description: "Large park with city views and native plants", image_url: null },
      { name: "Rottnest Island", description: "Island with quokkas, beaches, and cycling", image_url: null },
      { name: "Swan Valley", description: "Wine region with tastings and scenic views", image_url: null },
      { name: "Cottesloe Beach", description: "Famous beach with great swimming and sunsets", image_url: null }
    ],
    sustainability: "High",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 12000,
    budget_category: "Medium"
  },
  {
    name: "Christchurch, New Zealand",
    country: "NZ",
    trip_style_tags: ["Cultural", "Historical", "Outdoor"],
    interest_tags: ["Culture", "History", "Nature", "Adventure"],
    overview: "Garden city with English heritage, outdoor activities, and post-earthquake regeneration. Perfect for culture and nature lovers.",
    key_attractions: [
      { name: "Botanic Gardens", description: "Beautiful gardens with native and exotic plants", image_url: null },
      { name: "Canterbury Museum", description: "Museum with natural history and cultural exhibits", image_url: null },
      { name: "Port Hills", description: "Hills with hiking trails and city views", image_url: null },
      { name: "Akaroa", description: "French settlement with harbor and wildlife", image_url: null }
    ],
    sustainability: "High",
    best_season: "Summer (December-February)",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 15000,
    budget_category: "Medium"
  },
  {
    name: "Adelaide, Australia",
    country: "AU",
    trip_style_tags: ["Cultural", "Food", "Wine"],
    interest_tags: ["Culture", "Food", "Wine", "Art"],
    overview: "Cultural city with world-class wine regions, festivals, and food scene. Perfect for food and wine lovers.",
    key_attractions: [
      { name: "Barossa Valley", description: "World-famous wine region with tastings", image_url: null },
      { name: "Adelaide Central Market", description: "Historic market with local produce and food", image_url: null },
      { name: "Art Gallery of South Australia", description: "State art gallery with diverse collections", image_url: null },
      { name: "Kangaroo Island", description: "Island with wildlife, beaches, and nature", image_url: null }
    ],
    sustainability: "High",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 12000,
    budget_category: "Medium"
  },
  {
    name: "Fiji",
    country: "FJ",
    trip_style_tags: ["Beach", "Relaxed", "Tropical"],
    interest_tags: ["Beaches", "Culture", "Diving", "Relaxation"],
    overview: "Tropical paradise with pristine beaches, coral reefs, and warm hospitality. Perfect for beach and relaxation lovers.",
    key_attractions: [
      { name: "Yasawa Islands", description: "Chain of islands with beautiful beaches", image_url: null },
      { name: "Mamanuca Islands", description: "Popular islands with resorts and activities", image_url: null },
      { name: "Coral Coast", description: "Main island coast with beaches and culture", image_url: null },
      { name: "Sigatoka Sand Dunes", description: "National park with unique sand formations", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "Dry season (May-October)",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 10000,
    budget_category: "Medium"
  }
];

module.exports = oceaniaDestinations;

