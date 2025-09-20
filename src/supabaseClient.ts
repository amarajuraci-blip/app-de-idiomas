import { createClient } from '@supabase/supabase-js'

// Substitua os textos abaixo pelas suas chaves do Supabase
const supabaseUrl = 'https://rgdbfpxzkpybttvgmjyv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZGJmcHh6a3B5YnR0dmdtanl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzMzMTMsImV4cCI6MjA3Mzk0OTMxM30.8VInUv_GI4aRmVriRj_lEDAyW-bWynXX9Udxqpn7x5w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)