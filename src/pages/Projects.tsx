import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Filter, Terminal, GitBranch, GitCommit, GitMerge } from 'lucide-react';
import type { Project } from '../types';
import { supabase } from '../lib/supabase';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }
        
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const filteredProjects = selectedStatus === 'all'
    ? projects
    : projects.filter(project => project.status === selectedStatus);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const statusConfig = {
    completed: {
      icon: GitMerge,
      activeClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      inactiveClass: 'bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500',
      label: 'COMPLETED'
    },
    maintaining: {
      icon: GitCommit,
      activeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      inactiveClass: 'bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500',
      label: 'MAINTAINING'
    },
    developing: {
      icon: GitBranch,
      activeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      inactiveClass: 'bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500',
      label: 'DEVELOPING'
    },
    deprecated: {
      icon: Terminal,
      activeClass: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      inactiveClass: 'bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500',
      label: 'DEPRECATED'
    }
  };

  return (
    <>
      <Helmet>
        <title>Our Projects - TechSupport</title>
        <meta name="description" content="Explore our successful tech support projects and solutions" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-4 md:mb-0"
          >
            Our Projects
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm ${
              projects.length === 0 && !isLoading ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-gray-700 dark:text-gray-200"
              disabled={projects.length === 0 && !isLoading}
            >
              <option value="all">All Projects</option>
              <option value="completed">Completed</option>
              <option value="maintaining">Maintaining</option>
              <option value="developing">In Development</option>
              <option value="deprecated">Deprecated</option>
            </select>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">No projects found</h2>
            <p className="text-gray-600 dark:text-gray-300">Check back later for new projects!</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-xl browser-window">
                  <div className="absolute top-0 w-full h-6 bg-gray-200 dark:bg-gray-800 flex items-center px-2 space-x-1 z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-xs text-gray-600 dark:text-gray-400 truncate flex-grow overflow-hidden">
                      {(() => {
                        try {
                          const url = new URL(project.thumbnail);
                          return url.hostname;
                        } catch (e) {
                          return project.thumbnail;
                        }
                      })()}
                    </div>
                  </div>
                  
                  <div className="relative w-full h-full pt-6 overflow-hidden">
                    <iframe
                      src={project.thumbnail}
                      title={project.name}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onLoad={(e) => {
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.classList.add('iframe-loaded');
                        }
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.classList.add('iframe-error');
                        }
                      }}
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-60 transition-all duration-300">
                      <a 
                        href={project.thumbnail} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition-colors z-10 flex items-center gap-2"
                      >
                        Visit Website
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="absolute top-8 right-4 flex flex-col gap-2 z-20">
                    {Object.entries(statusConfig).map(([status, config]) => {
                      const Icon = config.icon;
                      const isActive = project.status === status;
                      return (
                        <div
                          key={status}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                            isActive ? config.activeClass : config.inactiveClass
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{config.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(project.technologies) && project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}