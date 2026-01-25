import React from 'react';
import {
  BadgeCheck,
  Mic,
  Code,
  Check,
  ExternalLink,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import { AnimatedCounter } from './HeroSection';
import { scrollToSection } from '../../utils/scroll';

const PortfolioSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  const techStack = [
    'Flask', 'React', 'PostgreSQL', 'Stripe', 'OpenAI Whisper', 'Claude API', 'Tailwind CSS', 'Railway'
  ];

  const features = [
    'Autenticacion completa (registro, login, recuperar contrasena)',
    'Sistema de creditos con 4 planes de suscripcion',
    'Transcripcion con OpenAI Whisper (50+ idiomas)',
    'Resumenes automaticos con Claude AI',
    'Dashboard de usuario con historial',
    'Landing page bilingue (ES/EN)',
    'Integracion completa con Stripe',
    'Sistema de referidos'
  ];

  return (
    <section id="portfolio" className="section bg-cream-50 dark:bg-noir-950 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-lime-400/5 dark:bg-lime-400/3 -skew-x-12 origin-top-left" />

      <div ref={ref} className="container-xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-noir-900 dark:bg-lime-400 text-cream-50 dark:text-noir-900 text-xs font-bold uppercase tracking-wider mb-6">
            <BadgeCheck className="w-4 h-4" />
            Proyecto verificable
          </span>
          <h2 className="heading-xl text-noir-900 dark:text-cream-50 mb-4">
            No hablamos de lo que podemos hacer.
          </h2>
          <p className="text-lead max-w-2xl mx-auto">
            Aqui esta lo que <strong className="text-noir-900 dark:text-cream-50">hemos hecho</strong>.
          </p>
        </div>

        {/* Main project card */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="border-3 border-noir-900 dark:border-noir-700 bg-cream-50 dark:bg-noir-900 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left - Project showcase */}
              <div className="relative bg-noir-900 p-8 lg:p-12">
                {/* Decorative grid */}
                <div className="absolute inset-0 bg-grid opacity-20" />

                <div className="relative">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-lime-400 text-noir-900 text-xs font-bold uppercase tracking-wider">
                      <BadgeCheck className="w-4 h-4" />
                      Verificable
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-coral-500 text-white text-xs font-bold uppercase tracking-wider">
                      En Produccion
                    </span>
                  </div>

                  {/* Project header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-lime-400 border-3 border-lime-400 flex items-center justify-center">
                      <Mic className="w-8 h-8 text-noir-900" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-display font-bold text-cream-50">VOCAP.io</h3>
                      <p className="text-noir-400">Plataforma SaaS de Transcripcion</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-noir-300 mb-8 leading-relaxed text-lg">
                    Transcripcion de audio con IA, resumenes automaticos, extraccion de tareas.
                    Competidor directo de Otter.ai a <strong className="text-lime-400">1€/hora</strong> vs 8-12€.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="border-3 border-noir-700 p-4 text-center bg-noir-800/50 hover:border-lime-400 transition-colors">
                      <p className="text-3xl font-display font-bold text-lime-400">
                        <AnimatedCounter value={3} isVisible={isVisible} />
                      </p>
                      <p className="text-xs font-bold uppercase tracking-wider text-noir-500 mt-1">Semanas</p>
                    </div>
                    <div className="border-3 border-noir-700 p-4 text-center bg-noir-800/50 hover:border-lime-400 transition-colors">
                      <p className="text-3xl font-display font-bold text-cream-50">
                        <AnimatedCounter value={15} suffix="+" isVisible={isVisible} />
                      </p>
                      <p className="text-xs font-bold uppercase tracking-wider text-noir-500 mt-1">Features</p>
                    </div>
                    <div className="border-3 border-noir-700 p-4 text-center bg-noir-800/50 hover:border-lime-400 transition-colors">
                      <p className="text-3xl font-display font-bold text-coral-500">
                        <AnimatedCounter value={4} isVisible={isVisible} />
                      </p>
                      <p className="text-xs font-bold uppercase tracking-wider text-noir-500 mt-1">Planes</p>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://vocap.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-lime-400 text-noir-900 px-6 py-4 font-bold uppercase tracking-wide border-3 border-lime-400 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal-lime"
                    >
                      Probar VOCAP.io
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="#contacto"
                      onClick={(e) => scrollToSection(e, '#contacto')}
                      className="inline-flex items-center gap-2 bg-transparent text-cream-50 px-6 py-4 font-bold uppercase tracking-wide border-3 border-noir-700 hover:border-cream-50 transition-all duration-300"
                    >
                      Crear Similar
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right - Tech & Features */}
              <div className="p-8 lg:p-12">
                {/* Tech stack */}
                <div className="mb-10">
                  <h4 className="flex items-center gap-2 text-lg font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
                    <Code className="w-5 h-5 text-lime-500" />
                    Stack Tecnologico
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-noir-100 dark:bg-noir-800 text-noir-700 dark:text-noir-300 text-sm font-semibold border-2 border-noir-200 dark:border-noir-700 hover:border-lime-400 dark:hover:border-lime-400 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
                    <Check className="w-5 h-5 text-lime-500" />
                    Funcionalidades Incluidas
                  </h4>
                  <ul className="space-y-3">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-noir-600 dark:text-noir-400">
                        <Check className="w-5 h-5 text-lime-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                <div className="mt-8 p-4 border-l-4 border-lime-400 bg-noir-50 dark:bg-noir-800/50">
                  <p className="text-sm text-noir-600 dark:text-noir-400 italic">
                    "Este es nuestro proyecto propio. Puedes probarlo gratis, ver el codigo, verificar que funciona."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next project placeholder */}
        <div className={`mt-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="#contacto"
            onClick={(e) => scrollToSection(e, '#contacto')}
            className="group block border-3 border-dashed border-noir-300 dark:border-noir-700 hover:border-lime-400 dark:hover:border-lime-400 p-12 text-center transition-all duration-300"
          >
            <div className="w-16 h-16 mx-auto mb-4 border-3 border-noir-300 dark:border-noir-700 group-hover:border-lime-400 group-hover:bg-lime-400 flex items-center justify-center transition-all duration-300">
              <Plus className="w-8 h-8 text-noir-400 group-hover:text-noir-900 transition-colors" />
            </div>
            <h3 className="text-xl font-display font-bold text-noir-900 dark:text-cream-50 mb-2">
              Tu Proyecto Aqui
            </h3>
            <p className="text-noir-500 dark:text-noir-400 mb-6">
              El proximo caso de exito verificable podria ser el tuyo.
            </p>
            <span className="inline-flex items-center gap-2 text-lime-600 dark:text-lime-400 font-bold uppercase tracking-wide group-hover:gap-4 transition-all">
              Empecemos
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
