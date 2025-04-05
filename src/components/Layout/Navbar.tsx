import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  // Use different logo based on theme
  const logoPath = theme === 'dark' ? '/logo_white.png' : '/logo_black.png';

  return (
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center">
                <img
                    src={logoPath}
                    alt="Logo"
                    className="h-8 w-auto object-contain"
                />
                <span className="ml-2 text-xl font-bold">KeyCAS</span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map(item => (
                  <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                          `px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive
                              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`
                      }
                  >
                    {item.label}
                  </NavLink>
              ))}
              <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-200"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium
                  ${isActive
                                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`
                        }
                    >
                      {item.label}
                    </NavLink>
                ))}
                <button
                    onClick={toggleTheme}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center">
                    {theme === 'dark' ? (
                        <>
                          <Sun className="h-5 w-5 mr-2" />
                          <span>Light Mode</span>
                        </>
                    ) : (
                        <>
                          <Moon className="h-5 w-5 mr-2" />
                          <span>Dark Mode</span>
                        </>
                    )}
                  </div>
                </button>
              </div>
            </div>
        )}
      </nav>
  );
}
