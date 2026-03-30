import {createClient} from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.supabaseUrl;
const supabaseAnonKey = process.env.supabaseAnonKey;

export const supabase = createClient (supabaseUrl, supabaseAnonKey);