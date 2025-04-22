-- Update access_requests table to store all user information
ALTER TABLE access_requests ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE access_requests ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE access_requests ADD COLUMN IF NOT EXISTS organization TEXT;
ALTER TABLE access_requests ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE access_requests ADD COLUMN IF NOT EXISTS investor_type TEXT;
ALTER TABLE access_requests ADD COLUMN IF NOT EXISTS comments TEXT;

-- Update RLS policies
DROP POLICY IF EXISTS "Anyone can insert an access request" ON access_requests;

-- Allow public insertion of access requests (no auth required)
CREATE POLICY "Anyone can insert an access request" 
ON access_requests FOR INSERT 
WITH CHECK (true);

-- Allow admins to read all access requests
CREATE POLICY "Admins can view all access requests"
ON access_requests FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Allow admins to update access requests
CREATE POLICY "Admins can update access requests"
ON access_requests FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);
