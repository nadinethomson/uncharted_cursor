-- RPC function to seed destinations (bypasses RLS)
CREATE OR REPLACE FUNCTION seed_destinations()
RETURNS void AS $$
BEGIN
  -- Clear existing destinations
  DELETE FROM destinations;
  
  -- Insert test destinations
  INSERT INTO destinations (name, country, trip_style_tags, interest_tags, overview, key_attractions, sustainability, best_season, image_url, budget_category, distance_km) VALUES
  ('Santorini, Greece', 'Greece', '["romantic", "luxury", "relaxation"]', '["photography", "sunset", "architecture", "wine"]', 'Iconic white-washed buildings against the Aegean Sea. Perfect for romantic getaways and stunning photography.', '["Oia Village", "Red Beach", "Wine Tasting", "Sunset Views"]', 'Medium', 'May-October', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', 'High', 2500),
  
  ('Kyoto, Japan', 'Japan', '["cultural", "historical", "spiritual"]', '["temples", "gardens", "traditional", "zen"]', 'Ancient capital with 2000+ temples, traditional gardens, and authentic Japanese culture.', '["Fushimi Inari Shrine", "Bamboo Grove", "Golden Pavilion", "Geisha District"]', 'High', 'March-May, October-November', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', 'Medium', 9000),
  
  ('Banff National Park, Canada', 'Canada', '["adventure", "nature", "outdoor"]', '["hiking", "wildlife", "mountains", "photography"]', 'Stunning Rocky Mountain landscapes with pristine lakes, glaciers, and abundant wildlife.', '["Lake Louise", "Moraine Lake", "Icefields Parkway", "Wildlife Viewing"]', 'High', 'June-September', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'Medium', 3000),
  
  ('Marrakech, Morocco', 'Morocco', '["cultural", "adventure", "exotic"]', '["markets", "architecture", "spices", "desert"]', 'Vibrant souks, stunning architecture, and gateway to the Sahara Desert.', '["Jemaa el-Fnaa", "Bahia Palace", "Atlas Mountains", "Desert Tours"]', 'Medium', 'October-April', 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800', 'Low', 4000),
  
  ('Reykjavik, Iceland', 'Iceland', '["adventure", "nature", "unique"]', '["northern-lights", "geysers", "glaciers", "photography"]', 'Land of fire and ice with dramatic landscapes, geothermal wonders, and the Northern Lights.', '["Blue Lagoon", "Golden Circle", "Northern Lights", "Glacier Tours"]', 'High', 'June-August, December-March', 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800', 'High', 2000),
  
  ('Bali, Indonesia', 'Indonesia', '["relaxation", "spiritual", "tropical"]', '["beaches", "temples", "yoga", "culture"]', 'Tropical paradise with ancient temples, pristine beaches, and rich spiritual culture.', '["Ubud Temples", "Rice Terraces", "Beach Resorts", "Volcano Hiking"]', 'Medium', 'April-October', 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800', 'Low', 12000),
  
  ('Costa Rica', 'Costa Rica', '["adventure", "nature", "eco-friendly"]', '["wildlife", "rainforest", "beaches", "adventure"]', 'Biodiversity hotspot with rainforests, volcanoes, and pristine beaches. Eco-tourism paradise.', '["Monteverde Cloud Forest", "Arenal Volcano", "Manuel Antonio Park", "Tortuguero"]', 'High', 'December-April', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'Medium', 4000),
  
  ('Prague, Czech Republic', 'Czech Republic', '["cultural", "historical", "romantic"]', '["architecture", "history", "beer", "music"]', 'Medieval charm with Gothic architecture, rich history, and vibrant cultural scene.', '["Charles Bridge", "Prague Castle", "Old Town Square", "Beer Culture"]', 'Medium', 'April-October', 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800', 'Low', 1000),
  
  ('New Zealand South Island', 'New Zealand', '["adventure", "nature", "outdoor"]', '["hiking", "mountains", "lakes", "adventure"]', 'Dramatic landscapes with fjords, mountains, and pristine wilderness. Adventure capital of the world.', '["Milford Sound", "Queenstown", "Franz Josef Glacier", "Hiking Trails"]', 'High', 'December-March', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'High', 18000),
  
  ('Portugal Algarve', 'Portugal', '["relaxation", "beach", "affordable"]', '["beaches", "seafood", "golf", "history"]', 'Stunning coastline with golden beaches, dramatic cliffs, and charming fishing villages.', '["Benagil Cave", "Lagos Beaches", "Golf Courses", "Seafood Cuisine"]', 'Medium', 'May-October', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'Low', 2000);
  
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION seed_destinations() TO anon, authenticated;







