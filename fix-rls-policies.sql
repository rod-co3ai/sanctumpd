-- Allow inserting new profiles during registration
CREATE POLICY "Anyone can insert a profile" 
ON profiles FOR INSERT 
WITH CHECK (true);

-- Allow inserting new access requests during registration
CREATE POLICY "Anyone can insert an access request" 
ON access_requests FOR INSERT 
WITH CHECK (true);

-- Check if the trigger for new users exists and create it if not
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    -- Create a trigger to create a profile record when a new user signs up
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO public.profiles (id, full_name, email, created_at)
      VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.email,
        NOW()
      );
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Create the trigger
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END
$$;
