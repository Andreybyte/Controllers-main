import {createClient} from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.supabaseUrl;
const supabaseRoleKey = process.env.supabaseRoleKey;

console.log("Url:",  supabaseUrl);
console.log("RoleKey:",  supabaseRoleKey);

export const supabase = createClient(supabaseUrl, supabaseRoleKey );

