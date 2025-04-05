import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Upload } from 'lucide-react';
import { toast } from 'react-toastify';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';

type ProjectFormData = Omit<Project, 'id'>;

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const navigate = useNavigate();
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProjectFormData>();
  const thumbnailFile = watch('thumbnail');

  useEffect(() => {
    checkAuth();
    fetchProjects();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      navigate('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  }

  async function fetchProjects() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  }

  async function uploadThumbnail(file: File): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Delete previous file if editing
    if (editingId && previewUrl) {
      try {
        const prevFileName = previewUrl.split('/').pop();
        if (prevFileName) {
          await supabase.storage
            .from('project-thumbnails')
            .remove([prevFileName]);
        }
      } catch (error) {
        console.error('Error removing previous thumbnail:', error);
        // Continue with new upload even if delete fails
      }
    }

    const { error: uploadError, data } = await supabase.storage
      .from('project-thumbnails')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error details:', uploadError);
      throw new Error('Failed to upload thumbnail');
    }

    const { data: { publicUrl } } = supabase.storage
      .from('project-thumbnails')
      .getPublicUrl(filePath);

    return publicUrl;
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    try {
      setIsUploading(true);
      const publicUrl = await uploadThumbnail(file);
      setValue('thumbnail', publicUrl);
      toast.success('Thumbnail uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload thumbnail');
      console.error('Upload error:', error);
      // Reset preview if upload fails
      setPreviewUrl('');
    } finally {
      setIsUploading(false);
    }
  }

  async function onSubmit(data: ProjectFormData) {
    try {
      console.log('Form data before formatting:', data); // Debug log
      
      // Ensure technologies is properly formatted as an array
      const formattedData = {
        ...data,
        technologies: Array.isArray(data.technologies) 
          ? data.technologies 
          : (typeof data.technologies === 'string' 
              ? (data.technologies as string).split(',').map((tech: string) => tech.trim()) 
              : [])
      };
      
      console.log('Formatted data:', formattedData); // Debug log

      if (editingId) {
        const { error } = await supabase
          .from('projects')
          .update(formattedData)
          .eq('id', editingId);

        if (error) {
          console.error('Supabase update error:', error);
          throw new Error(`Failed to update project: ${error.message}`);
        }
        
        toast.success('Project updated successfully');
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([formattedData]);

        if (error) {
          console.error('Supabase insert error:', error);
          throw new Error(`Failed to create project: ${error.message}`);
        }
        
        toast.success('Project created successfully');
      }

      reset();
      setEditingId(null);
      setPreviewUrl('');
      fetchProjects();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to save project: ${errorMessage}`);
      console.error('Submit error:', error);
    }
  }

  async function deleteProject(id: string) {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
      console.error('Delete error:', error);
    }
  }

  function editProject(project: Project) {
    setEditingId(project.id);
    
    // Reset form first
    reset();
    
    // Set values for each field
    setValue('name', project.name);
    setValue('description', project.description);
    setValue('status', project.status);
    setValue('thumbnail', project.thumbnail);
    
    // Convert technologies array to comma-separated string for the input field
    if (Array.isArray(project.technologies) && project.technologies.length > 0) {
      const techString = project.technologies.join(', ');
      setValue('technologies', techString as unknown as any);
    } else {
      setValue('technologies', '' as unknown as any);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel - TechSupport</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold heading-text">Project Management</h1>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              toast.success('Signed out successfully');
              navigate('/admin/login');
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mono-text"
          >
            Sign Out
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Project Website URL</label>
              <input
                type="url"
                placeholder="https://example.com"
                {...register('thumbnail', { 
                  required: 'Website URL is required',
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: 'Must be a valid URL starting with http:// or https://'
                  }
                })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
              />
              {errors.thumbnail && <span className="text-red-500 text-sm">{errors.thumbnail.message}</span>}
              {watch('thumbnail') && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Website: {watch('thumbnail')}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                {...register('status', { required: 'Status is required' })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
              >
                <option value="completed">Completed</option>
                <option value="maintaining">Maintaining</option>
                <option value="developing">Developing</option>
                <option value="deprecated">Deprecated</option>
              </select>
              {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
              <input
                {...register('technologies', {
                  required: 'Technologies are required',
                  validate: (value: unknown) => {
                    if (typeof value === 'string' && value.trim() === '') {
                      return 'Technologies cannot be empty';
                    }
                    return true;
                  }
                })}
                defaultValue=""
                placeholder="React, TypeScript, Tailwind CSS"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
              />
              {errors.technologies && <span className="text-red-500 text-sm">{errors.technologies.message}</span>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {editingId ? 'Update Project' : 'Add Project'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  reset({
                    name: '',
                    description: '',
                    status: 'completed',
                    thumbnail: '',
                    technologies: '' as unknown as any
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            )}
          </div>
        </form>

        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-xl font-medium">No projects found</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Add your first project using the form above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4 bg-gray-100 dark:bg-gray-700 text-center">
                  <a 
                    href={project.thumbnail} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-2"
                  >
                    <span>View Website</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 heading-text">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">{project.description}</p>
                  
                  {/* Display technologies */}
                  <div className="mb-4 flex flex-wrap gap-1">
                    {project.technologies && project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusConfig[project.status].activeClass
                    }`}>
                      {project.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editProject(project)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full dark:hover:bg-blue-900"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full dark:hover:bg-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const statusConfig = {
  completed: {
    activeClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  maintaining: {
    activeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  developing: {
    activeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  },
  deprecated: {
    activeClass: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  }
};