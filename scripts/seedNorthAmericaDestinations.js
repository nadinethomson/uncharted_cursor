// North America destinations for comprehensive seed data
// This file contains North American destinations to be merged with the main seed file

const northAmericaDestinations = [
  {
    name: "Banff National Park, Canada",
    country: "CA",
    trip_style_tags: ["Adventure", "Nature", "Outdoor"],
    interest_tags: ["Hiking", "Wildlife", "Mountains", "Photography"],
    overview: "Stunning Rocky Mountain landscapes with pristine lakes, glaciers, and abundant wildlife. Canada's oldest national park.",
    key_attractions: [
      { name: "Lake Louise", description: "Famous turquoise lake surrounded by snow-capped mountains", image_url: null },
      { name: "Moraine Lake", description: "Stunning glacial lake with the Valley of the Ten Peaks", image_url: null },
      { name: "Icefields Parkway", description: "Scenic highway connecting Banff and Jasper", image_url: null },
      { name: "Wildlife Viewing", description: "Opportunities to see bears, elk, and other wildlife", image_url: null }
    ],
    sustainability: "High",
    best_season: "June-September",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 3000,
    budget_category: "Medium"
  },
  {
    name: "San Francisco, USA",
    country: "US",
    trip_style_tags: ["Cultural", "Food", "Modern"],
    interest_tags: ["Culture", "Food", "Technology", "Architecture"],
    overview: "Diverse city with iconic landmarks, world-class cuisine, and vibrant neighborhoods. Perfect for food and culture lovers.",
    key_attractions: [
      { name: "Golden Gate Bridge", description: "Iconic suspension bridge with stunning bay views", image_url: null },
      { name: "Alcatraz Island", description: "Former federal prison with fascinating history", image_url: null },
      { name: "Fisherman's Wharf", description: "Historic waterfront with seafood and attractions", image_url: null },
      { name: "Chinatown", description: "Largest Chinatown outside of Asia", image_url: null }
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
    trip_style_tags: ["Cultural", "Food", "Music"],
    interest_tags: ["Culture", "Food", "Music", "History"],
    overview: "Vibrant music scene, unique cuisine, and rich cultural heritage. The birthplace of jazz and home to Mardi Gras.",
    key_attractions: [
      { name: "French Quarter", description: "Historic district with colorful buildings and jazz clubs", image_url: null },
      { name: "Jackson Square", description: "Historic park with street performers and local artists", image_url: null },
      { name: "Jazz Clubs", description: "World-famous jazz venues and live music", image_url: null },
      { name: "Garden District", description: "Historic neighborhood with beautiful mansions", image_url: null }
    ],
    sustainability: "Low",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0",
    distance_km: 2000,
    budget_category: "Medium"
  },
  {
    name: "New York City, USA",
    country: "US",
    trip_style_tags: ["Cultural", "Modern", "Urban"],
    interest_tags: ["Culture", "Art", "Food", "Shopping"],
    overview: "The city that never sleeps with world-class museums, Broadway shows, and diverse neighborhoods. Perfect for urban exploration.",
    key_attractions: [
      { name: "Times Square", description: "Famous intersection with bright lights and energy", image_url: null },
      { name: "Central Park", description: "Massive urban park in the heart of Manhattan", image_url: null },
      { name: "Statue of Liberty", description: "Iconic symbol of freedom and democracy", image_url: null },
      { name: "Broadway", description: "World-famous theater district with musicals and plays", image_url: null }
    ],
    sustainability: "Medium",
    best_season: "Spring, Autumn",
    image_url: "https://images.unsplash.com/photo-1496442226665-5d4b6b4a7b7b",
    distance_km: 5000,
    budget_category: "High"
  },
  {
    name: "Vancouver, Canada",
    country: "CA",
    trip_style_tags: ["Nature", "Cultural", "Outdoor"],
    interest_tags: ["Nature", "Culture", "Outdoor", "Sustainability"],
    overview: "Coastal city with stunning natural beauty, diverse culture, and outdoor activities. Perfect for nature and city lovers.",
    key_attractions: [
      { name: "Stanley Park", description: "Large urban park with scenic seawall", image_url: null },
      { name: "Granville Island", description: "Historic industrial area with markets and galleries", image_url: null },
      { name: "Capilano Suspension Bridge", description: "Historic bridge through temperate rainforest", image_url: null },
      { name: "Grouse Mountain", description: "Mountain with hiking, skiing, and city views", image_url: null }
    ],
    sustainability: "High",
    best_season: "May-October",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 3000,
    budget_category: "Medium"
  },
  {
    name: "Los Angeles, USA",
    country: "US",
    trip_style_tags: ["Cultural", "Entertainment", "Beach"],
    interest_tags: ["Culture", "Entertainment", "Beaches", "Art"],
    overview: "Entertainment capital with beaches, Hollywood, and diverse neighborhoods. Perfect for entertainment and beach lovers.",
    key_attractions: [
      { name: "Hollywood Walk of Fame", description: "Famous sidewalk with celebrity stars", image_url: null },
      { name: "Santa Monica Pier", description: "Historic pier with amusement park and beach", image_url: null },
      { name: "Griffith Observatory", description: "Observatory with city and Hollywood sign views", image_url: null },
      { name: "Venice Beach", description: "Famous beach with boardwalk and street performers", image_url: null }
    ],
    sustainability: "Low",
    best_season: "Year-round",
    image_url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    distance_km: 5000,
    budget_category: "High"
  },
  {
    name: "Toronto, Canada",
    country: "CA",
    trip_style_tags: ["Cultural", "Modern", "Diverse"],
    interest_tags: ["Culture", "Food", "Art", "Diversity"],
    overview: "Multicultural metropolis with world-class dining, arts scene, and diverse neighborhoods. Perfect for culture and food lovers.",
    key_attractions: [
      { name: "CN Tower", description: "Iconic tower with panoramic city views", image_url: null },
      { name: "Royal Ontario Museum", description: "World-class museum with diverse collections", image_url: null },
      { name: "Distillery District", description: "Historic area with restaurants and galleries", image_url: null },
      { name: "Kensington Market", description: "Vibrant multicultural neighborhood", image_url: null }
    ],
    sustainability: "High",
    best_season: "May-October",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 3000,
    budget_category: "Medium"
  },
  {
    name: "Miami, USA",
    country: "US",
    trip_style_tags: ["Beach", "Cultural", "Nightlife"],
    interest_tags: ["Beaches", "Culture", "Nightlife", "Art"],
    overview: "Vibrant city with beautiful beaches, Art Deco architecture, and Latin American culture. Perfect for beach and nightlife lovers.",
    key_attractions: [
      { name: "South Beach", description: "Famous beach with Art Deco architecture", image_url: null },
      { name: "Wynwood Walls", description: "Outdoor museum with street art and murals", image_url: null },
      { name: "Little Havana", description: "Cuban neighborhood with culture and food", image_url: null },
      { name: "Vizcaya Museum", description: "Historic villa with gardens and art", image_url: null }
    ],
    sustainability: "Low",
    best_season: "November-April",
    image_url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    distance_km: 2000,
    budget_category: "Medium"
  },
  {
    name: "Montreal, Canada",
    country: "CA",
    trip_style_tags: ["Cultural", "Food", "Historical"],
    interest_tags: ["Culture", "Food", "History", "Art"],
    overview: "French-Canadian city with European charm, world-class cuisine, and vibrant arts scene. Perfect for culture and food lovers.",
    key_attractions: [
      { name: "Old Montreal", description: "Historic district with cobblestone streets", image_url: null },
      { name: "Notre-Dame Basilica", description: "Stunning Gothic Revival church", image_url: null },
      { name: "Mount Royal", description: "Large park with city views and hiking", image_url: null },
      { name: "Jean-Talon Market", description: "Large public market with local produce", image_url: null }
    ],
    sustainability: "High",
    best_season: "May-October",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    distance_km: 3000,
    budget_category: "Medium"
  },
  {
    name: "Seattle, USA",
    country: "US",
    trip_style_tags: ["Cultural", "Nature", "Modern"],
    interest_tags: ["Culture", "Nature", "Technology", "Coffee"],
    overview: "Tech hub with coffee culture, outdoor activities, and stunning natural beauty. Perfect for nature and tech enthusiasts.",
    key_attractions: [
      { name: "Space Needle", description: "Iconic tower with city and mountain views", image_url: null },
      { name: "Pike Place Market", description: "Historic public market with local vendors", image_url: null },
      { name: "Chihuly Garden and Glass", description: "Glass art museum with stunning installations", image_url: null },
      { name: "Mount Rainier", description: "Active volcano with hiking and climbing", image_url: null }
    ],
    sustainability: "High",
    best_season: "May-October",
    image_url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    distance_km: 5000,
    budget_category: "Medium"
  }
];

module.exports = northAmericaDestinations;

