export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  status: 'completed' | 'maintaining' | 'developing' | 'deprecated';
  technologies: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          name: string;
          description: string;
          thumbnail: string;
          status: 'completed' | 'maintaining' | 'developing' | 'deprecated';
          technologies: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Project, 'id'>;
        Update: Partial<Omit<Project, 'id'>>;
      };
    };
  };
}