import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Zap,
  Shield,
  Play,
  Calendar,
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
  const parallaxOffset = useParallax(0.15);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: 2, suffix: ' sem', label: 'Entrega' },
    { value: 15, suffix: '+', label: 'Proyectos' },
    { value: 100, suffix: '%', label: 'Remoto' },
  ];

  return (
    <section className="relative min-h-screen bg-cream-50 dark:bg-noir-950 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 bg-grid opacity-50 dark:opacity-30"
        style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border-3 border-lime-400 opacity-20 rotate-12 hidden lg:block" />
      <div className="absolute bottom-40 left-10 w-24 h-24 bg-coral-500/10 hidden lg:block" />
      <div
        className="absolute top-1/3 right-1/4 w-4 h-4 bg-lime-400 hidden lg:block"
        style={{ transform: `translateY(${parallaxOffset * -0.5}px)` }}
      />

      {/* Main content */}
      <div className="relative z-10 container-xl mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Text content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className={`mb-8 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a
                href="https://vocap.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 bg-noir-900 dark:bg-lime-400 text-cream-50 dark:text-noir-900 font-bold text-xs uppercase tracking-wider border-3 border-noir-900 dark:border-lime-400 transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal dark:hover:shadow-brutal-lime group"
              >
                <span className="w-2 h-2 bg-lime-400 dark:bg-noir-900 rounded-full animate-pulse" />
                Creadores de VOCAP.io
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>

            {/* Headline */}
            <div className={`mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="heading-display text-noir-900 dark:text-cream-50 mb-6">
                De idea a{' '}
                <span className="relative inline-block">
                  sistema
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 2 150 2 198 10" stroke="#BFFF00" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>
                <br />
                <span className="text-lime-500 dark:text-lime-400">funcionando</span>
              </h1>
              <p className="text-lead max-w-xl">
                Mientras tu competencia espera 3 meses por una agencia tradicional,
                nosotros entregamos <strong className="text-noir-900 dark:text-cream-50">sistemas completos en 2 semanas</strong> con precio fijo.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a
                href="#portfolio"
                onClick={(e) => scrollToSection(e, '#portfolio')}
                className="btn-primary group"
              >
                Ver Proyectos
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              <CalendlyButton
                variant="secondary"
                className="btn-secondary group"
              >
                <Calendar className="w-5 h-5" />
                Agendar Llamada
              </CalendlyButton>
            </div>

            {/* Trust indicators */}
            <div className={`flex flex-wrap gap-6 text-sm transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-2 text-noir-600 dark:text-noir-400">
                <Clock className="w-4 h-4 text-lime-500" />
                <span>Respuesta &lt;24h</span>
              </div>
              <div className="flex items-center gap-2 text-noir-600 dark:text-noir-400">
                <Zap className="w-4 h-4 text-lime-500" />
                <span>Precio fijo cerrado</span>
              </div>
              <div className="flex items-center gap-2 text-noir-600 dark:text-noir-400">
                <Shield className="w-4 h-4 text-lime-500" />
                <span>Sin permanencia</span>
              </div>
            </div>
          </div>

          {/* Right column - Visual */}
          <div className={`order-1 lg:order-2 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div
              className="relative"
              style={{ transform: `translateY(${parallaxOffset * -0.1}px)` }}
            >
              {/* Browser mockup */}
              <div className="relative bg-noir-900 border-3 border-noir-900 dark:border-noir-700 shadow-brutal-lg dark:shadow-brutal-lime overflow-hidden group">
                {/* Browser header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-noir-800 border-b-3 border-noir-700">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-coral-500" />
                    <div className="w-3 h-3 rounded-full bg-lime-400" />
                    <div className="w-3 h-3 rounded-full bg-noir-600" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 bg-noir-700 px-4 py-1.5 text-xs text-noir-400 font-mono">
                      <Shield className="w-3 h-3 text-lime-400" />
                      vocap.io
                    </div>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative overflow-hidden">
                  <LazyImage
                    src="/images/vocap-hero.jpg"
                    alt="VOCAP.io - Plataforma SaaS de transcripción con IA"
                    className="w-full transition-transform duration-700 group-hover:scale-105"
                    priority={true}
                  />

                  {/* Play button overlay */}
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="absolute inset-0 flex items-center justify-center bg-noir-900/0 hover:bg-noir-900/40 transition-all duration-300 group/play"
                    aria-label="Ver video demo"
                  >
                    <div className="w-20 h-20 bg-lime-400 border-3 border-noir-900 flex items-center justify-center opacity-0 group-hover/play:opacity-100 scale-75 group-hover/play:scale-100 transition-all duration-300 shadow-brutal">
                      <Play className="w-8 h-8 text-noir-900 fill-current ml-1" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Floating stats cards */}
              <div className={`absolute -bottom-8 -left-8 bg-cream-50 dark:bg-noir-800 border-3 border-noir-900 p-4 shadow-brutal hidden lg:block transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-lime-400 border-3 border-noir-900 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-noir-900" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50">
                      <AnimatedCounter value={3} isVisible={isLoaded} /> sem
                    </p>
                    <p className="text-xs font-bold uppercase tracking-wide text-noir-500">Desarrollo</p>
                  </div>
                </div>
              </div>

              <div className={`absolute -top-6 -right-6 bg-coral-500 border-3 border-noir-900 p-4 shadow-brutal hidden lg:block transition-all duration-700 delay-800 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <p className="text-3xl font-display font-bold text-white">
                  <AnimatedCounter value={15} suffix="+" isVisible={isLoaded} />
                </p>
                <p className="text-xs font-bold uppercase tracking-wide text-white/80">Features</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className={`mt-20 lg:mt-32 transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-3 border-3 border-noir-900 dark:border-noir-700 divide-x-3 divide-noir-900 dark:divide-noir-700 bg-cream-50 dark:bg-noir-900">
            {stats.map((stat, index) => (
              <div key={index} className="py-8 px-4 text-center group hover:bg-lime-400 dark:hover:bg-lime-400 transition-colors duration-300">
                <p className="text-3xl md:text-4xl font-display font-bold text-noir-900 dark:text-cream-50 dark:group-hover:text-noir-900 transition-colors">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isLoaded} />
                </p>
                <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-noir-500 dark:text-noir-400 dark:group-hover:text-noir-700 transition-colors mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 py-4 bg-noir-900 dark:bg-lime-400 border-t-3 border-noir-900 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-8 mx-8 text-cream-50 dark:text-noir-900 font-bold uppercase tracking-wider text-sm">
                <span>Automatización</span>
                <span className="w-2 h-2 bg-lime-400 dark:bg-noir-900" />
                <span>Desarrollo Web</span>
                <span className="w-2 h-2 bg-lime-400 dark:bg-noir-900" />
                <span>SaaS</span>
                <span className="w-2 h-2 bg-lime-400 dark:bg-noir-900" />
                <span>IA</span>
                <span className="w-2 h-2 bg-lime-400 dark:bg-noir-900" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="/videos/vocap-promo.mp4"
      />
    </section>
  );
};

export { AnimatedCounter };
export default HeroSection;
