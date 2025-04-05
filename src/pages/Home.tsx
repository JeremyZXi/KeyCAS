import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>KeyCAS - Power your initiatives with technology</title>
        <meta name="description" content="Professional tech support services for all your IT needs" />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <TypeAnimation
                  sequence={[
                    'Power Your Initiatives With Internet',
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={0} // Only play once
                  speed={{ type: 'keyStrokeDelayInMs', value: 50 }} // Adjust typing speed
                  style={{ display: 'inline-block' }}
                  cursorBlinking={false} // Stop cursor from blinking after animation completes
                />
              </h1>
              
              {/* Typing effect container */}
              <div className="bg-gray-900 text-green-400 font-mono p-4 rounded-lg mb-8 text-left">
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
              </div>
              
              <div className="mb-8">
  <TypeAnimation
    sequence={[
      'Created by students, for students. We build websites that showcase your initiatives, amplify your message, and help you make an impact on campus and beyond.',
    ]}
    wrapper="p"
    speed={50}
    className="text-lg text-gray-600 dark:text-gray-300"
    cursor={true}
    repeat={0}
    cursorBlinking={false}
  />
</div>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
