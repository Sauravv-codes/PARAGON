-- Add image_detail_url column to destinations table for high-resolution detail view images
ALTER TABLE destinations ADD COLUMN image_detail_url TEXT;

-- Update all destinations with placeholder detail images
-- These should be replaced with actual high-resolution images
UPDATE destinations SET image_detail_url = image_url WHERE image_detail_url IS NULL;

-- Optional: Add a comment to the column for documentation
COMMENT ON COLUMN destinations.image_detail_url IS 'High-resolution image URL for destination detail/full view page';
