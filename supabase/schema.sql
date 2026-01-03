-- Bek.uz Supabase Database Schema
-- O'zbekiston Xizmatlar Bozori
-- Updated: Idempotent script (avvalgi xatolarni inobatga olgan holda)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  phone TEXT,
  avatar TEXT,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  card_number TEXT,
  role TEXT NOT NULL CHECK (role IN ('CLIENT', 'PROVIDER')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name_uz TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- Insert default categories (only if they don't exist)
INSERT INTO categories (id, name_uz, name_ru, icon) VALUES
  ('plumber', 'Santexnik', 'Сантехник', 'wrench'),
  ('electrician', 'Elektrik', 'Электрик', 'zap'),
  ('barber', 'Sartarosh', 'Парикмахер', 'scissors'),
  ('chef', 'Oshpaz', 'Повар', 'chef-hat'),
  ('cleaner', 'Tozalash', 'Уборка', 'sparkles'),
  ('driver', 'Haydovchi', 'Водитель', 'car'),
  ('teacher', 'O''qituvchi', 'Учитель', 'graduation-cap'),
  ('repairman', 'Ta''mirchi', 'Ремонтник', 'hammer'),
  ('painter', 'Bo''yoqchi', 'Маляр', 'paintbrush'),
  ('carpenter', 'Duradgor', 'Плотник', 'tree-pine'),
  ('tailor', 'Tikuvchi', 'Портной', 'shirt'),
  ('photographer', 'Fotograf', 'Фотограф', 'camera'),
  ('hotel', 'Mehmonxona', 'Гостиница', 'building-2'),
  ('restaurant', 'Restoran', 'Ресторан', 'utensils-crossed'),
  ('beauty', 'Go''zallik saloni', 'Салон красоты', 'heart'),
  ('fitness', 'Fitnes trener', 'Фитнес тренер', 'dumbbell'),
  ('courier', 'Kuryer', 'Курьер', 'truck'),
  ('other', 'Boshqa', 'Другое', 'more-horizontal')
ON CONFLICT (id) DO NOTHING;

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL REFERENCES categories(id),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service items table
CREATE TABLE IF NOT EXISTS service_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  name_uz TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  description_uz TEXT,
  description_ru TEXT
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES users(id),
  provider_id UUID NOT NULL REFERENCES users(id),
  service_item_id UUID NOT NULL REFERENCES service_items(id),
  scheduled_date DATE NOT NULL,
  scheduled_time TEXT NOT NULL,
  location_link TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
  price DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'TEXT' CHECK (type IN ('TEXT', 'IMAGE', 'VOICE', 'LOCATION')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  from_user_id UUID NOT NULL REFERENCES users(id),
  to_user_id UUID NOT NULL REFERENCES users(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (order_id, from_user_id, to_user_id)
);

-- Indexes for performance (IF NOT EXISTS is not standard for indexes in all postgres versions, but usually safe to omit or use DO block. Supabase Postgres 15+ supports IF NOT EXISTS for indexes)
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_services_user_id ON services(user_id);
CREATE INDEX IF NOT EXISTS idx_services_category_id ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_service_items_service_id ON service_items(service_id);
CREATE INDEX IF NOT EXISTS idx_orders_client_id ON orders(client_id);
CREATE INDEX IF NOT EXISTS idx_orders_provider_id ON orders(provider_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_messages_order_id ON messages(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_to_user_id ON reviews(to_user_id);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Drop existing first to allow updates)

-- Users
DROP POLICY IF EXISTS "Users are viewable by everyone" ON users;
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
CREATE POLICY "Users can insert their own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Services
DROP POLICY IF EXISTS "Active services are viewable by everyone" ON services;
CREATE POLICY "Active services are viewable by everyone" ON services FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Users can manage own services" ON services;
CREATE POLICY "Users can manage own services" ON services FOR ALL USING (auth.uid() = user_id);

-- Service items
DROP POLICY IF EXISTS "Service items are viewable by everyone" ON service_items;
CREATE POLICY "Service items are viewable by everyone" ON service_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service owners can manage items" ON service_items;
CREATE POLICY "Service owners can manage items" ON service_items FOR ALL 
  USING (EXISTS (SELECT 1 FROM services WHERE services.id = service_items.service_id AND services.user_id = auth.uid()));

-- Orders
DROP POLICY IF EXISTS "Order participants can view" ON orders;
CREATE POLICY "Order participants can view" ON orders FOR SELECT 
  USING (auth.uid() = client_id OR auth.uid() = provider_id);

DROP POLICY IF EXISTS "Clients can create orders" ON orders;
CREATE POLICY "Clients can create orders" ON orders FOR INSERT 
  WITH CHECK (auth.uid() = client_id);

DROP POLICY IF EXISTS "Participants can update orders" ON orders;
CREATE POLICY "Participants can update orders" ON orders FOR UPDATE 
  USING (auth.uid() = client_id OR auth.uid() = provider_id);

-- Messages
DROP POLICY IF EXISTS "Order participants can view messages" ON messages;
CREATE POLICY "Order participants can view messages" ON messages FOR SELECT 
  USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = messages.order_id AND (orders.client_id = auth.uid() OR orders.provider_id = auth.uid())));

DROP POLICY IF EXISTS "Order participants can send messages" ON messages;
CREATE POLICY "Order participants can send messages" ON messages FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_id AND (orders.client_id = auth.uid() OR orders.provider_id = auth.uid())));

-- Reviews
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Order participants can create reviews" ON reviews;
CREATE POLICY "Order participants can create reviews" ON reviews FOR INSERT 
  WITH CHECK (auth.uid() = from_user_id);

-- Enable realtime for messages (if not enabled)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'messages') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE messages;
  END IF;
END $$;
