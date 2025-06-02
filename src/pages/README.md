# Supabase Setup Instructions

To properly set up your Supabase database for this application, follow these steps:

1. Create a new Supabase project at https://supabase.com

2. After creating your project, navigate to the SQL Editor

3. Run the SQL script provided in `supabase/setup.sql` to create all necessary tables and populate them with sample data

4. Update the Supabase connection details in `src/lib/supabase.ts`:
   - Replace `supabaseUrl` with your project URL (found in Project Settings > API)
   - Replace `supabaseKey` with your project's anon/public key (found in Project Settings > API)

5. Set up Row Level Security (RLS) policies as defined in the setup script to ensure proper data access control

6. For production use, make sure to:
   - Use environment variables for the Supabase URL and key
   - Add more restrictive RLS policies as needed
   - Consider adding more sophisticated authentication logic

## Database Schema

The application uses three main tables:

1. **equipment** - Stores all construction equipment available for rent
2. **rentals** - Tracks all rental orders made by customers
3. **contacts** - Stores customer inquiries submitted through the contact form

## API Reference

The application interacts with Supabase through service modules:

- `equipmentService.ts` - Handles equipment retrieval and search
- `rentalService.ts` - Manages rental creation and status tracking
- `contactService.ts` - Processes contact form submissions