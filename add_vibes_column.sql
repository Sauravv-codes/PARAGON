-- Add vibes column if it doesn't exist
ALTER TABLE destinations
ADD COLUMN IF NOT EXISTS vibes TEXT;

-- Update vibes for each destination based on their names
UPDATE destinations SET vibes = '["Cultural"]' WHERE name = 'Kathmandu Valley Heritage Tour';
UPDATE destinations SET vibes = '["Peaceful", "Adventure"]' WHERE name = 'Pokhara Lake & Mountain Views';
UPDATE destinations SET vibes = '["Peaceful", "Cultural"]' WHERE name = 'Langtang Valley Trek';
UPDATE destinations SET vibes = '["Wildlife", "Adventure"]' WHERE name = 'Chitwan National Park Safari';
UPDATE destinations SET vibes = '["Peaceful"]' WHERE name = 'Phewa Lake Light Walk';
UPDATE destinations SET vibes = '["Peaceful", "Wildlife"]' WHERE name = 'Khopra Ridge Trek';
UPDATE destinations SET vibes = '["Adventure"]' WHERE name = 'Everest Base Camp Trek';
UPDATE destinations SET vibes = '["Adventure", "Peaceful"]' WHERE name = 'Annapurna Base Camp Trek';
UPDATE destinations SET vibes = '["Adventure", "Cultural"]' WHERE name = 'Manaslu Circuit Trek';
UPDATE destinations SET vibes = '["Adventure"]' WHERE name = 'Dhaulagiri Circuit';
UPDATE destinations SET vibes = '["Adventure"]' WHERE name = 'Makalu Base Camp Trek';
UPDATE destinations SET vibes = '["Peaceful", "Adventure"]' WHERE name = 'Milun Lakes Trek';
UPDATE destinations SET vibes = '["Adventure", "Peaceful"]' WHERE name = 'Gokyo Lakes Trek';
UPDATE destinations SET vibes = '["Peaceful"]' WHERE name = 'Rara Lake Trek';
UPDATE destinations SET vibes = '["Cultural", "Adventure"]' WHERE name = 'Panch Pokhari Trek';
UPDATE destinations SET vibes = '["Cultural", "Peaceful"]' WHERE name = 'Trekking to Gosaikunda Lake';
UPDATE destinations SET vibes = '["Cultural"]' WHERE name = 'Baglung Parbat Trek';
UPDATE destinations SET vibes = '["Cultural"]' WHERE name = 'Tamang Heritage Trail';
UPDATE destinations SET vibes = '["Cultural"]' WHERE name = 'Kanyam & Dhulikhel Heritage Trek';
UPDATE destinations SET vibes = '["Adventure", "Cultural"]' WHERE name = 'Upper Dolpo Trek';
UPDATE destinations SET vibes = '["Adventure"]' WHERE name = 'Rolwaling Valley Trek';
UPDATE destinations SET vibes = '["Adventure"]' WHERE name = 'Jomolhari Trek';
UPDATE destinations SET vibes = '["Adventure", "Wildlife"]' WHERE name = 'Kangchenjunga Trek';

-- Check which rows were updated
SELECT COUNT(*) as rows_with_vibes FROM destinations WHERE vibes IS NOT NULL;
SELECT name FROM destinations WHERE vibes IS NULL;
