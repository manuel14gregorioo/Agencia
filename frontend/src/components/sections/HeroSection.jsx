import React, { useState, useEffect } from 'react';
import {
  Clock,
  Euro,
  MapPin,
  Shield,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  Timer,
  Calendar,
  Play,
} from 'lucide-react';
import { useParallax, useCountUp } from '../hooks';
import { LazyImage, CalendlyButton, VideoModal } from '../ui';
import { scrollToSection } from '../../utils/scroll';

const AnimatedCounter = ({ value, suffix = '', isVisible }) => {
  const count = useCountUp(value, 1500, isVisible);
  return <>{count}{suffix}</>;
};

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const parallaxOffset = useParallax(0.3);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]" style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,rgba(139,92,246,0.2),transparent)]" style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`, backgroundSize: '64px 64px', transform: `translateY(${parallaxOffset * 0.2}px)` }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-32 md:pt-40 pb-20">
        <div className={`flex flex-wrap gap-3 justify-center mb-8 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a href="https://vocap.io" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium border border-white/10 hover:bg-white/20 transition-all group">
            <BadgeCheck className="w-4 h-4 text-emerald-400" />
            <span>Creadores de VOCAP.io</span>
          </a>
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/20">
            <Sparkles className="w-4 h-4" />
            <span>SaaS en produccion real</span>
          </div>
        </div>

        <div className={`text-center max-w-4xl mx-auto mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            De idea a sistema <br className="hidden sm:block" />
            funcionando en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient bg-[length:200%_auto]">2 semanas</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Mientras tu competencia espera 3 meses por una agencia tradicional, nosotros entregamos sistemas completos con precio fijo y sin sorpresas.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a href="#portfolio" onClick={(e) => scrollToSection(e, '#portfolio')} className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-base hover:bg-gray-100 transition-all shadow-lg shadow-white/10 hover:scale-105 active:scale-[0.98]">
            Ver Proyectos Reales <ArrowRight className="w-5 h-5" />
          </a>
          <CalendlyButton variant="secondary" className="px-8 py-4 rounded-xl text-base">
            <Calendar className="w-5 h-5" /> Agendar Llamada
          </CalendlyButton>
          <button
            onClick={() => setIsVideoOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold text-base border border-white/20 hover:bg-white/20 transition-all hover:scale-105 active:scale-[0.98] group"
            aria-label="Ver video promocional"
          >
            <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Play className="w-4 h-4 fill-current" />
            </span>
            Ver Video
          </button>
        </div>

        <div className={`flex flex-wrap gap-6 justify-center text-sm text-white/60 mb-16 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-400" /><span>Respuesta &lt;24h</span></div>
          <div className="flex items-center gap-2"><Euro className="w-4 h-4 text-emerald-400" /><span>Precio fijo cerrado</span></div>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /><span>Madrid · 100% Remoto</span></div>
          <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400" /><span>Sin permanencia</span></div>
        </div>

        <div className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transform: `translateY(${parallaxOffset * -0.2}px)` }}>
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-50 animate-pulse-slow" />
          <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden group">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-gray-900/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 bg-gray-800/80 rounded-lg px-4 py-1.5 text-sm text-white/60">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /><span>vocap.io</span>
                </div>
              </div>
            </div>
            <LazyImage src="/images/vocap-hero.jpg" alt="VOCAP.io - Plataforma de transcripcion con IA" className="w-full transition-transform duration-700 group-hover:scale-[1.02]" priority={true} />
          </div>

          <div className={`absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-strong p-4 border border-gray-100 dark:border-gray-700 hidden lg:block transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <Timer className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3 sem</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Desarrollo</p>
              </div>
            </div>
          </div>

          <div className={`absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-strong p-4 border border-gray-100 dark:border-gray-700 hidden lg:block transition-all duration-700 delay-800 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">15+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Features</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="/videos/agencia-intro.mp4"
      />
    </section>
  );
};

export { AnimatedCounter };
export default HeroSection;
