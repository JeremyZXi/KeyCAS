import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us - TechSupport</title>
        <meta name="description" content="Get in touch with our tech support team" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Coming soon...
        </p>
      </motion.div>
    </>
  );
}