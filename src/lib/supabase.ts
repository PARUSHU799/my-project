import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'postgresql://postgres:[YOUR-PASSWORD]@db.ffwkrrucotvtiimwvntp.supabase.co:5432/postgres';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types based on our Supabase schema
export type Equipment = {
  id: string;
  name: string;
  category: string;
  description: string;
  price_per_day: number;
  image_url: string;
  available: boolean;
  created_at?: string;
};

export type Rental = {
  id: string;
  equipment_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  start_date: string;
  end_date: string;
  delivery_address: string;
  payment_method: 'online' | 'offline';
  payment_status: 'pending' | 'paid' | 'cancelled';
  total_amount: number;
  status: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'returned' | 'cancelled';
  created_at?: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at?: string;
};