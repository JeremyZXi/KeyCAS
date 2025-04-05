/*
  # Update project policies

  1. Changes
    - Split RLS policies to allow reading for all authenticated users
    - Restrict modifications (insert/update/delete) to admin users only

  2. Security
    - Drop existing policy
    - Add new granular policies for different operations
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Enable all access for admins" ON projects;

-- Allow all authenticated users to read projects
CREATE POLICY "Allow authenticated users to view projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

-- Only allow admins to insert new projects
CREATE POLICY "Enable insert for admins only"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- Only allow admins to update projects
CREATE POLICY "Enable update for admins only"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- Only allow admins to delete projects
CREATE POLICY "Enable delete for admins only"
  ON projects
  FOR DELETE
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin');