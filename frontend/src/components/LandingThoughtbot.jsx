/**
 * ============================================
 * AGENCIA LANDING - THOUGHTBOT INSPIRED
 * ============================================
 * Diseño limpio, profesional, sin fluff.
 * Inspirado en: thoughtbot.com, vercel.com, linear.app
 * ============================================
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Code,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  X,
  Zap,
  Calendar,
  FileText,
  Rocket,
  CheckCircle,
  Github,
  Linkedin,
  ChevronDown,
  Bot,
  Globe,
  Server,
  Users,
  Shield,
  Euro,
} from 'lucide-react';

import ContactForm from './ContactForm';

// ============================================
// DATOS
// ============================================

const PROJECTS = [
  {
    id: 'vocap',
    name: 'VOCAP.io',
    tagline: 'Plataforma SaaS de transcripcion con IA',
    description: 'Transcripcion de audio, resumenes automaticos, extraccion de tareas. Competidor de Otter.ai a 1/10 del precio.',
    image: '/images/vocap-hero.jpg',
    url: 'https://vocap.io',
    metrics: [
      { label: 'Desarrollo', value: '3 semanas' },
      { label: 'Features', value: '15+' },
      { label: 'Stack', value: 'Flask + React' },
    ],
    tags: ['SaaS', 'IA', 'Stripe', 'OpenAI'],
    featured: true,
  },
];

const SERVICES = [
  {
    id: 'automation',
    icon: Bot,
    title: 'Automatizacion de Procesos',
    price: '3.000 - 4.000€',
    timeline: '1-2 semanas',
    description: 'Elimina tareas repetitivas con chatbots, sistemas de reservas y workflows automaticos.',
    includes: [
      'Chatbot WhatsApp Business',
      'Sistema de reservas online 24/7',
      'Recordatorios automaticos',
      'Integracion con tu calendario',
      'Dashboard basico de metricas',
    ],
    ideal: 'Negocios con muchas consultas repetitivas o gestion manual de citas.',
  },
  {
    id: 'web',
    icon: Globe,
    title: 'Plataformas Web',
    price: '4.500 - 6.000€',
    timeline: '2-3 semanas',
    description: 'Webs que convierten visitantes en clientes, con backend de gestion incluido.',
    includes: [
      'Landing page de alta conversion',
      'Panel de administracion',
      'Portal de clientes',
      'Pagos con Stripe integrados',
      'Analytics y seguimiento',
      'SEO optimizado',
    ],
    ideal: 'Empresas que necesitan presencia web profesional con gestion de leads.',
    popular: true,
  },
  {
    id: 'saas',
    icon: Server,
    title: 'Desarrollo SaaS',
    price: '8.000 - 12.000€',
    timeline: '3-4 semanas',
    description: 'Productos digitales completos listos para escalar y monetizar.',
    includes: [
      'Todo lo de Plataformas Web',
      'Autenticacion completa',
      'Sistema de suscripciones',
      'Procesamiento con IA',
      'Dashboard avanzado',
      'API documentada',
      'Multi-idioma opcional',
    ],
    ideal: 'Startups y empresas que quieren lanzar un producto digital propio.',
  },
];

const PROCESS = [
  {
    step: 1,
    title: 'Discovery',
    duration: '30 min · Gratis',
    description: 'Llamada para entender tu negocio, problemas actuales y objetivos. Sin compromiso.',
    outcome: 'Sabras si encajamos y tendras una idea clara de viabilidad.',
    icon: Phone,
  },
  {
    step: 2,
    title: 'Propuesta',
    duration: '48 horas',
    description: 'Documento detallado con scope exacto, tecnologias, timeline y precio fijo cerrado.',
    outcome: 'Presupuesto sin sorpresas. Sabes exactamente que vas a recibir.',
    icon: FileText,
  },
  {
    step: 3,
    title: 'Desarrollo',
    duration: '1-4 semanas',
    description: 'Sprints cortos con demos cada 2-3 dias. Ves el progreso real, no promesas.',
    outcome: 'Feedback continuo. Puedes ajustar prioridades sobre la marcha.',
    icon: Rocket,
  },
  {
    step: 4,
    title: 'Entrega',
    duration: 'Dia final + 1 mes',
    description: 'Sistema funcionando en produccion, documentacion completa y sesion de formacion.',
    outcome: 'Empiezas a usarlo inmediatamente. Soporte incluido 1 mes.',
    icon: CheckCircle,
  },
];

const FAQS = [
  {
    q: '¿Por que sois mas rapidos que una agencia tradicional?',
    a: 'Sin capas de gestion. Hablas directamente con quien desarrolla. Usamos tecnologias modernas (React, Flask, Tailwind) que permiten iterar rapido. Y nos especializamos en un tipo de proyecto, no intentamos hacer de todo.',
  },
  {
    q: '¿Como se que vais a entregar lo prometido?',
    a: 'VOCAP.io esta en produccion ahora mismo. Puedes probarlo gratis, ver como funciona, verificar la calidad. Es nuestra mejor carta de presentacion.',
  },
  {
    q: '¿Que pasa si necesito cambios despues de la entrega?',
    a: 'Una ronda de ajustes menores esta incluida. Para cambios mayores: soporte a 80€/hora o packs mensuales de mantenimiento.',
  },
  {
    q: '¿Trabajais solo en Madrid?',
    a: '100% remoto. Trabajamos con clientes de toda Espana. Comunicacion por videollamada y Slack/WhatsApp. Respuesta en menos de 24h.',
  },
  {
    q: '¿Como son los pagos?',
    a: '50% al confirmar el proyecto, 50% a la entrega satisfactoria. Factura con IVA (o sin IVA para empresas intracomunitarias).',
  },
];

// ============================================
// UTILIDADES
// ============================================

const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

// ============================================
// COMPONENTES
// ============================================

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-blue-50 text-blue-700',
    success: 'bg-emerald-50 text-emerald-700',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = 'primary', size = 'md', href, onClick, className = '', ...props }) => {
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800',
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  const baseClass = `inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return <a href={href} className={baseClass} {...props}>{children}</a>;
  }
  return <button onClick={onClick} className={baseClass} {...props}>{children}</button>;
};

// ============================================
// NAVBAR
// ============================================

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Proyectos', href: 'portfolio' },
    { label: 'Servicios', href: 'servicios' },
    { label: 'Proceso', href: 'proceso' },
    { label: 'FAQ', href: 'faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">M.G.M</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollTo('contacto')}
              className="ml-4"
            >
              Contactar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => { scrollTo(link.href); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:text-gray-900"
              >
                {link.label}
              </button>
            ))}
            <div className="px-4 pt-4">
              <Button variant="primary" className="w-full" onClick={() => { scrollTo('contacto'); setMobileOpen(false); }}>
                Contactar
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// ============================================
// HERO
// ============================================

const Hero = () => (
  <section className="pt-32 pb-20 px-6">
    <div className="max-w-4xl mx-auto">
      {/* Badge */}
      <a
        href="https://vocap.io"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors mb-8 group"
      >
        <span className="w-2 h-2 bg-emerald-500 rounded-full" />
        Creadores de VOCAP.io
        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </a>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
        Desarrollo web y automatizaciones{' '}
        <span className="text-gray-400">en 2 semanas</span>
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
        Entregamos lo que agencias tardan meses. Con codigo limpio, precio fijo cerrado y comunicacion directa con quien desarrolla.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Button variant="primary" size="lg" onClick={() => scrollTo('portfolio')}>
          Ver proyectos <ArrowRight className="w-5 h-5" />
        </Button>
        <Button variant="secondary" size="lg" onClick={() => scrollTo('contacto')}>
          Discutir proyecto
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Respuesta en 24h</span>
        </div>
        <div className="flex items-center gap-2">
          <Euro className="w-4 h-4" />
          <span>Precio fijo cerrado</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>100% remoto</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>Sin permanencia</span>
        </div>
      </div>
    </div>
  </section>
);

// ============================================
// PORTFOLIO / RECENT WORK
// ============================================

const Portfolio = () => (
  <section id="portfolio" className="py-24 px-6 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Proyectos recientes</h2>
        <p className="text-lg text-gray-600 max-w-2xl">
          No hablamos de lo que podemos hacer. Aqui esta lo que hemos hecho.
        </p>
      </div>

      {/* Featured Project */}
      {PROJECTS.filter(p => p.featured).map((project) => (
        <div key={project.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 lg:p-12 flex items-center justify-center min-h-[300px]">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl" />
                <div className="relative bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 border-b border-gray-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-gray-500">vocap.io</span>
                  </div>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="primary">{tag}</Badge>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h3>
              <p className="text-gray-500 mb-4">{project.tagline}</p>
              <p className="text-gray-600 mb-8">{project.description}</p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm text-gray-500">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" href={project.url} target="_blank" rel="noopener noreferrer">
                  Ver proyecto <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="secondary" onClick={() => scrollTo('contacto')}>
                  Crear algo similar
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Placeholder for future projects */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Code className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Tu proyecto aqui</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          El proximo caso de exito verificable podria ser el tuyo.
        </p>
        <Button variant="primary" onClick={() => scrollTo('contacto')}>
          Empezar proyecto <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </section>
);

// ============================================
// SERVICES
// ============================================

const Services = () => (
  <section id="servicios" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Servicios</h2>
        <p className="text-lg text-gray-600 max-w-2xl">
          Tres niveles segun lo que necesites. Precio fijo, scope claro, sin sorpresas.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className={`relative bg-white rounded-2xl border p-8 transition-all hover:shadow-lg ${
              service.popular ? 'border-gray-900 ring-1 ring-gray-900' : 'border-gray-200'
            }`}
          >
            {service.popular && (
              <div className="absolute -top-3 left-6">
                <Badge variant="default" className="bg-gray-900 text-white">
                  Mas popular
                </Badge>
              </div>
            )}

            {/* Icon */}
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
              <service.icon className="w-6 h-6 text-gray-700" />
            </div>

            {/* Title & Price */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-gray-900">{service.price}</span>
              <span className="text-sm text-gray-500">· {service.timeline}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{service.description}</p>

            {/* Includes */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-900 mb-3">Incluye:</p>
              <ul className="space-y-2">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal for */}
            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Ideal para:</span> {service.ideal}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-500 mb-4">¿No encaja en ningun paquete?</p>
        <Button variant="secondary" onClick={() => scrollTo('contacto')}>
          Discutir proyecto personalizado
        </Button>
      </div>
    </div>
  </section>
);

// ============================================
// PROCESS
// ============================================

const Process = () => (
  <section id="proceso" className="py-24 px-6 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Como trabajamos</h2>
        <p className="text-lg text-gray-600 max-w-2xl">
          Proceso transparente. Sabes que esperar en cada fase.
        </p>
      </div>

      {/* Process Steps */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {PROCESS.map((step, index) => (
          <div key={step.step} className="relative">
            {/* Connector Line */}
            {index < PROCESS.length - 1 && (
              <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gray-200 -translate-x-4" />
            )}

            <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
              {/* Step Number */}
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold mb-4">
                {step.step}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{step.duration}</p>
              <p className="text-gray-600 text-sm mb-4">{step.description}</p>

              {/* Outcome */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Resultado:</span>{' '}
                  <span className="text-gray-600">{step.outcome}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Terms */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Terminos claros</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Pagos</h4>
            <p className="text-sm text-gray-600">
              50% al confirmar el proyecto, 50% a la entrega. Factura con IVA incluido para particulares.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Cambios</h4>
            <p className="text-sm text-gray-600">
              Una ronda de ajustes incluida. Cambios mayores: 80€/hora o nuevo presupuesto.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Soporte</h4>
            <p className="text-sm text-gray-600">
              1 mes de soporte incluido post-entrega. Packs de mantenimiento disponibles.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ============================================
// COMPARISON
// ============================================

const Comparison = () => (
  <section className="py-24 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por que nosotros?</h2>
        <p className="text-lg text-gray-600">
          El punto medio entre agencia cara y freelancer impredecible.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left p-6 font-medium text-gray-500"></th>
              <th className="p-6 text-center font-medium text-gray-500">Agencias</th>
              <th className="p-6 text-center font-medium text-gray-500">Freelancers</th>
              <th className="p-6 text-center font-medium text-gray-900 bg-gray-50">Nosotros</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Precio', '10-25k€', '500-2k€', '3-8k€'],
              ['Tiempo', '2-4 meses', 'Impredecible', '2-3 semanas'],
              ['Comunicacion', 'Account manager', 'Variable', 'Tecnico directo'],
              ['Proyecto verificable', 'NDAs', 'Raramente', 'VOCAP.io'],
            ].map(([aspect, agencies, freelancers, us], i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="p-6 font-medium text-gray-900">{aspect}</td>
                <td className="p-6 text-center text-gray-500">{agencies}</td>
                <td className="p-6 text-center text-gray-500">{freelancers}</td>
                <td className="p-6 text-center font-medium text-gray-900 bg-gray-50">{us}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

// ============================================
// FAQ
// ============================================

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Preguntas frecuentes</h2>
          <p className="text-lg text-gray-600">
            Si tu pregunta no esta aqui, escribenos.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
          {FAQS.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CONTACT / CTA
// ============================================

const Contact = () => (
  <section id="contacto" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-900 rounded-3xl p-8 lg:p-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Llamada de 30 minutos sin compromiso. Te decimos si tiene sentido trabajar juntos.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'Analizamos tu caso particular',
                'Te decimos honestamente si podemos ayudar',
                'Propuesta con precio cerrado en 48h',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hola@mgmautomations.es
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Madrid · 100% Remoto
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ============================================
// FOOTER
// ============================================

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">M.G.M</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              Desarrollo web y automatizaciones para negocios que quieren resultados.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="font-medium text-gray-900 mb-3 text-sm">Navegacion</p>
              <div className="space-y-2">
                {['Proyectos', 'Servicios', 'Proceso', 'FAQ'].map((label) => (
                  <button
                    key={label}
                    onClick={() => scrollTo(label.toLowerCase())}
                    className="block text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-3 text-sm">Contacto</p>
              <div className="space-y-2 text-sm text-gray-500">
                <a href="mailto:hola@mgmautomations.es" className="block hover:text-gray-900 transition-colors">
                  hola@mgmautomations.es
                </a>
                <p>Madrid, Espana</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-3 text-sm">Social</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {year} M.G.M. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Operativo
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const LandingThoughtbot = () => (
  <div className="min-h-screen bg-white font-sans antialiased">
    <Navbar />
    <main>
      <Hero />
      <Portfolio />
      <Services />
      <Process />
      <Comparison />
      <FAQ />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default LandingThoughtbot;
