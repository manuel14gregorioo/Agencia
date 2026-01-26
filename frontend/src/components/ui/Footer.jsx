import React from 'react';
import { MapPin, Mail, Linkedin, Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    servicios: [
      { label: 'Automatización', href: '#servicios' },
      { label: 'Plataformas Web', href: '#servicios' },
      { label: 'SaaS Completo', href: '#servicios' }
    ],
    portfolio: [
      { label: 'VOCAP.io', href: 'https://vocap.io', external: true },
      { label: 'Casos de Éxito', href: '#portfolio' }
    ],
    empresa: [
      { label: 'Proceso', href: '#proceso' },
      { label: 'Precios', href: '#pricing' },
      { label: 'Blog', href: '#/blog' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contacto', href: '#contacto' }
    ],
    legal: [
      { label: 'Privacidad', href: '#/privacidad' },
      { label: 'Términos', href: '#/terminos' },
      { label: 'Cookies', href: '#/cookies' }
    ],
  };

  return (
    <footer className="bg-noir-950 pt-20 pb-8 px-4 md:px-8">
      <div className="container-xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-display text-2xl font-bold text-cream-50">M.G.M</span>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-noir-500">Automations</span>
            </div>
            <p className="text-sm text-noir-400 mb-6 leading-relaxed">
              Desarrollo web y automatizaciones para negocios que quieren resultados, no promesas.
            </p>
            <div className="flex items-center gap-2 text-sm text-noir-500">
              <MapPin className="w-4 h-4 text-lime-500" />
              <span>Madrid · 100% Remoto</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-cream-50 mb-6">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-sm text-noir-400 hover:text-lime-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h4 className="font-display font-bold text-cream-50 mb-6">Portfolio</h4>
            <ul className="space-y-3">
              {footerLinks.portfolio.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={link.external ? undefined : (e) => scrollToSection(e, link.href)}
                    className="text-sm text-noir-400 hover:text-lime-400 transition-colors inline-flex items-center gap-1 group"
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {link.label}
                    {link.external && <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-cream-50 mb-6">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-sm text-noir-400 hover:text-lime-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-cream-50 mb-6">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hola@mgmautomations.es"
                  className="text-sm text-noir-400 hover:text-lime-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  hola@mgmautomations.es
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-noir-400 hover:text-lime-400 transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-noir-400 hover:text-lime-400 transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t-3 border-noir-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-noir-500">
            © {currentYear} M.G.M Automations. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6 text-sm">
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-noir-500 hover:text-lime-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-2 text-lime-400">
              <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
              Operativo
            </span>
            <span className="flex items-center gap-2 text-noir-500">
              RGPD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
