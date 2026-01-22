import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cyfqqhqbpdheynpeyfgg.supabase.co';
const supabaseAnonKey = 'sb_publishable_C-x5xZ7DhTnKjgtvI1eJhQ_EMhdqmuo';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
