// Europe destinations for comprehensive seed data
// This file contains European destinations to be merged with the main seed file

const europeDestinations = [
  {
    name: "Santorini, Greece",
    country: "GR",
    trip_style_tags: ["Romantic", "Relaxed", "Cultural"],
    interest_tags: ["Photography", "Sunset", "Architecture", "Wine"],
    overview: "Iconic white-washed buildings against the Aegean Sea. Perfect for romantic getaways and stunning photography.",
    key_attractions: [
      { name: "Oia Village", description: "Famous for its sunset views and traditional architecture", image_url: null },
      { name: "Red Beach", description: "Unique beach with red volcanic sand and dramatic cliffs", image_url: null },
      { name: "Wine Tasting", description: "Local wineries with volcanic soil wines", image_url: null },
      { name: "Akrotiri Archaeological Site", description: "Ancient Minoan settlement preserved in volcanic ash", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "May-October",
    image_url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    distance_km: 2500,
    budget_category: "High"
  },
  {
    name: "Prague, Czech Republic",
    country: "CZ",
    trip_style_tags: ["Cultural", "Historical", "Romantic"],
    interest_tags: ["Architecture", "History", "Beer", "Music"],
    overview: "Medieval charm with Gothic architecture, rich history, and vibrant cultural scene. One of Europe's most beautiful cities.",
    key_attractions: [
      { name: "Charles Bridge", description: "Historic bridge with baroque statues and city views", image_url: null },
      { name: "Prague Castle", description: "Largest ancient castle complex in the world", image_url: null },
      { name: "Old Town Square", description: "Historic square with astronomical clock", image_url: null },
      { name: "Beer Culture", description: "World-renowned Czech beer and traditional pubs", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "April-October",
    image_url: "https://images.unsplash.com/photo-1541849546-216549ae216d",
    distance_km: 1000,
    budget_category: "Low"
  },
  {
    name: "Reykjavik, Iceland",
    country: "IS",
    trip_style_tags: ["Adventure", "Nature", "Unique"],
    interest_tags: ["Northern Lights", "Geysers", "Glaciers", "Photography"],
    overview: "Land of fire and ice with dramatic landscapes, geothermal wonders, and the Northern Lights. Perfect for nature lovers.",
    key_attractions: [
      { name: "Blue Lagoon", description: "Geothermal spa with milky blue waters", image_url: null },
      { name: "Golden Circle", description: "Route featuring geysers, waterfalls, and national parks", image_url: null },
      { name: "Northern Lights", description: "Aurora borealis viewing opportunities", image_url: null },
      { name: "Glacier Tours", description: "Ice cave exploration and glacier hiking", image_url: null }
    ],
    sustainability: "High",
    best_season: "June-August, December-March",
    image_url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
    distance_km: 2000,
    budget_category: "High"
  },
  {
    name: "Porto, Portugal",
    country: "PT",
    trip_style_tags: ["Cultural", "Food", "Romantic"],
    interest_tags: ["Culture", "Food", "History", "Wine"],
    overview: "Charming city with colorful buildings, port wine, and rich history. Less touristy than Lisbon with authentic charm.",
    key_attractions: [
      { name: "Ribeira District", description: "Historic riverside district with colorful houses", image_url: null },
      { name: "Livraria Lello", description: "Beautiful bookshop that inspired Harry Potter", image_url: null },
      { name: "Port Wine Cellars", description: "Traditional port wine tasting and cellars", image_url: null },
      { name: "Clérigos Tower", description: "Baroque tower with panoramic city views", image_url: null }
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
    trip_style_tags: ["Cultural", "Food", "Sustainable"],
    interest_tags: ["Culture", "Food", "Sustainability", "Design"],
    overview: "Sustainable city with world-class cuisine, design, and cycling culture. Perfect for food lovers and design enthusiasts.",
    key_attractions: [
      { name: "Nyhavn Harbor", description: "Colorful 17th-century waterfront with restaurants", image_url: null },
      { name: "Tivoli Gardens", description: "Historic amusement park in the city center", image_url: null },
      { name: "The Little Mermaid", description: "Iconic bronze statue based on Hans Christian Andersen", image_url: null },
      { name: "Rosenborg Castle", description: "Renaissance castle with royal collections", image_url: null }
    ],
    sustainability: "High",
    best_season: "Summer",
    image_url: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc",
    distance_km: 800,
    budget_category: "High"
  },
  {
    name: "Amsterdam, Netherlands",
    country: "NL",
    trip_style_tags: ["Cultural", "Relaxed", "Historical"],
    interest_tags: ["Culture", "History", "Art", "Canals"],
    overview: "Charming canal city with world-class museums, historic architecture, and unique cycling culture. Perfect for art and history lovers.",
    key_attractions: [
      { name: "Canal Ring", description: "UNESCO World Heritage canal system", image_url: null },
      { name: "Rijksmuseum", description: "National museum with Dutch masterpieces", image_url: null },
      { name: "Anne Frank House", description: "Historic house where Anne Frank hid during WWII", image_url: null },
      { name: "Van Gogh Museum", description: "Largest collection of Van Gogh's works", image_url: null }
    ],
    sustainability: "High",
    best_season: "April-October",
    image_url: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017",
    distance_km: 500,
    budget_category: "Medium"
  },
  {
    name: "Barcelona, Spain",
    country: "ES",
    trip_style_tags: ["Cultural", "Food", "Artistic"],
    interest_tags: ["Culture", "Food", "Architecture", "Art"],
    overview: "Vibrant city with unique Gaudí architecture, world-class cuisine, and Mediterranean charm. Perfect for art and food lovers.",
    key_attractions: [
      { name: "Sagrada Familia", description: "Gaudí's unfinished masterpiece basilica", image_url: null },
      { name: "Park Güell", description: "Whimsical park designed by Gaudí", image_url: null },
      { name: "La Rambla", description: "Famous pedestrian street with street performers", image_url: null },
      { name: "Gothic Quarter", description: "Historic medieval neighborhood", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "April-June, September-November",
    image_url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4",
    distance_km: 1200,
    budget_category: "Medium"
  },
  {
    name: "Rome, Italy",
    country: "IT",
    trip_style_tags: ["Cultural", "Historical", "Food"],
    interest_tags: ["Culture", "History", "Food", "Art"],
    overview: "Eternal City with ancient ruins, world-class art, and incredible cuisine. Perfect for history and culture enthusiasts.",
    key_attractions: [
      { name: "Colosseum", description: "Ancient amphitheater and symbol of Rome", image_url: null },
      { name: "Vatican City", description: "Smallest country with Sistine Chapel and St. Peter's", image_url: null },
      { name: "Roman Forum", description: "Ancient political and social center", image_url: null },
      { name: "Trevi Fountain", description: "Baroque fountain and coin-throwing tradition", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "April-June, September-November",
    image_url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    distance_km: 1000,
    budget_category: "Medium"
  },
  {
    name: "Paris, France",
    country: "FR",
    trip_style_tags: ["Cultural", "Romantic", "Artistic"],
    interest_tags: ["Culture", "Art", "Food", "Romance"],
    overview: "City of Light with world-class museums, iconic landmarks, and romantic atmosphere. Perfect for art and romance lovers.",
    key_attractions: [
      { name: "Eiffel Tower", description: "Iconic iron tower and symbol of Paris", image_url: null },
      { name: "Louvre Museum", description: "World's largest art museum with Mona Lisa", image_url: null },
      { name: "Notre-Dame Cathedral", description: "Gothic cathedral with stunning architecture", image_url: null },
      { name: "Champs-Élysées", description: "Famous avenue with luxury shopping", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "April-June, September-November",
    image_url: "https://images.unsplash.com/photo-1502602898536-47ad22581b52",
    distance_km: 800,
    budget_category: "High"
  },
  {
    name: "London, United Kingdom",
    country: "GB",
    trip_style_tags: ["Cultural", "Historical", "Modern"],
    interest_tags: ["Culture", "History", "Art", "Theater"],
    overview: "Historic capital with royal palaces, world-class museums, and vibrant theater scene. Perfect for culture and history lovers.",
    key_attractions: [
      { name: "Big Ben", description: "Iconic clock tower and symbol of London", image_url: null },
      { name: "British Museum", description: "World's first public national museum", image_url: null },
      { name: "Tower of London", description: "Historic castle with Crown Jewels", image_url: null },
      { name: "West End", description: "World-famous theater district", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "April-October",
    image_url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    distance_km: 600,
    budget_category: "High"
  }
];

module.exports = europeDestinations;

