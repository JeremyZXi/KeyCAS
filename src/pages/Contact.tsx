import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function Contact() {
    const contacts = [
        { name: 'Eric Gao', email: 'xinyu.gao@student.keystoneacademy.cn' },
        { name: 'Jeremy Zhang', email: 'xiyan.zhang@student.keystoneacademy.cn' },
        { name: 'Robert Liao', email: 'mingqian.liao@student.keystoneacademy.cn' },
        { name: 'Bobc Mei', email: 'guanxi.mei@student.keystoneacademy.cn' },
        { name: 'Admin', email: 'admin@keycas.cn' },
    ];

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
                <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-10 text-center">
                    Need help or want to join us? Reach out to a member of our team below.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {contacts.map((contact, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-transform hover:scale-105"
                        >
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {contact.name}
                            </h2>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <Mail className="w-5 h-5 mr-2 text-blue-500" />
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="text-blue-600 dark:text-blue-400 underline break-all"
                                >
                                    {contact.email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </>
    );
}
