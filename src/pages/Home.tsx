import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Code, Globe, Zap } from 'lucide-react';
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>KeyCAS - Power your initiatives with technology</title>
        <meta name="description" content="We’re a student-run organization dedicated to building tech that enhances life & student initiatives @Keystone Academy" />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 opacity-20 dark:opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-sm font-medium mono-text dark:bg-indigo-900 dark:text-indigo-200">
                  STUDENT-LED DEVELOPMENT
                </span>
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 heading-text leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <TypeAnimation
                  sequence={[
                    'Power Your Initiatives With Internet',
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={0}
                  speed={{ type: 'keyStrokeDelayInMs', value: 50 }}
                  style={{ display: 'inline-block' }}
                
                />
              </motion.h1>
              
              <motion.div 
                className="bg-gray-900 text-green-400 font-mono p-6 rounded-lg mb-8 text-left shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center mb-2 text-gray-400 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1.5"></div>
                  <div className="ml-auto mono-text">terminal@keycas:~$</div>
                </div>
                <TypeAnimation
                  sequence={[
                    '> Have a project you want everyone to know about?',
                    500,
                    '> Want to raise awareness about something that matters?',
                    500,
                    '> Need a professional website to showcase your work?',
                    500,
                    '> We\'re here to help you succeed!',
                    500,
                    '> Enjoy expert website support tailored to your needs',
                    2000,
                  ]}
                  wrapper="div"
                  cursor={true}
                  repeat={Infinity}
                  style={{ fontSize: '1.2em' }}
                />
              </motion.div>
              
              <motion.div 
                className="mb-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="cursive-text text-3xl mb-4 text-indigo-600 dark:text-indigo-400">Created by students, for students.</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  We’re a student-run organization dedicated to building tech that enhances life & student initiatives @Keystone Academy
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium shadow-lg flex items-center mx-auto mono-text">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-4 heading-text">Why Choose KeyCAS?</h2>
              <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                We combine technical expertise with a student-centered approach to deliver exceptional results.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Code className="h-10 w-10 text-indigo-500" />}
                title="Expert Development"
                description="Custom websites built with cutting-edge technologies for optimal performance and user experience."
                delay={0.4}
              />
              <FeatureCard 
                icon={<Globe className="h-10 w-10 text-indigo-500" />}
                title="Campus Reach"
                description="Increase your visibility within the campus community and beyond with our strategic approach."
                delay={0.6}
              />
              <FeatureCard 
                icon={<Zap className="h-10 w-10 text-indigo-500" />}
                title="Fast Turnaround"
                description="We understand student timelines and deliver projects quickly without compromising quality."
                delay={0.8}
              />
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div 
      className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="bg-white dark:bg-gray-800 p-3 rounded-full inline-block mb-4 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 heading-text">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}
