/**
 * ============================================
 * AGENCIA LANDING PAGE
 * ============================================
 * Landing page profesional para agencia de desarrollo web y automatización
 *
 * Stack: React + Tailwind CSS + Lucide Icons
 * Estilo: Moderno tipo Linear/Vercel, profesional pero accesible
 * ============================================
 */

import React, { useState, useEffect } from 'react';
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
  ChevronUp,
  Calculator,
  Zap,
  Shield,
  RefreshCw,
  Mail,
  MapPin,
  Linkedin,
  Github,
  TrendingUp,
  Calendar,
  CreditCard,
  MessageCircle,
  Sparkles,
  ExternalLink,
  Mic,
  Database,
  Server,
  BadgeCheck,
} from 'lucide-react';

import ContactForm from './ContactForm';

// ============================================
// DATOS ESTÁTICOS
// ============================================

const SERVICIOS = [
  {
    id: 'automatizacion',
    icon: Bot,
    titulo: 'Automatización de Procesos',
    descripcion: 'Elimina tareas repetitivas con chatbots WhatsApp y sistemas inteligentes',
    features: [
      'Chatbots WhatsApp Business API',
      'Sistemas de reservas online automáticas',
      'Recordatorios y seguimientos',
      'Integración con calendarios',
    ],
    precio: 'Desde 3.000€',
    color: 'indigo',
  },
  {
    id: 'web',
    icon: Globe,
    titulo: 'Plataformas Web Profesionales',
    descripcion: 'Desarrollo web para pymes que convierten visitantes en clientes',
    features: [
      'Landing pages de conversión',
      'Dashboards de gestión',
      'Portales de clientes',
      'Integración Stripe pagos online',
    ],
    precio: 'Desde 4.500€',
    color: 'emerald',
  },
  {
    id: 'saas',
    icon: Server,
    titulo: 'Plataformas SaaS Completas',
    descripcion: 'Productos digitales completos como VOCAP.io',
    features: [
      'Sistema de autenticación completo',
      'Integración pagos Stripe (planes)',
      'Procesamiento de datos con IA',
      'Dashboard de usuario profesional',
    ],
    precio: 'Desde 8.000€',
    color: 'purple',
    destacado: true,
  },
  {
    id: 'custom',
    icon: Code,
    titulo: 'Soluciones Custom',
    descripcion: 'Desarrollo a medida para necesidades específicas',
    features: [
      'APIs e integraciones',
      'Sistemas a medida',
      'Migración de datos',
      'Consultoría técnica',
    ],
    precio: 'Según proyecto',
    color: 'amber',
  },
];

const CASOS_EXITO = [
  {
    id: 0,
    cliente: 'VOCAP.io',
    ubicacion: 'Madrid, España',
    problema: 'Crear una plataforma SaaS de transcripción con IA desde cero, competitiva en precio frente a Otter.ai y Rev',
    solucion: 'Plataforma completa con autenticación, Whisper API, Claude API para resúmenes, sistema de créditos Stripe (4 planes), dashboard usuario, landing bilingüe ES/EN',
    resultados: [
      { metrica: 'Tiempo desarrollo', valor: '3 semanas' },
      { metrica: 'Funcionalidades', valor: '15+' },
      { metrica: 'Precio vs competencia', valor: '1€/h vs 8-12€' },
    ],
    timeline: '3 semanas',
    testimonial: '"Proyecto propio que demuestra capacidad end-to-end: desde arquitectura backend compleja hasta diseño frontend profesional. Puedes probarlo gratis."',
    autor: 'Caso de Estudio Real',
    iniciales: 'VC',
    verificado: true,
    link: 'https://vocap.io',
    stack: ['Flask', 'PostgreSQL', 'React', 'Tailwind', 'Stripe', 'OpenAI', 'Claude'],
  },
  {
    id: 1,
    cliente: 'Clínica Dental',
    ubicacion: 'Madrid Centro',
    problema: '30% de no-shows, secretaria saturada con llamadas de confirmación',
    solucion: 'Sistema automático de reservas online + recordatorios WhatsApp 24h y 2h antes',
    resultados: [
      { metrica: 'No-shows', antes: '30%', despues: '8%', mejora: '-73%' },
      { metrica: 'Ahorro mensual', valor: '4.200€/mes' },
      { metrica: 'Llamadas reducidas', valor: '85%' },
    ],
    timeline: '2 semanas',
    testimonial: '"Pasamos de 30% de citas perdidas a solo 8% en 2 meses. Ahorramos 4.200€ mensuales en personal administrativo."',
    autor: 'Dra. María García',
    iniciales: 'MG',
  },
  {
    id: 2,
    cliente: 'Despacho de Abogados',
    ubicacion: 'Barcelona, Eixample',
    problema: 'Gestión manual de consultas inicial, agenda caótica, emails perdidos',
    solucion: 'Portal de clientes + chatbot de cualificación + calendario integrado',
    resultados: [
      { metrica: 'Tiempo administrativo', antes: '15h/semana', despues: '4h/semana', mejora: '-73%' },
      { metrica: 'Consultas gestionadas', mejora: '+40%' },
      { metrica: 'Satisfacción cliente', valor: '4.8/5' },
    ],
    timeline: '3 semanas',
    testimonial: '"Pasamos de 15 horas semanales en admin a solo 4. Gestionamos un 40% más de consultas con el mismo equipo."',
    autor: 'Carlos Martínez',
    iniciales: 'CM',
  },
  {
    id: 3,
    cliente: 'Academia de Idiomas',
    ubicacion: 'Valencia, Ruzafa',
    problema: 'Matrículas por email/teléfono, pagos en efectivo, sin visibilidad de ocupación',
    solucion: 'Plataforma de matrículas online + pagos Stripe + dashboard profesores',
    resultados: [
      { metrica: 'Matrículas', mejora: '+60%' },
      { metrica: 'Tiempo de proceso', antes: '3 días', despues: '5 min', mejora: '-99%' },
      { metrica: 'Impagos', antes: '12%', despues: '0%', mejora: '-100%' },
    ],
    timeline: '2 semanas',
    testimonial: '"Pasamos de 12% de impagos a 0% y aumentamos matrículas un 60% en 3 meses gracias a la automatización."',
    autor: 'Ana López',
    iniciales: 'AL',
  },
];

const COMPARATIVA = [
  { aspecto: 'Precio típico', agencias: '10.000 - 25.000€', freelancers: '500 - 1.500€', nosotros: '3.000 - 6.000€' },
  { aspecto: 'Timeline', agencias: '2-4 meses', freelancers: 'Variable', nosotros: '1-3 semanas' },
  { aspecto: 'Interlocutor', agencias: 'Account manager', freelancers: 'Directo', nosotros: 'Técnico directo' },
  { aspecto: 'Soporte incluido', agencias: '3-6 meses', freelancers: 'Ninguno', nosotros: '1 mes' },
  { aspecto: 'Calidad código', agencias: 'Alta', freelancers: 'Variable', nosotros: 'Alta + IA' },
];

const TECNOLOGIAS = [
  { nombre: 'Python/Flask', icon: '🐍' },
  { nombre: 'React', icon: '⚛️' },
  { nombre: 'Tailwind CSS', icon: '🎨' },
  { nombre: 'PostgreSQL', icon: '🐘' },
  { nombre: 'Stripe Payments', icon: '💳' },
  { nombre: 'WhatsApp API', icon: '💬' },
  { nombre: 'OpenAI Whisper', icon: '🎙️' },
  { nombre: 'Claude API', icon: '🤖' },
  { nombre: 'Vercel', icon: '▲' },
  { nombre: 'Railway', icon: '🚂' },
];

const FAQS = [
  {
    pregunta: '¿Tenéis ejemplos reales de vuestro trabajo?',
    respuesta: 'Sí, VOCAP.io es un proyecto propio que demuestra nuestra capacidad técnica end-to-end. Es una plataforma SaaS de transcripción con IA que puedes probar gratis en vocap.io y ver exactamente la calidad de código y diseño que entregamos.',
  },
  {
    pregunta: '¿Cuánto tiempo tarda un proyecto de desarrollo web?',
    respuesta: 'Entregamos proyectos en 1-3 semanas dependiendo de la complejidad. Automatizaciones simples en 1-2 semanas, plataformas SaaS completas en 2-3 semanas. Por ejemplo, VOCAP.io se desarrolló en 3 semanas.',
  },
  {
    pregunta: '¿Cuánto cuesta desarrollar una web con automatizaciones?',
    respuesta: 'Nuestros precios empiezan en 3.000€ para automatizaciones básicas. Plataformas web profesionales desde 4.500€. Plataformas SaaS completas desde 8.000€. Precio fijo cerrado antes de empezar, sin sorpresas.',
  },
  {
    pregunta: '¿Qué pasa si necesito cambios después de la entrega?',
    respuesta: 'La primera ronda de revisiones está incluida sin coste. Para cambios posteriores, ofrecemos soporte a 80€/hora o packs mensuales de mantenimiento.',
  },
  {
    pregunta: '¿Trabajáis solo en Madrid?',
    respuesta: 'No, trabajamos 100% en remoto con clientes de toda España. Las reuniones son por videollamada. Somos una agencia de desarrollo web en Madrid pero atendemos a negocios de todo el país.',
  },
  {
    pregunta: '¿Qué tecnologías usáis para el desarrollo?',
    respuesta: 'Usamos un stack moderno: Python/Flask para backend, React para frontend, PostgreSQL para bases de datos, Stripe para pagos online, y APIs de IA como OpenAI Whisper y Claude para procesamiento inteligente.',
  },
  {
    pregunta: '¿Qué pasa si no estoy satisfecho?',
    respuesta: 'Política de reembolso del 50% si decides cancelar en los primeros 5 días de desarrollo.',
  },
];

const PROCESO = [
  {
    paso: 1,
    titulo: 'Llamada inicial',
    duracion: '30 min',
    descripcion: 'Entendemos tu negocio y problemas actuales. Sin compromiso.',
    icon: Phone,
  },
  {
    paso: 2,
    titulo: 'Propuesta en 48h',
    duracion: '48 horas',
    descripcion: 'Scope exacto, precio fijo cerrado y timeline detallado.',
    icon: FileText,
  },
  {
    paso: 3,
    titulo: 'Desarrollo sprint',
    duracion: '1-2 semanas',
    descripcion: 'Desarrollamos con updates cada 2-3 días.',
    icon: Rocket,
  },
  {
    paso: 4,
    titulo: 'Entrega + Formación',
    duracion: 'Día final',
    descripcion: 'Sistema funcionando y documentación completa.',
    icon: CheckCircle,
  },
];

const GARANTIAS = [
  { icon: Tag, texto: 'Precio fijo cerrado antes de empezar' },
  { icon: RefreshCw, texto: 'Updates cada 2-3 días durante desarrollo' },
  { icon: CheckCircle, texto: 'Primera revisión incluida sin coste' },
  { icon: Code, texto: 'Código documentado - no dependes de nosotros' },
];

// ============================================
// COMPONENTES AUXILIARES
// ============================================

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#casos-exito', label: 'Casos' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#proceso', label: 'Proceso' },
    { href: '#contacto', label: 'Contacto' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">AgenciaDev</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => scrollToSection(e, '#contacto')}
              className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition-all hover:scale-105"
            >
              Consultoría Gratuita
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block py-3 text-gray-600 hover:text-primary-600 font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => scrollToSection(e, '#contacto')}
              className="block mt-4 bg-primary-600 text-white px-5 py-3 rounded-lg font-semibold text-center"
            >
              Consultoría Gratuita
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

const FAQItem = ({ pregunta, respuesta, isOpen, onClick }) => (
  <div className="border-b border-gray-200 last:border-0">
    <button
      onClick={onClick}
      className="w-full py-5 flex items-center justify-between text-left hover:text-primary-600 transition-colors"
    >
      <span className="font-medium text-gray-900 pr-4">{pregunta}</span>
      {isOpen ? <ChevronUp className="w-5 h-5 text-primary-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
      <p className="text-gray-600 leading-relaxed">{respuesta}</p>
    </div>
  </div>
);

const ROICalculator = () => {
  const [horas, setHoras] = useState(10);
  const [costeHora, setCosteHora] = useState(25);

  const ahorroPorSemana = horas * costeHora * 0.8;
  const ahorroAnual = ahorroPorSemana * 52;
  const roi = ((ahorroAnual - 3500) / 3500 * 100).toFixed(0);

  return (
    <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-6 md:p-8 border border-primary-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Calculadora de Ahorro</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Cuántas horas/semana gastas en tareas manuales?
          </label>
          <input
            type="range"
            min="1"
            max="40"
            value={horas}
            onChange={(e) => setHoras(Number(e.target.value))}
            className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>1h</span>
            <span className="font-semibold text-primary-600">{horas} horas</span>
            <span>40h</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Cuál es el coste/hora de esa tarea?
          </label>
          <input
            type="range"
            min="10"
            max="80"
            value={costeHora}
            onChange={(e) => setCosteHora(Number(e.target.value))}
            className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>10€</span>
            <span className="font-semibold text-primary-600">{costeHora}€/hora</span>
            <span>80€</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-primary-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-success-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Ahorro anual estimado</p>
              <p className="text-2xl font-bold text-success-600">{ahorroAnual.toLocaleString('es-ES')}€</p>
            </div>
            <div className="text-center p-3 bg-primary-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">ROI primer año</p>
              <p className="text-2xl font-bold text-primary-600">{roi > 0 ? '+' : ''}{roi}%</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            *Estimación con inversión de 3.500€
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SECCIONES
// ============================================

const HeroSection = () => {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-28 md:pt-32 pb-20 md:pb-24 px-4 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="hero-heading">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                Desarrollo ágil para negocios locales
              </div>
              <a
                href="https://vocap.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                <BadgeCheck className="w-4 h-4" aria-hidden="true" />
                Creadores de VOCAP.io
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              De idea a sistema funcionando en{' '}
              <span className="text-primary-600">2 semanas</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed">
              Agencia de desarrollo web especializada en automatización de procesos para negocios.{' '}
              <span className="text-gray-900 font-medium">Sistemas de reservas, chatbots WhatsApp, plataformas SaaS.</span>
            </p>

            <p className="text-base text-gray-500 mb-8 leading-relaxed">
              Desarrollo web para pymes en Madrid. Entregamos en 1-3 semanas con comunicación directa y precios transparentes. Proyectos verificables como VOCAP.io.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contacto"
                onClick={(e) => scrollToSection(e, '#contacto')}
                className="inline-flex flex-col items-center justify-center gap-1 bg-emerald-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-all hover:scale-105 shadow-lg shadow-emerald-200 min-h-[60px]"
              >
                <span className="flex items-center gap-2 text-lg">
                  Consultoría Gratuita
                  <ArrowRight className="w-5 h-5" />
                </span>
                <span className="text-sm font-normal text-emerald-100">Sin permanencia · Setup en 2 semanas</span>
              </a>
              <a
                href="#casos"
                onClick={(e) => scrollToSection(e, '#casos')}
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-primary-300 hover:text-primary-600 transition-all"
              >
                Ver Proyectos Ejemplo
              </a>
            </div>

            <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success-500" />
                Precio fijo desde 3.000€
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success-500" />
                Respuesta en 24h
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-105 transition-transform">
                <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-primary-400" />
                </div>
                <p className="text-sm text-gray-600 mt-3 font-medium">Dashboard Analytics</p>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-105 transition-transform mt-8">
                <div className="bg-success-50 rounded-lg h-32 flex items-center justify-center">
                  <MessageCircle className="w-12 h-12 text-success-500" />
                </div>
                <p className="text-sm text-gray-600 mt-3 font-medium">Chatbot WhatsApp</p>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-105 transition-transform">
                <div className="bg-accent-50 rounded-lg h-32 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-accent-500" />
                </div>
                <p className="text-sm text-gray-600 mt-3 font-medium">Sistema Reservas</p>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-105 transition-transform mt-8">
                <div className="bg-purple-50 rounded-lg h-32 flex items-center justify-center">
                  <CreditCard className="w-12 h-12 text-purple-500" />
                </div>
                <p className="text-sm text-gray-600 mt-3 font-medium">Pagos Online</p>
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PropuestaValor = () => {
  const pilares = [
    { icon: Clock, titulo: 'Entrega en 2 semanas', subtitulo: 'No 3 meses', descripcion: 'Metodología ágil con sprints cortos.' },
    { icon: Tag, titulo: 'Precio fijo desde 3.000€', subtitulo: 'Sin sorpresas', descripcion: 'Presupuesto cerrado antes de empezar.' },
    { icon: MessageSquare, titulo: 'Un interlocutor técnico', subtitulo: 'Directo', descripcion: 'Hablas con quien desarrolla tu proyecto.' },
  ];

  return (
    <section className="py-20 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {pilares.map((pilar, index) => (
            <div key={index} className="text-center p-6 md:p-6 rounded-2xl hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-600 group-hover:scale-110 transition-all">
                <pilar.icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{pilar.titulo}</h3>
              <p className="text-primary-600 font-medium text-sm mb-3">{pilar.subtitulo}</p>
              <p className="text-gray-600">{pilar.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiciosSection = () => {
  const colorClasses = {
    indigo: { bg: 'bg-primary-50', border: 'border-primary-200', icon: 'bg-primary-600', text: 'text-primary-600' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'bg-emerald-600', text: 'text-emerald-600' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-600', text: 'text-purple-600' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'bg-amber-600', text: 'text-amber-600' },
  };

  return (
    <section id="servicios" className="py-20 md:py-24 px-4 bg-gray-50" aria-labelledby="servicios-heading">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2 id="servicios-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Servicios de Automatización y Desarrollo Web
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desarrollo web para pymes, automatización WhatsApp Business, sistemas de reservas online e integración Stripe pagos
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICIOS.map((servicio) => {
            const colors = colorClasses[servicio.color];
            return (
              <div key={servicio.id} className={`${colors.bg} border ${colors.border} rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1`}>
                <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center mb-4`}>
                  <servicio.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{servicio.titulo}</h3>
                <p className="text-gray-600 mb-4">{servicio.descripcion}</p>
                <ul className="space-y-2 mb-6">
                  {servicio.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-200">
                  <p className={`text-lg font-bold ${colors.text}`}>{servicio.precio}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CasosExitoSection = () => {
  const [activeCase, setActiveCase] = useState(0);
  const casoActivo = CASOS_EXITO[activeCase];

  return (
    <section id="casos-exito" className="py-20 md:py-24 px-4 bg-white" aria-labelledby="casos-heading">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2 id="casos-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Casos de Éxito: Proyectos Reales con Resultados Medibles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desarrollo web y automatización de procesos con ROI demostrable. Incluye VOCAP.io, proyecto propio verificable.
          </p>
        </header>

        <nav className="flex flex-wrap justify-center gap-3 mb-10" aria-label="Seleccionar caso de éxito">
          {CASOS_EXITO.map((caso, index) => (
            <button
              key={caso.id}
              onClick={() => setActiveCase(index)}
              aria-pressed={activeCase === index}
              className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                activeCase === index ? 'bg-primary-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {caso.verificado && <BadgeCheck className="w-4 h-4" aria-label="Proyecto verificado" />}
              {caso.cliente}
            </button>
          ))}
        </nav>

        <article className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-3xl p-6 md:p-10 border border-gray-200">
          {casoActivo.verificado && (
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                <BadgeCheck className="w-4 h-4" />
                PROYECTO VERIFICABLE
              </span>
              <a
                href={casoActivo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
              >
                Visitar {casoActivo.cliente}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-primary-600 font-medium mb-3">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                {casoActivo.ubicacion}
                <span className="text-gray-400">•</span>
                <Clock className="w-4 h-4" aria-hidden="true" />
                {casoActivo.timeline}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{casoActivo.cliente}</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-red-600 mb-1">Problema</p>
                  <p className="text-gray-700">{casoActivo.problema}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-success-600 mb-1">Solución</p>
                  <p className="text-gray-700">{casoActivo.solucion}</p>
                </div>
              </div>

              {casoActivo.stack && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-600 mb-2">Stack Tecnológico</p>
                  <div className="flex flex-wrap gap-2">
                    {casoActivo.stack.map((tech, idx) => (
                      <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <blockquote className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="text-gray-700 italic mb-4">{casoActivo.testimonial}</p>
                <footer className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${casoActivo.verificado ? 'bg-emerald-600' : 'bg-primary-600'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-sm font-bold text-white">{casoActivo.iniciales}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{casoActivo.autor}</p>
                    <p className="text-xs text-gray-500">{casoActivo.cliente} · {casoActivo.ubicacion}</p>
                  </div>
                </footer>
              </blockquote>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success-600" aria-hidden="true" />
                Resultados
              </h4>
              <div className="space-y-4">
                {casoActivo.resultados.map((resultado, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm text-gray-600">{resultado.metrica}</p>
                      {resultado.antes && (
                        <p className="text-sm text-gray-500">{resultado.antes} → {resultado.despues}</p>
                      )}
                    </div>
                    <p className={`text-xl font-bold ${resultado.mejora?.startsWith('+') || resultado.mejora?.startsWith('-') ? 'text-success-600' : 'text-primary-600'}`}>
                      {resultado.mejora || resultado.valor}
                    </p>
                  </div>
                ))}
              </div>

              {casoActivo.link && (
                <a
                  href={casoActivo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all"
                >
                  Probar {casoActivo.cliente} Gratis
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

const ComparativaSection = () => (
  <section className="py-20 md:py-24 px-4 bg-gray-900 text-white" aria-labelledby="comparativa-heading">
    <div className="max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <h2 id="comparativa-heading" className="text-3xl md:text-4xl font-bold mb-4">
          Por Qué Elegir Nuestra Agencia de Desarrollo
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          El punto medio entre agencias caras y freelancers impredecibles. Desarrollo web rápido con calidad de agencia.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-4 font-medium text-gray-400">Aspecto</th>
              <th className="text-center py-4 px-4 font-medium text-gray-400">Agencias</th>
              <th className="text-center py-4 px-4 font-medium text-gray-400">Freelancers</th>
              <th className="text-center py-4 px-4 font-medium text-primary-400">Nosotros</th>
            </tr>
          </thead>
          <tbody>
            {COMPARATIVA.map((row, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="py-4 px-4 font-medium">{row.aspecto}</td>
                <td className="py-4 px-4 text-center text-gray-400">{row.agencias}</td>
                <td className="py-4 px-4 text-center text-gray-400">{row.freelancers}</td>
                <td className="py-4 px-4 text-center">
                  <span className="bg-primary-600/20 text-primary-300 px-3 py-1 rounded-full text-sm font-medium">{row.nosotros}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-wider mb-6">Tecnologías que usamos</p>
        <div className="flex flex-wrap justify-center gap-4">
          {TECNOLOGIAS.map((tech, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
              <span className="text-xl">{tech.icon}</span>
              <span className="text-sm font-medium">{tech.nombre}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ProcesoSection = () => (
  <section id="proceso" className="py-20 md:py-32 px-4 bg-white" aria-labelledby="proceso-heading">
    <div className="max-w-6xl mx-auto">
      <header className="text-center mb-16">
        <h2 id="proceso-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Nuestro Proceso de Desarrollo Web Ágil
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          De la idea al sistema funcionando en 1-3 semanas. Proceso transparente con updates cada 2-3 días.
        </p>
      </header>

      <div className="grid md:grid-cols-4 gap-8 mb-16">
        {PROCESO.map((paso, index) => (
          <div key={paso.paso} className="relative">
            {index < PROCESO.length - 1 && (
              <div className="hidden md:block absolute top-24 left-1/2 w-full h-1 bg-gradient-to-r from-primary-300 to-primary-100"></div>
            )}
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border-2 border-gray-100 hover:border-primary-400 hover:shadow-2xl transition-all text-center group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">{paso.paso}</span>
              </div>
              <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-100 transition-colors">
                <paso.icon className="w-10 h-10 text-primary-600" />
              </div>
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">{paso.duracion}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{paso.titulo}</h3>
              <p className="text-gray-600">{paso.descripcion}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-6 md:p-8 border border-primary-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Proceso transparente, sin sorpresas</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GARANTIAS.map((garantia, index) => (
            <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4">
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <garantia.icon className="w-5 h-5 text-success-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">{garantia.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const PortfolioSection = () => {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="portfolio" className="py-20 md:py-24 px-4 bg-gray-50" aria-labelledby="portfolio-heading">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2 id="portfolio-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Portfolio: Proyectos Verificables
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No solo hablamos de lo que podemos hacer. Aquí están los proyectos que puedes probar ahora mismo.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* VOCAP Project Card */}
          <article className="bg-white rounded-3xl border-2 border-emerald-200 overflow-hidden hover:shadow-xl transition-all group">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4" />
                  PROYECTO REAL
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  SaaS
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Mic className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">VOCAP.io</h3>
                  <p className="text-emerald-100">Plataforma de Transcripción con IA</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                SaaS completo de transcripción de audio con inteligencia artificial. Incluye sistema de pagos, autenticación, procesamiento asíncrono y dashboard de usuario.
              </p>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Stack Tecnológico</p>
                <div className="flex flex-wrap gap-2">
                  {['Flask', 'React', 'PostgreSQL', 'Stripe', 'OpenAI Whisper', 'Claude API', 'Tailwind'].map((tech) => (
                    <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-emerald-600">3</p>
                  <p className="text-xs text-gray-500">Semanas</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-emerald-600">15+</p>
                  <p className="text-xs text-gray-500">Features</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-emerald-600">4</p>
                  <p className="text-xs text-gray-500">Planes Stripe</p>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href="https://vocap.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all"
                >
                  Ver Proyecto
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="#contacto"
                  onClick={(e) => scrollToSection(e, '#contacto')}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Crear Similar
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>

          {/* Placeholder for Future Projects */}
          <article className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tu Proyecto Aquí</h3>
            <p className="text-gray-600 mb-6 max-w-sm">
              El próximo caso de éxito verificable podría ser el tuyo. Desarrollamos tu idea en 1-3 semanas.
            </p>
            <a
              href="#contacto"
              onClick={(e) => scrollToSection(e, '#contacto')}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all"
            >
              Empecemos
              <ArrowRight className="w-4 h-4" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 md:py-24 px-4 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes sobre Desarrollo Web Rápido
          </h2>
          <p className="text-lg text-gray-600">
            Todo lo que necesitas saber sobre nuestros servicios de automatización y desarrollo web
          </p>
        </header>

        <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-200 px-6">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={index}
              pregunta={faq.pregunta}
              respuesta={faq.respuesta}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ROISection = () => (
  <section className="py-20 md:py-24 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Cuánto podrías ahorrar?</h2>
          <p className="text-lg text-gray-600 mb-6">
            La mayoría de negocios gastan <span className="font-semibold">10-20 horas semanales</span> en tareas que pueden automatizarse.
          </p>
          <ul className="space-y-3">
            {['Recordatorios y confirmaciones manuales', 'Gestión de citas por teléfono/email', 'Cobros y seguimiento de impagos', 'Responder las mismas preguntas', 'Pasar datos entre sistemas'].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-700">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-red-500" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ROICalculator />
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section id="contacto" className="py-20 md:py-24 px-4 bg-gradient-to-br from-primary-600 to-purple-700">
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Tu negocio necesita automatización?</h2>
          <p className="text-lg text-primary-100 mb-8">Llamada de 30 minutos sin compromiso.</p>

          <div className="space-y-4 mb-8">
            {['Analizamos tu caso particular', 'Te decimos si tiene sentido automatizar', 'Propuesta de precio en 48h'].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-success-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-success-900" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-primary-200">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Sin spam
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Respuesta en 24h
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  </section>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">AgenciaDev</span>
            </div>
            <p className="text-sm">Desarrollo web y automatizaciones para negocios locales.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#servicios" className="hover:text-white transition-colors">Automatización WhatsApp</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Desarrollo Web</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Plataformas SaaS</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Proyectos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://vocap.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  VOCAP.io
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li><a href="#casos-exito" className="hover:text-white transition-colors">Casos de Éxito</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:hola@agenciadev.es" className="hover:text-white transition-colors">hola@agenciadev.es</a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </li>
              <li className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
              </li>
              <li className="flex items-center gap-2 mt-4">
                <MapPin className="w-4 h-4" />
                Madrid, España (Remoto)
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {currentYear} AgenciaDev. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-success-500" />
              RGPD Compliant
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-accent-500" />
              Respuesta &lt;24h
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const Landing = () => (
  <div className="min-h-screen bg-white font-sans antialiased">
    <header role="banner">
      <Navbar />
    </header>
    <main role="main">
      <HeroSection />
      <PropuestaValor />
      <ServiciosSection />
      <CasosExitoSection />
      <ComparativaSection />
      <ProcesoSection />
      <PortfolioSection />
      <ROISection />
      <FAQSection />
      <CTASection />
    </main>
    <Footer />

    {/* SEO: Hidden text for crawlers with long-tail keywords */}
    <div className="sr-only" aria-hidden="true">
      <p>
        Somos una agencia de desarrollo web en Madrid especializada en entregar proyectos rápidos y medibles.
        Nuestros servicios incluyen automatización de procesos con WhatsApp Business API, desarrollo de sistemas de reservas online,
        integración de pagos con Stripe, y creación de plataformas SaaS completas como VOCAP.io.
        A diferencia de agencias tradicionales que tardan meses, entregamos en 1-3 semanas con comunicación directa y precios transparentes.
        Desarrollo web para pymes Madrid. Automatización WhatsApp Business. Sistema de reservas online. Integración Stripe pagos online.
      </p>
    </div>
  </div>
);

export default Landing;
