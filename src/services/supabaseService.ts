import { supabase } from '../lib/Supabase';

export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  image_url: string;
  image_detail_url?: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  duration_min: number;
  duration_max: number;
  altitude: string;
  rating: number;
  reviews_count: number;
  carbon_score: number;
  carbon_footprint: 'low' | 'medium' | 'high';
  eco_score: number;
  cost_budget: number;
  cost_medium: number;
  cost_luxury: number;
  is_hidden_gem: boolean;
  group_friendly: boolean;
  children_friendly: boolean;
  elderly_friendly: boolean;
  accessibility_notes: string;
  created_at: string;
  updated_at: string;
}

export interface DestinationWithDetails extends Destination {
  activities?: string[];
  vibes?: string[];
  highlights?: string[];
  amenities?: string[];
}

export const destinationsService = {
  async getAll(): Promise<DestinationWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('rating', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        return [];
      }

      // Parse vibes from JSON string to array
      return (data || []).map((dest: any) => ({
        ...dest,
        vibes: dest.vibes ? JSON.parse(dest.vibes) : [],
      }));
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return [];
    }
  },

  async getById(id: string): Promise<DestinationWithDetails | null> {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error:', error);
        return null;
      }

      if (!data) return null;

      return {
        ...data,
        vibes: data.vibes ? JSON.parse(data.vibes) : [],
      };
    } catch (error) {
      console.error('Error fetching destination:', error);
      return null;
    }
  },
};

export const agenciesService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('travel_agencies')
        .select('*')
        .eq('verified', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching agencies:', error);
      return [];
    }
  },
};

export const bookingsService = {
  async create(booking: any) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },
};
