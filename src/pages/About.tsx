import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Card from '../../app/components/Card';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaDribbble, FaLink } from 'react-icons/fa';
import { Users } from 'lucide-react';

export default function About() {
  const teamMembers = [
    {
      name: 'Xiyan Jeremy Zhang',
      about: 'Lead Developer',
      email: 'xiyan.zhang@student.keystoneacademy.cn',
      profilePicUrl: 'https://via.placeholder.com/150',
      socialLinks: [
        { icon: <FaGithub />, url: 'https://github.com/JeremyZXi' },
        { icon: <FaLink />, url: 'https://jeremyzxi.github.io/' },
      ],
    },
    {
      name: 'Eric Xinyu Gao',
      about: 'Lead Developer',
      email: 'xinyu.gao@student.keystoneacademy.cn',
      profilePicUrl: 'https://via.placeholder.com/150',
      socialLinks: [
        { icon: <FaGithub />, url: 'https://github.com/Er1cG1ao' },
      ],
    },
    {
      name: 'Mingqian Robert Liao',
      about: 'Marketing & Communications',
      email: 'mingqian.liao@student.keystoneacademy.cn',
      profilePicUrl: 'https://via.placeholder.com/150',
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com/in/janesmith' },
        { icon: <FaDribbble />, url: 'https://dribbble.com/janesmith' },
      ],
    },
    {
      name: 'Guanxi Bobc Mei',
      about: 'Co-developer',
      email: 'guanxi.mei@student.keystoneacademy.cn',
      profilePicUrl: 'https://via.placeholder.com/150',
      socialLinks: [
        { icon: <FaLinkedin />, url: 'https://linkedin.com/in/janesmith' },
        { icon: <FaDribbble />, url: 'https://dribbble.com/janesmith' },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - KeyCAS</title>
        <meta name="description" content="Learn about our tech support team and mission" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-sm font-medium mono-text dark:bg-indigo-900 dark:text-indigo-200">
                  OUR TEAM
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 heading-text leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Meet The Founders
              </motion.h1>
              
              <motion.div 
                className="mb-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="cursive-text text-3xl mb-4 text-indigo-600 dark:text-indigo-400">Built by students, for students.</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Our team of dedicated students came together with one mission: to help fellow students showcase their initiatives and make a positive impact beyond the campus.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Users className="h-10 w-10 text-indigo-500 mr-3" />
                <h2 className="text-3xl font-bold heading-text">Our Team</h2>
              </div>
              <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                Get to know our team
              </p>
            </motion.div>
            
            <StyledTeam>
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.2 }}
                >
                  <Card
                    name={member.name}
                    about={member.about}
                    email={member.email}
                    profilePicUrl={member.profilePicUrl}
                    socialLinks={member.socialLinks}
                  />
                </motion.div>
              ))}
            </StyledTeam>
          </div>
        </section>
      </motion.div>
    </>
  );
}

const StyledTeam = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;