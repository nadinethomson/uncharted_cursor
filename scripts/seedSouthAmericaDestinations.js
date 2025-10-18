// South America destinations for comprehensive seed data
// This file contains South American destinations to be merged with the main seed file

const southAmericaDestinations = [
  {
    name: "Machu Picchu, Peru",
    country: "PE",
    trip_style_tags: ["Adventure", "Cultural", "Historical"],
    interest_tags: ["Culture", "History", "Adventure", "Hiking"],
    overview: "Ancient Incan citadel perched high in the Andes, offering incredible hiking and cultural experiences. One of the New Seven Wonders.",
    key_attractions: [
      { name: "Inca Trail", description: "4-day trek through stunning Andean landscapes", image_url: null },
      { name: "Huayna Picchu", description: "Steep mountain peak with panoramic views", image_url: null },
      { name: "Sacred Valley", description: "Fertile valley with Incan ruins and villages", image_url: null },
      { name: "Cusco", description: "Historic capital of the Inca Empire", image_url: null }
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
    trip_style_tags: ["Cultural", "Food", "Romantic"],
    interest_tags: ["Culture", "Food", "History", "Tango"],
    overview: "Passionate city with tango, world-class steakhouses, and European architecture. Perfect for culture and food lovers.",
    key_attractions: [
      { name: "La Boca Neighborhood", description: "Colorful neighborhood with tango shows", image_url: null },
      { name: "Recoleta Cemetery", description: "Famous cemetery with elaborate mausoleums", image_url: null },
      { name: "Plaza de Mayo", description: "Historic square with political significance", image_url: null },
      { name: "San Telmo Market", description: "Historic market with antiques and crafts", image_url: null }
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
    trip_style_tags: ["Cultural", "Relaxed", "Historical"],
    interest_tags: ["Culture", "History", "Food", "Architecture"],
    overview: "Colonial city with colorful architecture, vibrant culture, and Caribbean charm. UNESCO World Heritage site.",
    key_attractions: [
      { name: "Old Town", description: "UNESCO World Heritage site with colonial architecture", image_url: null },
      { name: "Castillo San Felipe", description: "Massive fortress with underground tunnels", image_url: null },
      { name: "Getsemaní", description: "Trendy neighborhood with street art and nightlife", image_url: null },
      { name: "Rosario Islands", description: "Caribbean islands with pristine beaches", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "Dry season (December-March)",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 3000,
    budget_category: "Low"
  },
  {
    name: "Rio de Janeiro, Brazil",
    country: "BR",
    trip_style_tags: ["Beach", "Cultural", "Vibrant"],
    interest_tags: ["Beaches", "Culture", "Music", "Nature"],
    overview: "Vibrant city with stunning beaches, iconic landmarks, and rich culture. Perfect for beach and culture lovers.",
    key_attractions: [
      { name: "Christ the Redeemer", description: "Iconic statue with panoramic city views", image_url: null },
      { name: "Copacabana Beach", description: "Famous beach with golden sand and vibrant culture", image_url: null },
      { name: "Sugarloaf Mountain", description: "Granite peak with cable car and city views", image_url: null },
      { name: "Carnival", description: "World-famous festival with samba and parades", image_url: null }
    ],
    sustainability: "Low",
    best_season: "December-March",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 8000,
    budget_category: "Medium"
  },
  {
    name: "Santiago, Chile",
    country: "CL",
    trip_style_tags: ["Cultural", "Modern", "Wine"],
    interest_tags: ["Culture", "Wine", "Food", "Mountains"],
    overview: "Modern capital with wine regions, stunning mountain views, and vibrant culture. Perfect for wine and culture lovers.",
    key_attractions: [
      { name: "Wine Valleys", description: "World-class wine regions with tastings", image_url: null },
      { name: "Cerro San Cristóbal", description: "Hill with city views and Virgin Mary statue", image_url: null },
      { name: "Plaza de Armas", description: "Historic square with colonial architecture", image_url: null },
      { name: "Barrio Lastarria", description: "Trendy neighborhood with cafes and galleries", image_url: null }
    ],
    sustainability: "High",
    best_season: "October-April",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 8000,
    budget_category: "Medium"
  },
  {
    name: "Quito, Ecuador",
    country: "EC",
    trip_style_tags: ["Cultural", "Historical", "Adventure"],
    interest_tags: ["Culture", "History", "Adventure", "Volcanoes"],
    overview: "Historic capital with colonial architecture, nearby volcanoes, and rich culture. UNESCO World Heritage site.",
    key_attractions: [
      { name: "Historic Center", description: "UNESCO World Heritage colonial architecture", image_url: null },
      { name: "Mitad del Mundo", description: "Monument marking the equator line", image_url: null },
      { name: "Cotopaxi Volcano", description: "Active volcano with hiking opportunities", image_url: null },
      { name: "TelefériQo", description: "Cable car with panoramic city views", image_url: null }
    ],
    sustainability: "High",
    best_season: "June-September",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 4000,
    budget_category: "Low"
  },
  {
    name: "Salvador, Brazil",
    country: "BR",
    trip_style_tags: ["Cultural", "Historical", "Vibrant"],
    interest_tags: ["Culture", "History", "Music", "Afro-Brazilian"],
    overview: "Historic city with Afro-Brazilian culture, colonial architecture, and vibrant music scene. First capital of Brazil.",
    key_attractions: [
      { name: "Pelourinho", description: "Historic center with colorful colonial buildings", image_url: null },
      { name: "Elevador Lacerda", description: "Historic elevator connecting upper and lower city", image_url: null },
      { name: "São Francisco Church", description: "Baroque church with gold-covered interior", image_url: null },
      { name: "Capoeira", description: "Traditional Afro-Brazilian martial art and dance", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "December-March",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 8000,
    budget_category: "Low"
  },
  {
    name: "Medellín, Colombia",
    country: "CO",
    trip_style_tags: ["Cultural", "Modern", "Innovative"],
    interest_tags: ["Culture", "Innovation", "Art", "Transformation"],
    overview: "Transformed city with innovative urban planning, vibrant culture, and beautiful weather. Perfect for culture and innovation lovers.",
    key_attractions: [
      { name: "Comuna 13", description: "Transformed neighborhood with street art and escalators", image_url: null },
      { name: "Botero Plaza", description: "Square with sculptures by Fernando Botero", image_url: null },
      { name: "Metrocable", description: "Cable car system with city views", image_url: null },
      { name: "Pueblito Paisa", description: "Replica of traditional Antioquian village", image_url: null }
    ],
    sustainability: "High",
    best_season: "Year-round",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 3000,
    budget_category: "Low"
  },
  {
    name: "Cusco, Peru",
    country: "PE",
    trip_style_tags: ["Cultural", "Historical", "Spiritual"],
    interest_tags: ["Culture", "History", "Spirituality", "Inca"],
    overview: "Ancient capital of the Inca Empire with stunning architecture, rich culture, and spiritual significance. Gateway to Machu Picchu.",
    key_attractions: [
      { name: "Sacsayhuamán", description: "Massive Incan fortress with stone walls", image_url: null },
      { name: "Qorikancha", description: "Temple of the Sun, most important Incan temple", image_url: null },
      { name: "San Pedro Market", description: "Local market with traditional foods and crafts", image_url: null },
      { name: "Plaza de Armas", description: "Historic square with colonial architecture", image_url: null }
    ],
    sustainability: "High",
    best_season: "Dry season (May-October)",
    image_url: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
    distance_km: 6000,
    budget_category: "Low"
  },
  {
    name: "Ushuaia, Argentina",
    country: "AR",
    trip_style_tags: ["Adventure", "Nature", "Unique"],
    interest_tags: ["Adventure", "Nature", "Wildlife", "Antarctica"],
    overview: "Southernmost city in the world with stunning landscapes, wildlife, and gateway to Antarctica. Perfect for adventure and nature lovers.",
    key_attractions: [
      { name: "Tierra del Fuego National Park", description: "National park with pristine wilderness", image_url: null },
      { name: "Beagle Channel", description: "Historic waterway with wildlife cruises", image_url: null },
      { name: "End of the World Train", description: "Historic railway through national park", image_url: null },
      { name: "Antarctica Cruises", description: "Gateway to Antarctic expeditions", image_url: null }
    ],
    sustainability: "High",
    best_season: "Summer (December-March)",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    distance_km: 12000,
    budget_category: "Medium"
  }
];

module.exports = southAmericaDestinations;

