import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useActiveSection } from '../hooks';
import { SECTION_IDS } from '../../data/constants';
import { scrollToSection } from '../../utils/scroll';
import { Link } from '../../App';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: '#portfolio', label: 'Trabajo', id: 'portfolio' },
    { href: '#servicios', label: 'Servicios', id: 'servicios' },
    { href: '/blog', label: 'Blog', id: 'blog', isPage: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream-50/95 dark:bg-noir-950/95 backdrop-blur-md border-b-3 border-noir-900 dark:border-noir-800'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Navegacion principal"
    >
      <div className="container-xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="M.G.M Automations - Inicio"
          >
            <div className={`relative transition-all duration-300 ${scrolled ? '' : 'dark:text-cream-50'}`}>
              <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-noir-900 dark:text-cream-50">
                M.G.M
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-lime-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
            <span className={`hidden sm:block text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
              scrolled ? 'text-noir-500 dark:text-noir-400' : 'text-noir-600 dark:text-noir-400'
            }`}>
              Automations
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {navLinks.map((link) => (
              link.isPage ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-5 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                    activeSection === link.id
                      ? 'text-noir-900 dark:text-lime-400'
                      : 'text-noir-500 dark:text-noir-400 hover:text-noir-900 dark:hover:text-cream-50'
                  }`}
                  role="menuitem"
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-lime-400" aria-hidden="true" />
                  )}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-5 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                    activeSection === link.id
                      ? 'text-noir-900 dark:text-lime-400'
                      : 'text-noir-500 dark:text-noir-400 hover:text-noir-900 dark:hover:text-cream-50'
                  }`}
                  role="menuitem"
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-lime-400" aria-hidden="true" />
                  )}
                </a>
              )
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-3 border-2 border-noir-200 dark:border-noir-700 hover:border-noir-900 dark:hover:border-lime-400 transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-sm"
              aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-lime-400" />
              ) : (
                <Moon className="w-5 h-5 text-noir-900" />
              )}
            </button>

            {/* CTA Button */}
            <a
              href="#contacto"
              onClick={(e) => scrollToSection(e, '#contacto')}
              className="ml-4 group inline-flex items-center gap-2 bg-noir-900 dark:bg-lime-400 text-cream-50 dark:text-noir-900 px-6 py-3 font-bold text-sm uppercase tracking-wide border-3 border-noir-900 dark:border-lime-400 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal dark:hover:shadow-brutal-lime"
            >
              Contactar
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-3 border-2 border-noir-200 dark:border-noir-700 transition-colors"
              aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-lime-400" />
              ) : (
                <Moon className="w-5 h-5 text-noir-900" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 border-2 border-noir-200 dark:border-noir-700 transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-noir-900 dark:text-cream-50" />
              ) : (
                <Menu className="w-6 h-6 text-noir-900 dark:text-cream-50" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out-expo ${
            isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          role="menu"
          aria-label="Menu de navegacion movil"
        >
          <div className="py-6 border-t-3 border-noir-900 dark:border-noir-800 bg-cream-50 dark:bg-noir-950">
            {navLinks.map((link, index) => (
              link.isPage ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-4 text-lg font-bold uppercase tracking-wide transition-all duration-300 ${
                    activeSection === link.id
                      ? 'text-noir-900 dark:text-lime-400 pl-4 border-l-4 border-lime-400'
                      : 'text-noir-500 dark:text-noir-400 hover:text-noir-900 dark:hover:text-cream-50 hover:pl-4'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { scrollToSection(e, link.href); setIsOpen(false); }}
                  className={`block py-4 text-lg font-bold uppercase tracking-wide transition-all duration-300 ${
                    activeSection === link.id
                      ? 'text-noir-900 dark:text-lime-400 pl-4 border-l-4 border-lime-400'
                      : 'text-noir-500 dark:text-noir-400 hover:text-noir-900 dark:hover:text-cream-50 hover:pl-4'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  role="menuitem"
                >
                  {link.label}
                </a>
              )
            ))}

            <a
              href="#contacto"
              onClick={(e) => { scrollToSection(e, '#contacto'); setIsOpen(false); }}
              className="mt-6 block bg-lime-400 text-noir-900 px-6 py-4 font-bold text-center uppercase tracking-wide border-3 border-noir-900 transition-all duration-300 active:scale-[0.98]"
              role="menuitem"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
