/*
  # Create storage bucket for project thumbnails

  1. New Storage
    - Create a public bucket for project thumbnails
    - Set up RLS policies for the bucket
  
  2. Security
    - Public read access for thumbnails
    - Only admin can upload/delete files
*/

-- Create a new public bucket for project thumbnails
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-thumbnails', 'project-thumbnails', true);

-- Allow public access to view files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-thumbnails');

-- Only allow admins to upload files
CREATE POLICY "Admin Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-thumbnails'
  AND auth.jwt()->>'role' = 'admin'
);

-- Only allow admins to update files
CREATE POLICY "Admin Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'project-thumbnails'
  AND auth.jwt()->>'role' = 'admin'
)
WITH CHECK (
  bucket_id = 'project-thumbnails'
  AND auth.jwt()->>'role' = 'admin'
);

-- Only allow admins to delete files
CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'project-thumbnails'
  AND auth.jwt()->>'role' = 'admin'
);