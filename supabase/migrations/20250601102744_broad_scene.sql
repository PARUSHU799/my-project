-- Enable the pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Equipment table
CREATE TABLE equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price_per_day INTEGER NOT NULL,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rentals table
CREATE TABLE rentals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id UUID REFERENCES equipment(id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  delivery_address TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample equipment data
INSERT INTO equipment (name, category, description, price_per_day, image_url, available) VALUES
  ('JCB 3DX Backhoe Loader', 'Earth Moving', 'Versatile backhoe loader perfect for digging, loading, and material handling.', 15000, 'https://constructionopportunities.in/wp-content/uploads/2023/09/JCB-August-2023.jpg', true),
  ('Excavator', 'Earth Moving', 'High demand machine for efficient excavation work.', 18000, 'https://www.constructionweekonline.com/cloud/2021/07/06/Komatsu-PC200-8MO_0.jpg', true),
  ('Dumper', 'Earth Moving', 'Loading and unloading the price depending in trips not one day.', 4000, 'https://5.imimg.com/data5/IOS/Default/2023/4/304438167/IQ/WP/DF/152653515/product-jpeg-1000x1000.png', true),
  ('Tractor Compressor', 'Earth Moving', 'Heavy-duty rock driller for high-rise construction projects.', 5000, 'https://3.imimg.com/data3/NS/JW/MY-1714762/tractor-air-compressor-500x500.jpeg', true),
  ('Tower Crane', 'Lifting Equipment', 'Heavy-duty tower crane for high-rise construction projects.', 25000, 'https://wallpapercave.com/wp/wp1915969.jpg', true),
  ('Concrete Mixer', 'Concrete Equipment', 'Heavy-duty concrete mixer for high-rise construction projects.', 10000, 'https://th.bing.com/th/id/R.1851ae07813c1ed9fbe879e98b899d66?rik=iX1GfspsbOcSuA&riu=http%3a%2f%2fwww.lynnhuff.com%2fwp-content%2fuploads%2f2019%2f07%2fSelf-loading-concrete-mixer10.jpg&ehk=RwTtWUDI5SbEWs5yzvwQdcnXBUAQ6rTDZ7NQlw8ficQ%3d&risl=&pid=ImgRaw&r=0', true),
  ('Drilling Machine', 'Earth Moving', 'Heavy-duty drilling equipment for construction projects.', 3000, 'https://as1.ftcdn.net/v2/jpg/01/34/35/16/1000_F_134351604_PhlLLMglKdLrnIDNjUOjACLNBbtsdOVs.jpg', true),
  ('Slab Core Cutting Machine', 'Concrete Equipment', 'Heavy-duty slab coring cutting for high-rise construction projects.', 25000, 'https://i.ytimg.com/vi/HZk1iPZ4uw8/maxresdefault.jpg', true),
  ('Pipe Line Laying Equipment', 'Earth Moving', 'Equipment for laying water line and sewage line.', 12000, 'https://media.sciencephoto.com/image/t8260084/800wm/T8260084-Laying_water_pipes.jpg', true),
  ('Demolition Equipment', 'Earth Moving', 'Heavy machinery for building demolition projects.', 20000, 'https://c8.alamy.com/comp/FY10PP/demolition-of-old-industrial-building-FY10PP.jpg', true);

-- Create or replace RLS policies
-- Enable row level security
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Equipment policy - Public can read, only authenticated users can modify
CREATE POLICY "Public can read equipment" ON equipment
  FOR SELECT USING (true);

-- Rentals policy - Authenticated users can create, admin can read all
CREATE POLICY "Authenticated users can create rentals" ON rentals
  FOR INSERT WITH CHECK (true);

-- Contacts policy - Anyone can create contacts
CREATE POLICY "Anyone can create contacts" ON contacts
  FOR INSERT WITH CHECK (true);