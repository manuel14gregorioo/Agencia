import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useActiveSection } from '../hooks';
import { SECTION_IDS } from '../../data/constants';
import { scrollToSection } from '../../utils/scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#portfolio', label: 'Portfolio', id: 'portfolio' },
    { href: '#servicios', label: 'Servicios', id: 'servicios' },
    { href: '#proceso', label: 'Proceso', id: 'proceso' },
    { href: '#pricing', label: 'Precios', id: 'pricing' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-700/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled ? 'bg-primary-600' : 'bg-white/10 backdrop-blur-sm'
            }`}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className={`font-bold text-lg transition-colors ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
              AgenciaDev
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  scrolled
                    ? activeSection === link.id
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    : activeSection === link.id
                      ? 'text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full" />
                )}
              </a>
            ))}

            <button
              onClick={toggleDarkMode}
              className={`ml-2 p-2 rounded-full transition-colors ${
                scrolled
                  ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                  : 'hover:bg-white/10 text-white/80'
              }`}
              aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a
              href="#contacto"
              onClick={(e) => scrollToSection(e, '#contacto')}
              className={`ml-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                scrolled
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              Contactar
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${scrolled ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : 'hover:bg-white/10'}`}
            >
              {darkMode ? <Sun className={`w-5 h-5 ${scrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white'}`} /> : <Moon className={`w-5 h-5 ${scrolled ? 'text-gray-600' : 'text-white'}`} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${scrolled ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : 'hover:bg-white/10'}`}
            >
              {isOpen ? (
                <X className={`w-6 h-6 ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl -mx-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { scrollToSection(e, link.href); setIsOpen(false); }}
                className={`block py-3 font-medium ${
                  activeSection === link.id
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => { scrollToSection(e, '#contacto'); setIsOpen(false); }}
              className="block mt-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-3 rounded-xl font-semibold text-center"
            >
              Contactar
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
