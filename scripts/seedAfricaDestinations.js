// Africa destinations for comprehensive seed data
// This file contains African destinations to be merged with the main seed file

const africaDestinations = [
  {
    name: "Marrakech, Morocco",
    country: "MA",
    trip_style_tags: ["Cultural", "Adventure", "Exotic"],
    interest_tags: ["Culture", "History", "Food", "Markets"],
    overview: "Vibrant city with bustling souks, historic palaces, and rich cultural heritage. Perfect for culture and adventure lovers.",
    key_attractions: [
      { name: "Jemaa el-Fnaa", description: "Famous square with street performers and food stalls", image_url: null },
      { name: "Bahia Palace", description: "19th-century palace with beautiful gardens", image_url: null },
      { name: "Koutoubia Mosque", description: "Iconic mosque with stunning minaret", image_url: null },
      { name: "Atlas Mountains", description: "Mountain range with hiking and Berber villages", image_url: null }
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
    trip_style_tags: ["Nature", "Cultural", "Adventure"],
    interest_tags: ["Nature", "Culture", "Adventure", "Wildlife"],
    overview: "Stunning coastal city with Table Mountain, wine regions, and diverse culture. Perfect for nature and culture lovers.",
    key_attractions: [
      { name: "Table Mountain", description: "Iconic flat-topped mountain with panoramic views", image_url: null },
      { name: "Robben Island", description: "Former prison island where Nelson Mandela was held", image_url: null },
      { name: "V&A Waterfront", description: "Historic harbor with shops, restaurants, and entertainment", image_url: null },
      { name: "Wine Regions", description: "World-class wine regions with tastings and tours", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "Summer (December-February)",
    image_url: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
    distance_km: 12000,
    budget_category: "Medium"
  },
  {
    name: "Serengeti National Park, Tanzania",
    country: "TZ",
    trip_style_tags: ["Adventure", "Nature", "Wildlife"],
    interest_tags: ["Wildlife", "Safari", "Nature", "Photography"],
    overview: "World-famous national park with the Great Migration, Big Five, and stunning landscapes. Perfect for wildlife and nature lovers.",
    key_attractions: [
      { name: "Great Migration", description: "Annual migration of wildebeest and zebras", image_url: null },
      { name: "Big Five", description: "Lions, elephants, buffalo, leopards, and rhinos", image_url: null },
      { name: "Hot Air Balloon Safari", description: "Aerial views of the vast plains", image_url: null },
      { name: "Ngorongoro Crater", description: "Volcanic caldera with abundant wildlife", image_url: null }
    ],
    sustainability: "High",
    best_season: "Dry season (June-October)",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 8000,
    budget_category: "High"
  },
  {
    name: "Cairo, Egypt",
    country: "EG",
    trip_style_tags: ["Cultural", "Historical", "Ancient"],
    interest_tags: ["Culture", "History", "Ancient", "Pyramids"],
    overview: "Ancient city with pyramids, pharaonic history, and rich culture. Perfect for history and culture enthusiasts.",
    key_attractions: [
      { name: "Great Pyramids of Giza", description: "Ancient pyramids and the Sphinx", image_url: null },
      { name: "Egyptian Museum", description: "World's largest collection of ancient Egyptian artifacts", image_url: null },
      { name: "Khan el-Khalili", description: "Historic bazaar with traditional crafts", image_url: null },
      { name: "Islamic Cairo", description: "Historic district with mosques and architecture", image_url: null }
    ],
    sustainability: "Low",
    best_season: "Winter (October-April)",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 3000,
    budget_category: "Low"
  },
  {
    name: "Zanzibar, Tanzania",
    country: "TZ",
    trip_style_tags: ["Beach", "Cultural", "Relaxed"],
    interest_tags: ["Beaches", "Culture", "Spices", "History"],
    overview: "Tropical island with pristine beaches, spice plantations, and rich history. Perfect for beach and culture lovers.",
    key_attractions: [
      { name: "Stone Town", description: "UNESCO World Heritage historic center", image_url: null },
      { name: "Spice Plantations", description: "Tours of traditional spice farms", image_url: null },
      { name: "Nungwi Beach", description: "Beautiful beach with crystal-clear waters", image_url: null },
      { name: "Prison Island", description: "Island with giant tortoises and historic prison", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "Dry season (June-October)",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 8000,
    budget_category: "Medium"
  },
  {
    name: "Lagos, Nigeria",
    country: "NG",
    trip_style_tags: ["Cultural", "Modern", "Vibrant"],
    interest_tags: ["Culture", "Music", "Art", "Food"],
    overview: "Vibrant megacity with rich culture, music scene, and entrepreneurial spirit. Perfect for culture and music lovers.",
    key_attractions: [
      { name: "Lekki Conservation Centre", description: "Nature reserve with canopy walkway", image_url: null },
      { name: "National Museum", description: "Museum with Nigerian art and artifacts", image_url: null },
      { name: "Tarkwa Bay", description: "Beautiful beach with water activities", image_url: null },
      { name: "Nike Art Gallery", description: "Contemporary art gallery with Nigerian artists", image_url: null }
    ],
    sustainability: "Low",
    best_season: "Dry season (November-March)",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 5000,
    budget_category: "Medium"
  },
  {
    name: "Victoria Falls, Zambia/Zimbabwe",
    country: "ZM",
    trip_style_tags: ["Adventure", "Nature", "Unique"],
    interest_tags: ["Nature", "Adventure", "Waterfalls", "Wildlife"],
    overview: "One of the world's largest waterfalls with adventure activities and stunning natural beauty. Perfect for adventure and nature lovers.",
    key_attractions: [
      { name: "Victoria Falls", description: "One of the Seven Natural Wonders of the World", image_url: null },
      { name: "Devil's Pool", description: "Natural infinity pool at the edge of the falls", image_url: null },
      { name: "White Water Rafting", description: "Thrilling rapids below the falls", image_url: null },
      { name: "Helicopter Tours", description: "Aerial views of the falls and surrounding area", image_url: null }
    ],
    sustainability: "High",
    best_season: "Dry season (May-October)",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 8000,
    budget_category: "Medium"
  },
  {
    name: "Dakar, Senegal",
    country: "SN",
    trip_style_tags: ["Cultural", "Historical", "Vibrant"],
    interest_tags: ["Culture", "History", "Music", "Art"],
    overview: "Vibrant capital with rich culture, music scene, and historic significance. Perfect for culture and music lovers.",
    key_attractions: [
      { name: "Gorée Island", description: "UNESCO World Heritage site with slave trade history", image_url: null },
      { name: "African Renaissance Monument", description: "Tallest statue in Africa with city views", image_url: null },
      { name: "Marché Sandaga", description: "Traditional market with local crafts and food", image_url: null },
      { name: "Pink Lake", description: "Unique pink-colored lake with salt harvesting", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "Dry season (November-May)",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 4000,
    budget_category: "Low"
  },
  {
    name: "Kigali, Rwanda",
    country: "RW",
    trip_style_tags: ["Cultural", "Modern", "Sustainable"],
    interest_tags: ["Culture", "Sustainability", "Wildlife", "History"],
    overview: "Clean and modern capital with mountain gorillas, rich culture, and sustainable development. Perfect for wildlife and culture lovers.",
    key_attractions: [
      { name: "Mountain Gorillas", description: "Trekking to see endangered mountain gorillas", image_url: null },
      { name: "Genocide Memorial", description: "Memorial and museum honoring victims", image_url: null },
      { name: "Nyungwe Forest", description: "National park with chimpanzees and canopy walkway", image_url: null },
      { name: "Lake Kivu", description: "Beautiful lake with water activities and relaxation", image_url: null }
    ],
    sustainability: "High",
    best_season: "Dry season (June-September)",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 6000,
    budget_category: "Medium"
  },
  {
    name: "Casablanca, Morocco",
    country: "MA",
    trip_style_tags: ["Cultural", "Modern", "Historic"],
    interest_tags: ["Culture", "History", "Architecture", "Food"],
    overview: "Modern city with Art Deco architecture, historic significance, and vibrant culture. Perfect for culture and architecture lovers.",
    key_attractions: [
      { name: "Hassan II Mosque", description: "One of the largest mosques in the world", image_url: null },
      { name: "Old Medina", description: "Historic walled city with traditional architecture", image_url: null },
      { name: "Art Deco District", description: "Neighborhood with beautiful Art Deco buildings", image_url: null },
      { name: "Corniche", description: "Seaside promenade with restaurants and cafes", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e",
    distance_km: 4000,
    budget_category: "Low"
  }
];

module.exports = africaDestinations;

