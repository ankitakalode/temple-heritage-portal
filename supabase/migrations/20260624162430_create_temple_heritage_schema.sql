
-- Temples table
CREATE TABLE temples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT,
  deity_name TEXT NOT NULL,
  deity_significance TEXT,
  history TEXT,
  architecture_style TEXT,
  built_year TEXT,
  darshan_open_time TEXT,
  darshan_close_time TEXT,
  dress_code TEXT,
  entry_fee TEXT DEFAULT 'Free',
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  religion TEXT DEFAULT 'Hindu',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE temples ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_temples" ON temples FOR SELECT TO anon USING (true);
CREATE POLICY "insert_temples" ON temples FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "update_temples" ON temples FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "delete_temples" ON temples FOR DELETE TO anon USING (true);

-- Festivals table
CREATE TABLE festivals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  temple_id UUID REFERENCES temples(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  month TEXT,
  date_range TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE festivals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_festivals" ON festivals FOR SELECT TO anon USING (true);
CREATE POLICY "insert_festivals" ON festivals FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "update_festivals" ON festivals FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "delete_festivals" ON festivals FOR DELETE TO anon USING (true);

-- Rituals table
CREATE TABLE rituals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  temple_id UUID REFERENCES temples(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  time TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE rituals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_rituals" ON rituals FOR SELECT TO anon USING (true);
CREATE POLICY "insert_rituals" ON rituals FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "update_rituals" ON rituals FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "delete_rituals" ON rituals FOR DELETE TO anon USING (true);

-- Visitor info table
CREATE TABLE visitor_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  temple_id UUID REFERENCES temples(id) ON DELETE CASCADE UNIQUE,
  nearest_railway TEXT,
  nearest_airport TEXT,
  accommodation TEXT,
  special_guidelines TEXT,
  best_time_to_visit TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE visitor_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_visitor_info" ON visitor_info FOR SELECT TO anon USING (true);
CREATE POLICY "insert_visitor_info" ON visitor_info FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "update_visitor_info" ON visitor_info FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "delete_visitor_info" ON visitor_info FOR DELETE TO anon USING (true);
