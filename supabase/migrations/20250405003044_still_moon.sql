/*
  # Update projects table RLS policies

  1. Changes
    - Update SELECT policy to allow authenticated users to view all projects
    - Keep existing policies for INSERT, UPDATE, and DELETE (admin only)
  
  2. Security
    - All authenticated users can read projects
    - Only admin users can modify projects
*/

-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Allow authenticated users to view projects" ON projects;

-- Create new SELECT policy that allows all authenticated users to view projects
CREATE POLICY "Allow authenticated users to view projects"
ON projects
FOR SELECT
TO authenticated
USING (true);