-- Aftertaste · Drink Cabinet
-- Setup SQL for Supabase

CREATE TABLE IF NOT EXISTS drinks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'other',
  note TEXT DEFAULT '',
  rating INTEGER DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  date DATE DEFAULT CURRENT_DATE,
  lux_reply TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow all operations (personal tool, no auth needed)
ALTER TABLE drinks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON drinks
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Index for common queries
CREATE INDEX idx_drinks_date ON drinks (date DESC);
CREATE INDEX idx_drinks_type ON drinks (type);
