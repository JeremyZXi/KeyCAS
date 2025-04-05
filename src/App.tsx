import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home.tsx';
import Projects from './pages/Projects.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Admin from './pages/Admin.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <ErrorBoundary>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                </Routes>
              </main>
            </ErrorBoundary>
          </div>
          <ToastContainer position="bottom-right" theme="colored" />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;