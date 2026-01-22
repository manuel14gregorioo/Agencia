import React from 'react';
import {
  BadgeCheck,
  Mic,
  Code,
  CheckCircle,
  Check,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import { AnimatedCounter } from './HeroSection';
import { scrollToSection } from '../../utils/scroll';

const PortfolioSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="portfolio" className="section bg-gray-50 dark:bg-gray-900">
      <div ref={ref} className={`container-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BadgeCheck className="w-4 h-4" /> Proyectos verificables, no promesas
          </div>
          <h2 className="heading-2 text-gray-900 dark:text-white mb-4">Portfolio</h2>
          <p className="lead dark:text-gray-400 max-w-2xl mx-auto">No hablamos de lo que podemos hacer. Aqui esta lo que hemos hecho.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-strong transition-all duration-300">
            <div className="grid lg:grid-cols-2">
              <div className="relative bg-gradient-to-br from-primary-900 via-purple-900 to-primary-800 p-8 lg:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_30%_30%,rgba(139,92,246,0.3),transparent)]" />
                <div className="relative">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" /> PROYECTO VERIFICABLE
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-medium">EN PRODUCCION</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10">
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">VOCAP.io</h3>
                      <p className="text-white/60">Plataforma SaaS de Transcripcion</p>
                    </div>
                  </div>

                  <p className="text-white/70 mb-8 leading-relaxed">
                    Transcripcion de audio con IA, resumenes automaticos, extraccion de tareas. Competidor directo de Otter.ai a 1€/hora vs 8-12€.
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                      <p className="text-3xl font-bold text-white"><AnimatedCounter value={3} isVisible={isVisible} /></p>
                      <p className="text-xs text-white/60 mt-1">Semanas dev</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                      <p className="text-3xl font-bold text-white"><AnimatedCounter value={15} suffix="+" isVisible={isVisible} /></p>
                      <p className="text-xs text-white/60 mt-1">Features</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                      <p className="text-3xl font-bold text-white"><AnimatedCounter value={4} isVisible={isVisible} /></p>
                      <p className="text-xs text-white/60 mt-1">Planes Stripe</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a href="https://vocap.io" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all hover:scale-105 active:scale-[0.98]">
                      Probar VOCAP.io <ExternalLink className="w-4 h-4" />
                    </a>
                    <a href="#contacto" onClick={(e) => scrollToSection(e, '#contacto')} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all hover:scale-105 active:scale-[0.98]">
                      Crear Similar <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <h4 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary-600 dark:text-primary-400" /> Stack Tecnologico
                </h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Flask', 'React', 'PostgreSQL', 'Stripe', 'OpenAI Whisper', 'Claude API', 'Tailwind CSS', 'Railway'].map((tech) => (
                    <span key={tech} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg text-sm font-medium">{tech}</span>
                  ))}
                </div>

                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Funcionalidades Incluidas
                </h4>
                <ul className="space-y-3 mb-8">
                  {['Autenticacion completa (registro, login, recuperar contrasena)', 'Sistema de creditos con 4 planes de suscripcion', 'Transcripcion con OpenAI Whisper (50+ idiomas)', 'Resumenes automaticos con Claude AI', 'Dashboard de usuario con historial', 'Landing page bilingue (ES/EN)', 'Integracion completa con Stripe', 'Sistema de referidos'].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                      <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /><span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">"Este es nuestro proyecto propio. Puedes probarlo gratis, ver el codigo, verificar que funciona."</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Tu Proyecto Aqui</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">El proximo caso de exito verificable podria ser el tuyo.</p>
            <a href="#contacto" onClick={(e) => scrollToSection(e, '#contacto')} className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all hover:scale-105 active:scale-[0.98]">
              Empecemos <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
