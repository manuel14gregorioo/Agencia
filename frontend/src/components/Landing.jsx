/**
 * ============================================
 * AGENCIA LANDING PAGE V2.1
 * ============================================
 * Mejoras adicionales:
 * - Animaciones de entrada en Hero
 * - Contador animado en stats
 * - WhatsApp flotante
 * - Dark mode toggle
 * - Active section indicator
 * - Smooth scroll con offset
 * - Parallax sutil
 * - Toast notifications
 * - Testimonial section
 * ============================================
 */

import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react';
import {
  Menu,
  X,
  Clock,
  Tag,
  MessageSquare,
  Phone,
  FileText,
  Rocket,
  Bot,
  Globe,
  Code,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Zap,
  Shield,
  Mail,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  Mic,
  Server,
  BadgeCheck,
  Star,
  Check,
  Minus,
  Sparkles,
  Timer,
  Euro,
  Headphones,
  Moon,
  Sun,
  MessageCircle,
  Quote,
  ArrowUp,
} from 'lucide-react';

import ContactForm from './ContactForm';

// ============================================
// CONTEXT PARA DARK MODE
// ============================================

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode: () => setDarkMode(!darkMode) }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// ============================================
// CONTEXT PARA TOAST NOTIFICATIONS
// ============================================

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts }) => (
  <div className="fixed bottom-24 right-6 z-[100] flex flex-col gap-2">
    {toasts.map(toast => (
      <div
        key={toast.id}
        className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-up ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' :
          toast.type === 'error' ? 'bg-red-500 text-white' :
          'bg-gray-900 text-white'
        }`}
      >
        {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
        {toast.type === 'error' && <X className="w-5 h-5" />}
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    ))}
  </div>
);

// ============================================
// HOOKS PERSONALIZADOS
// ============================================

const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

const useCountUp = (end, duration = 2000, isVisible = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return count;
};

const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * speed);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};

const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observers = [];
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const options = { rootMargin: '-20% 0px -70% 0px', threshold: 0 };

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [sectionIds]);

  return activeSection;
};

// ============================================
// DATOS ESTÁTICOS
// ============================================

const SERVICIOS = [
  {
    id: 'automatizacion',
    icon: Bot,
    titulo: 'Automatización',
    descripcion: 'Chatbots WhatsApp, sistemas de reservas, recordatorios automáticos',
    features: ['WhatsApp Business API', 'Reservas online 24/7', 'Recordatorios automáticos', 'Integración calendarios'],
    precio: '3.000 - 4.000€',
    popular: false,
  },
  {
    id: 'web',
    icon: Globe,
    titulo: 'Plataforma Web',
    descripcion: 'Landing pages, dashboards, portales de cliente con pagos integrados',
    features: ['Landing de conversión', 'Dashboard de gestión', 'Portal de clientes', 'Pagos Stripe integrados'],
    precio: '4.500 - 6.000€',
    popular: false,
  },
  {
    id: 'saas',
    icon: Server,
    titulo: 'SaaS Completo',
    descripcion: 'Productos digitales completos como VOCAP.io con todo incluido',
    features: ['Autenticación completa', 'Planes de suscripción', 'Procesamiento con IA', 'Dashboard profesional'],
    precio: '8.000 - 12.000€',
    popular: true,
  },
];

const COMPARATIVA = [
  { aspecto: 'Precio típico', agencias: '10.000 - 25.000€', freelancers: '500 - 2.000€', nosotros: '3.000 - 8.000€', destacado: false },
  { aspecto: 'Tiempo de entrega', agencias: '2-4 meses', freelancers: 'Impredecible', nosotros: '2-3 semanas', destacado: true },
  { aspecto: 'Comunicación', agencias: 'Account manager', freelancers: 'Variable', nosotros: 'Técnico directo', destacado: false },
  { aspecto: 'Soporte post-entrega', agencias: '3-6 meses', freelancers: 'Ninguno', nosotros: '1 mes incluido', destacado: false },
  { aspecto: 'Proyectos verificables', agencias: 'NDAs', freelancers: 'Raramente', nosotros: 'VOCAP.io público', destacado: true },
  { aspecto: 'Precio fijo cerrado', agencias: 'Sí', freelancers: 'A veces', nosotros: 'Siempre', destacado: false },
];

const PROCESO = [
  { paso: 1, titulo: 'Llamada inicial', duracion: '30 min gratis', descripcion: 'Entendemos tu negocio, problemas actuales y objetivos.', salida: 'Saber si encajamos', icon: Phone },
  { paso: 2, titulo: 'Propuesta detallada', duracion: '48 horas', descripcion: 'Scope exacto, precio fijo cerrado, timeline específico.', salida: 'Presupuesto sin sorpresas', icon: FileText },
  { paso: 3, titulo: 'Desarrollo sprint', duracion: '1-3 semanas', descripcion: 'Desarrollo con demos cada 2-3 días. Feedback continuo.', salida: 'Ver avances reales', icon: Rocket },
  { paso: 4, titulo: 'Entrega + Formación', duracion: 'Día final', descripcion: 'Sistema funcionando, documentación y formación incluida.', salida: 'Empezar a usarlo', icon: CheckCircle },
];

const FAQS = [
  { pregunta: '¿Tenéis ejemplos reales de vuestro trabajo?', respuesta: 'Sí, VOCAP.io es un proyecto propio que puedes probar gratis ahora mismo. Es una plataforma SaaS completa de transcripción con IA que demuestra nuestra capacidad end-to-end.' },
  { pregunta: '¿Cuánto tiempo tarda un proyecto?', respuesta: 'Automatizaciones simples en 1-2 semanas. Plataformas web en 2-3 semanas. SaaS completos como VOCAP.io en 3-4 semanas.' },
  { pregunta: '¿Cuánto cuesta?', respuesta: 'Automatizaciones desde 3.000€, plataformas web desde 4.500€, SaaS completos desde 8.000€. Precio fijo cerrado antes de empezar.' },
  { pregunta: '¿Qué pasa si necesito cambios después?', respuesta: 'Una ronda de revisiones está incluida sin coste. Para cambios posteriores: soporte a 80€/hora o packs mensuales.' },
  { pregunta: '¿Trabajáis solo en Madrid?', respuesta: '100% remoto. Trabajamos con clientes de toda España. Reuniones por videollamada, respuesta en menos de 24h.' },
];

const TECNOLOGIAS = [
  { nombre: 'Python/Flask', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { nombre: 'React', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
  { nombre: 'PostgreSQL', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  { nombre: 'Stripe', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  { nombre: 'OpenAI', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { nombre: 'Claude AI', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
  { nombre: 'Tailwind', color: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' },
  { nombre: 'Vercel', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
];

const SECTION_IDS = ['portfolio', 'servicios', 'proceso', 'pricing', 'faq', 'contacto'];

// ============================================
// UTILIDADES
// ============================================

const scrollToSection = (e, href) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

// ============================================
// COMPONENTES FLOTANTES
// ============================================

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/34XXXXXXXXX?text=Hola,%20me%20interesa%20un%20proyecto%20de%20desarrollo%20web"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${isHovered ? 'pr-6' : ''}`}>
        <MessageCircle className="w-6 h-6" />
        <span className={`text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ${isHovered ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}`}>
          ¿Hablamos?
        </span>
      </div>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    </a>
  );
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
      aria-label="Volver arriba"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

// ============================================
// NAVBAR
// ============================================

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

// ============================================
// HERO SECTION
// ============================================

const AnimatedCounter = ({ value, suffix = '', isVisible }) => {
  const count = useCountUp(value, 1500, isVisible);
  return <>{count}{suffix}</>;
};

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
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
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/20">
            <Sparkles className="w-4 h-4" />
            <span>SaaS en producción real</span>
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
          <a href="#contacto" onClick={(e) => scrollToSection(e, '#contacto')} className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-base border border-white/20 hover:bg-white/20 transition-all hover:scale-105 active:scale-[0.98]">
            <Phone className="w-5 h-5" /> Agendar Llamada
          </a>
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
            <img src="/images/vocap-hero.jpg" alt="VOCAP.io - Plataforma de transcripción con IA" className="w-full transition-transform duration-700 group-hover:scale-[1.02]" loading="eager" />
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
    </section>
  );
};

// ============================================
// VALUE PROPOSITION
// ============================================

const ValueProposition = () => {
  const [ref, isVisible] = useScrollAnimation();
  const pilares = [
    { icon: Zap, titulo: '2 semanas', subtitulo: 'No 3 meses', descripcion: 'Metodología ágil con sprints cortos. Ves avances cada 2-3 días.', color: 'from-purple-500 to-indigo-600', stat: 'vs 2-4 meses' },
    { icon: Euro, titulo: '3-8k€', subtitulo: 'No 10-25k€', descripcion: 'Precio fijo cerrado antes de empezar. Sin sorpresas ni extras.', color: 'from-emerald-500 to-teal-600', stat: 'vs 10-25k€' },
    { icon: Headphones, titulo: 'Técnico directo', subtitulo: 'No account manager', descripcion: 'Hablas con quien desarrolla tu proyecto. Sin intermediarios.', color: 'from-orange-500 to-red-600', stat: 'Comunicación' },
  ];

  return (
    <section className="section bg-white dark:bg-gray-900">
      <div ref={ref} className={`container-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 dark:text-white mb-4">El punto medio que tu negocio necesita</h2>
          <p className="lead dark:text-gray-400 max-w-2xl mx-auto">Calidad de agencia, velocidad de startup, precio justo.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pilares.map((pilar, index) => (
            <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-medium cursor-pointer" style={{ transitionDelay: `${index * 100}ms` }}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pilar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <pilar.icon className="w-7 h-7 text-white" />
              </div>
              <div className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium mb-4">{pilar.stat}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{pilar.titulo}</h3>
              <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-3">{pilar.subtitulo}</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{pilar.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// TESTIMONIAL
// ============================================

const TestimonialSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="py-16 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-800">
      <div ref={ref} className={`max-w-4xl mx-auto px-4 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Quote className="w-12 h-12 text-primary-300 dark:text-primary-600 mx-auto mb-6" />
        <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
          "Desarrollamos VOCAP.io en 3 semanas desde cero hasta producción. Autenticación, pagos con Stripe, procesamiento con OpenAI, dashboard completo. Ahora mismo tiene usuarios reales pagando suscripciones. Eso es lo que podemos hacer por tu negocio."
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">M</div>
          <div className="text-left">
            <p className="font-semibold text-gray-900 dark:text-white">Manuel Gregorio</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Founder @ AgenciaDev</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// PORTFOLIO
// ============================================

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
          <p className="lead dark:text-gray-400 max-w-2xl mx-auto">No hablamos de lo que podemos hacer. Aquí está lo que hemos hecho.</p>
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
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-medium">EN PRODUCCIÓN</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10">
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">VOCAP.io</h3>
                      <p className="text-white/60">Plataforma SaaS de Transcripción</p>
                    </div>
                  </div>

                  <p className="text-white/70 mb-8 leading-relaxed">
                    Transcripción de audio con IA, resúmenes automáticos, extracción de tareas. Competidor directo de Otter.ai a 1€/hora vs 8-12€.
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
                  <Code className="w-5 h-5 text-primary-600 dark:text-primary-400" /> Stack Tecnológico
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
                  {['Autenticación completa (registro, login, recuperar contraseña)', 'Sistema de créditos con 4 planes de suscripción', 'Transcripción con OpenAI Whisper (50+ idiomas)', 'Resúmenes automáticos con Claude AI', 'Dashboard de usuario con historial', 'Landing page bilingüe (ES/EN)', 'Integración completa con Stripe', 'Sistema de referidos'].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                      <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /><span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">"Este es nuestro proyecto propio. Puedes probarlo gratis, ver el código, verificar que funciona."</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Tu Proyecto Aquí</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">El próximo caso de éxito verificable podría ser el tuyo.</p>
            <a href="#contacto" onClick={(e) => scrollToSection(e, '#contacto')} className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all hover:scale-105 active:scale-[0.98]">
              Empecemos <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// COMPARISON
// ============================================

const ComparisonSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="section bg-white dark:bg-gray-800">
      <div ref={ref} className={`container-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 dark:text-white mb-4">Comparativa honesta</h2>
          <p className="lead dark:text-gray-400 max-w-2xl mx-auto">Sin marketing, solo hechos.</p>
        </div>

        <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="text-left py-5 px-6 font-semibold text-gray-900 dark:text-white">Aspecto</th>
                <th className="text-center py-5 px-6 font-semibold text-gray-500 dark:text-gray-400">Agencias</th>
                <th className="text-center py-5 px-6 font-semibold text-gray-500 dark:text-gray-400">Freelancers</th>
                <th className="text-center py-5 px-6 font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20">Nosotros</th>
              </tr>
            </thead>
            <tbody>
              {COMPARATIVA.map((row, index) => (
                <tr key={index} className={`border-t border-gray-100 dark:border-gray-700 ${row.destacado ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''}`}>
                  <td className="py-5 px-6 font-medium text-gray-900 dark:text-white">{row.aspecto}</td>
                  <td className="py-5 px-6 text-center text-gray-500 dark:text-gray-400">{row.agencias}</td>
                  <td className="py-5 px-6 text-center text-gray-500 dark:text-gray-400">{row.freelancers}</td>
                  <td className="py-5 px-6 text-center bg-primary-50/50 dark:bg-primary-900/10">
                    <span className={`inline-flex items-center gap-1.5 font-semibold ${row.destacado ? 'text-emerald-600 dark:text-emerald-400' : 'text-primary-600 dark:text-primary-400'}`}>
                      {row.destacado && <CheckCircle className="w-4 h-4" />}{row.nosotros}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {COMPARATIVA.map((row, index) => (
            <div key={index} className={`rounded-xl border p-4 ${row.destacado ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>
              <p className="font-semibold text-gray-900 dark:text-white mb-3">{row.aspecto}</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div><p className="text-gray-400 text-xs mb-1">Agencias</p><p className="text-gray-600 dark:text-gray-400">{row.agencias}</p></div>
                <div><p className="text-gray-400 text-xs mb-1">Freelancers</p><p className="text-gray-600 dark:text-gray-400">{row.freelancers}</p></div>
                <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2 -m-1"><p className="text-primary-600 dark:text-primary-400 text-xs mb-1">Nosotros</p><p className="font-semibold text-primary-700 dark:text-primary-300">{row.nosotros}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SERVICES
// ============================================

const ServiciosSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="servicios" className="section bg-gray-50 dark:bg-gray-900">
      <div ref={ref} className={`container-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 dark:text-white mb-4">Servicios</h2>
          <p className="lead dark:text-gray-400 max-w-2xl mx-auto">Tres niveles según lo que necesites. Precio fijo, sin sorpresas.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICIOS.map((servicio, index) => (
            <div key={servicio.id} className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-medium cursor-pointer ${servicio.popular ? 'border-primary-200 dark:border-primary-700 ring-2 ring-primary-100 dark:ring-primary-900' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              {servicio.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold"><Star className="w-3.5 h-3.5" /> MÁS POPULAR</span>
                </div>
              )}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${servicio.popular ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                <servicio.icon className={`w-7 h-7 ${servicio.popular ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{servicio.titulo}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[48px]">{servicio.descripcion}</p>
              <ul className="space-y-3 mb-8">
                {servicio.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${servicio.popular ? 'text-primary-500' : 'text-emerald-500'}`} />{feature}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <p className={`text-2xl font-bold ${servicio.popular ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>{servicio.precio}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Precio fijo cerrado</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">Stack tecnológico</p>
          <div className="flex flex-wrap justify-center gap-3">
            {TECNOLOGIAS.map((tech, index) => (
              <span key={index} className={`${tech.color} px-4 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105`}>{tech.nombre}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// PROCESS
// ============================================

const ProcesoSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="proceso" className="section-lg bg-white dark:bg-gray-800">
      <div ref={ref} className={`container-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 dark:text-white mb-4">Cómo trabajamos</h2>
          <p className="lead dark:text-gray-400 max-w-2xl mx-auto">Proceso transparente. Sabes qué esperar en cada fase.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {PROCESO.map((paso, index) => (
            <div key={paso.paso} className="relative">
              {index < PROCESO.length - 1 && <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-200 dark:from-primary-700 to-primary-100 dark:to-primary-800" />}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-medium transition-all duration-300 text-center group cursor-pointer">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-xl font-bold text-white">{paso.paso}</span>
                </div>
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-4 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-colors">
                  <paso.icon className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </div>
                <span className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">{paso.duracion}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{paso.titulo}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{paso.descripcion}</p>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Saldrás con</p>
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400">{paso.salida}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-2xl p-8 border border-primary-100 dark:border-gray-600">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Garantías incluidas</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Tag, text: 'Precio fijo cerrado antes de empezar' },
              { icon: Clock, text: 'Updates cada 2-3 días durante desarrollo' },
              { icon: CheckCircle, text: 'Primera ronda de revisiones incluida' },
              { icon: Code, text: 'Código documentado - no dependes de nosotros' },
            ].map((garantia, index) => (
              <div key={index} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 border border-primary-100 dark:border-gray-600">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <garantia.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{garantia.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// PRICING
// ============================================

const PricingSection = () => {
  const [ref, isVisible] = useScrollAnimation();
  const planes = [
    { nombre: 'Automatización', precio: '3.000 - 4.000€', descripcion: 'Elimina tareas repetitivas', features: ['Chatbot WhatsApp Business', 'Sistema de reservas online', 'Recordatorios automáticos', 'Integración calendario', '1 mes soporte incluido'], noIncluye: ['Dashboard personalizado', 'Múltiples integraciones'], cta: 'Consultar', popular: false },
    { nombre: 'Plataforma Web', precio: '4.500 - 6.000€', descripcion: 'Todo lo de Automatización + web profesional', features: ['Todo de Automatización', 'Landing page conversión', 'Dashboard de gestión', 'Portal de clientes', 'Pagos Stripe integrados', '1 mes soporte incluido'], noIncluye: ['Sistema de suscripciones'], cta: 'Consultar', popular: false },
    { nombre: 'SaaS Completo', precio: '8.000 - 12.000€', descripcion: 'Producto digital listo para escalar', features: ['Todo de Plataforma Web', 'Autenticación completa', 'Sistema de suscripciones', 'Procesamiento con IA', 'Dashboard avanzado', 'Multi-idioma opcional', '1 mes soporte incluido'], noIncluye: [], cta: 'Consultar', popular: true },
  ];

  return (
    <section id="pricing" className="section-lg bg-gray-900 text-white">
      <div ref={ref} className={`container-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="heading-2 text-white mb-4">Precios transparentes</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Sin letra pequeña, sin sorpresas. Precio fijo cerrado antes de empezar.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {planes.map((plan, index) => (
            <div key={plan.nombre} className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${plan.popular ? 'bg-white text-gray-900 ring-2 ring-primary-400' : 'bg-gray-800/50 border border-gray-700/50 hover:border-gray-600'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold"><Star className="w-3.5 h-3.5" /> RECOMENDADO</span>
                </div>
              )}
              <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-gray-900' : 'text-white'}`}>{plan.nombre}</h3>
              <p className={`text-sm mb-4 ${plan.popular ? 'text-gray-600' : 'text-gray-400'}`}>{plan.descripcion}</p>
              <div className="mb-6"><span className={`text-3xl font-bold ${plan.popular ? 'text-gray-900' : 'text-white'}`}>{plan.precio}</span></div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm ${plan.popular ? 'text-gray-600' : 'text-gray-300'}`}>
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-emerald-500' : 'text-emerald-400'}`} />{feature}
                  </li>
                ))}
                {plan.noIncluye.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Minus className="w-5 h-5 mt-0.5 flex-shrink-0" />{feature}
                  </li>
                ))}
              </ul>
              <a href="#contacto" onClick={(e) => scrollToSection(e, '#contacto')} className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-[0.98] ${plan.popular ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}`}>
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">Todos los precios son finales. IVA incluido para particulares, sin IVA para empresas.<br />Pago: 50% al inicio, 50% a la entrega.</p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FAQ
// ============================================

const FAQItem = ({ pregunta, respuesta, isOpen, onClick }) => (
  <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
    <button onClick={onClick} className="w-full py-6 flex items-center justify-between text-left hover:text-primary-600 dark:hover:text-primary-400 transition-colors group">
      <span className="font-semibold text-gray-900 dark:text-white pr-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{pregunta}</span>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${isOpen ? 'bg-primary-100 dark:bg-primary-900/30 rotate-180' : 'bg-gray-100 dark:bg-gray-700'}`}>
        <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`} />
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{respuesta}</p>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="faq" className="section bg-white dark:bg-gray-800">
      <div ref={ref} className={`max-w-3xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <h2 className="heading-2 text-gray-900 dark:text-white mb-4">Preguntas frecuentes</h2>
          <p className="lead dark:text-gray-400">Si tu pregunta no está aquí, escríbenos.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 px-6">
          {FAQS.map((faq, index) => (
            <FAQItem key={index} pregunta={faq.pregunta} respuesta={faq.respuesta} isOpen={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? -1 : index)} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CTA
// ============================================

const CTASection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="contacto" className="section-lg bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_25%_25%,rgba(255,255,255,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_75%_75%,rgba(139,92,246,0.2),transparent)]" />

      <div ref={ref} className={`container-lg relative z-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para empezar?</h2>
            <p className="text-xl text-white/80 mb-8">Llamada de 30 minutos sin compromiso. Te decimos si tiene sentido trabajar juntos.</p>
            <div className="space-y-4 mb-8">
              {['Analizamos tu caso particular', 'Te decimos honestamente si podemos ayudar', 'Propuesta con precio cerrado en 48h'].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center flex-shrink-0"><Check className="w-4 h-4 text-emerald-900" /></div>
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> Sin spam</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> Respuesta en 24h</div>
              <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4" /> Sin compromiso</div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER
// ============================================

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    servicios: [{ label: 'Automatización', href: '#servicios' }, { label: 'Plataformas Web', href: '#servicios' }, { label: 'SaaS Completo', href: '#servicios' }, { label: 'Consultoría', href: '#contacto' }],
    portfolio: [{ label: 'VOCAP.io', href: 'https://vocap.io', external: true }, { label: 'Casos de Éxito', href: '#portfolio' }],
    empresa: [{ label: 'Sobre Nosotros', href: '#' }, { label: 'Proceso', href: '#proceso' }, { label: 'Precios', href: '#pricing' }, { label: 'FAQ', href: '#faq' }],
    legal: [{ label: 'Privacidad', href: '#' }, { label: 'Términos', href: '#' }, { label: 'Cookies', href: '#' }],
  };

  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-white" /></div>
              <span className="font-bold text-lg text-white">AgenciaDev</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Desarrollo web y automatización para negocios que quieren resultados, no promesas.</p>
            <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4" /><span>Madrid · 100% Remoto</span></div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Servicios</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.servicios.map((link) => (<li key={link.label}><a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="hover:text-white transition-colors">{link.label}</a></li>))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Portfolio</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.portfolio.map((link) => (<li key={link.label}><a href={link.href} onClick={link.external ? undefined : (e) => scrollToSection(e, link.href)} className="hover:text-white transition-colors inline-flex items-center gap-1" {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}>{link.label}{link.external && <ExternalLink className="w-3 h-3" />}</a></li>))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.empresa.map((link) => (<li key={link.label}><a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="hover:text-white transition-colors">{link.label}</a></li>))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:hola@agenciadev.es" className="hover:text-white transition-colors flex items-center gap-2"><Mail className="w-4 h-4" /> hola@agenciadev.es</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Github className="w-4 h-4" /> GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {currentYear} AgenciaDev. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 text-sm">
            {footerLinks.legal.map((link) => (<a key={link.label} href={link.href} className="hover:text-white transition-colors">{link.label}</a>))}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-emerald-400"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Operativo</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> RGPD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// MAIN
// ============================================

const Landing = () => (
  <ThemeProvider>
    <ToastProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 font-sans antialiased transition-colors duration-300">
        <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
        <header role="banner"><Navbar /></header>
        <main id="main-content" role="main">
          <HeroSection />
          <ValueProposition />
          <TestimonialSection />
          <PortfolioSection />
          <ComparisonSection />
          <ServiciosSection />
          <ProcesoSection />
          <PricingSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTopButton />
      </div>
    </ToastProvider>
  </ThemeProvider>
);

export default Landing;
