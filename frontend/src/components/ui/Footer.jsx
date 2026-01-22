import React from 'react';
import { Zap, MapPin, Mail, Linkedin, Github, ExternalLink, Shield } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    servicios: [
      { label: 'Automatizacion', href: '#servicios' },
      { label: 'Plataformas Web', href: '#servicios' },
      { label: 'SaaS Completo', href: '#servicios' },
      { label: 'Consultoria', href: '#contacto' }
    ],
    portfolio: [
      { label: 'VOCAP.io', href: 'https://vocap.io', external: true },
      { label: 'Casos de Exito', href: '#portfolio' }
    ],
    empresa: [
      { label: 'Sobre Nosotros', href: '#' },
      { label: 'Proceso', href: '#proceso' },
      { label: 'Precios', href: '#pricing' },
      { label: 'FAQ', href: '#faq' }
    ],
    legal: [
      { label: 'Privacidad', href: '#' },
      { label: 'Terminos', href: '#' },
      { label: 'Cookies', href: '#' }
    ],
  };

  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">AgenciaDev</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Desarrollo web y automatizacion para negocios que quieren resultados, no promesas.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Madrid · 100% Remoto</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Servicios</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Portfolio</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.portfolio.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={link.external ? undefined : (e) => scrollToSection(e, link.href)}
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:hola@agenciadev.es" className="hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" /> hola@agenciadev.es
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {currentYear} AgenciaDev. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 text-sm">
            {footerLinks.legal.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Operativo
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> RGPD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
