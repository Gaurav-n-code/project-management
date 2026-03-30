import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL || 'https://yipkmqovncyjtscfubsb.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcGttcW92bmN5anRzY2Z1YnNiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg0MDgzMCwiZXhwIjoyMDkwNDE2ODMwfQ.eap1Mg-qGJpALwOCQuLjNkpCYQpgvQUuvBVAoQb1hTg'
);