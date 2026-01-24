import {
  Bot,
  Globe,
  Server,
  Phone,
  FileText,
  Rocket,
  CheckCircle,
} from 'lucide-react';

export const CALENDLY_URL = 'https://calendly.com/mgmautomations/consulta';

export const SECTION_IDS = ['portfolio', 'servicios', 'proceso', 'pricing', 'faq', 'contacto'];

export const SERVICIOS = [
  {
    id: 'automatizacion',
    icon: Bot,
    titulo: 'Automatizacion',
    descripcion: 'Chatbots WhatsApp, sistemas de reservas, recordatorios automaticos',
    features: ['WhatsApp Business API', 'Reservas online 24/7', 'Recordatorios automaticos', 'Integracion calendarios'],
    precio: '3.000 - 4.000€',
    popular: false,
  },
  {
    id: 'web',
    icon: Globe,
    titulo: 'Plataforma Web',
    descripcion: 'Landing pages, dashboards, portales de cliente con pagos integrados',
    features: ['Landing de conversion', 'Dashboard de gestion', 'Portal de clientes', 'Pagos Stripe integrados'],
    precio: '4.500 - 6.000€',
    popular: false,
  },
  {
    id: 'saas',
    icon: Server,
    titulo: 'SaaS Completo',
    descripcion: 'Productos digitales completos como VOCAP.io con todo incluido',
    features: ['Autenticacion completa', 'Planes de suscripcion', 'Procesamiento con IA', 'Dashboard profesional'],
    precio: '8.000 - 12.000€',
    popular: true,
  },
];

export const COMPARATIVA = [
  { aspecto: 'Precio tipico', agencias: '10.000 - 25.000€', freelancers: '500 - 2.000€', nosotros: '3.000 - 8.000€', destacado: false },
  { aspecto: 'Tiempo de entrega', agencias: '2-4 meses', freelancers: 'Impredecible', nosotros: '2-3 semanas', destacado: true },
  { aspecto: 'Comunicacion', agencias: 'Account manager', freelancers: 'Variable', nosotros: 'Tecnico directo', destacado: false },
  { aspecto: 'Soporte post-entrega', agencias: '3-6 meses', freelancers: 'Ninguno', nosotros: '1 mes incluido', destacado: false },
  { aspecto: 'Proyectos verificables', agencias: 'NDAs', freelancers: 'Raramente', nosotros: 'VOCAP.io publico', destacado: true },
  { aspecto: 'Precio fijo cerrado', agencias: 'Si', freelancers: 'A veces', nosotros: 'Siempre', destacado: false },
];

export const PROCESO = [
  { paso: 1, titulo: 'Llamada inicial', duracion: '30 min gratis', descripcion: 'Entendemos tu negocio, problemas actuales y objetivos.', salida: 'Saber si encajamos', icon: Phone },
  { paso: 2, titulo: 'Propuesta detallada', duracion: '48 horas', descripcion: 'Scope exacto, precio fijo cerrado, timeline especifico.', salida: 'Presupuesto sin sorpresas', icon: FileText },
  { paso: 3, titulo: 'Desarrollo sprint', duracion: '1-3 semanas', descripcion: 'Desarrollo con demos cada 2-3 dias. Feedback continuo.', salida: 'Ver avances reales', icon: Rocket },
  { paso: 4, titulo: 'Entrega + Formacion', duracion: 'Dia final', descripcion: 'Sistema funcionando, documentacion y formacion incluida.', salida: 'Empezar a usarlo', icon: CheckCircle },
];

export const FAQS = [
  { pregunta: '¿Teneis ejemplos reales de vuestro trabajo?', respuesta: 'Si, VOCAP.io es un proyecto propio que puedes probar gratis ahora mismo. Es una plataforma SaaS completa de transcripcion con IA que demuestra nuestra capacidad end-to-end.' },
  { pregunta: '¿Cuanto tiempo tarda un proyecto?', respuesta: 'Automatizaciones simples en 1-2 semanas. Plataformas web en 2-3 semanas. SaaS completos como VOCAP.io en 3-4 semanas.' },
  { pregunta: '¿Cuanto cuesta?', respuesta: 'Automatizaciones desde 3.000€, plataformas web desde 4.500€, SaaS completos desde 8.000€. Precio fijo cerrado antes de empezar.' },
  { pregunta: '¿Que pasa si necesito cambios despues?', respuesta: 'Una ronda de revisiones esta incluida sin coste. Para cambios posteriores: soporte a 80€/hora o packs mensuales.' },
  { pregunta: '¿Trabajais solo en Madrid?', respuesta: '100% remoto. Trabajamos con clientes de toda Espana. Reuniones por videollamada, respuesta en menos de 24h.' },
];

export const TECNOLOGIAS = [
  { nombre: 'Python/Flask', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { nombre: 'React', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
  { nombre: 'PostgreSQL', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  { nombre: 'Stripe', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  { nombre: 'OpenAI', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { nombre: 'Claude AI', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
  { nombre: 'Tailwind', color: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' },
  { nombre: 'Vercel', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
];

export const PLANES_PRICING = [
  {
    nombre: 'Automatizacion',
    precio: '3.000 - 4.000€',
    descripcion: 'Elimina tareas repetitivas',
    features: ['Chatbot WhatsApp Business', 'Sistema de reservas online', 'Recordatorios automaticos', 'Integracion calendario', '1 mes soporte incluido'],
    noIncluye: ['Dashboard personalizado', 'Multiples integraciones'],
    cta: 'Consultar',
    popular: false
  },
  {
    nombre: 'Plataforma Web',
    precio: '4.500 - 6.000€',
    descripcion: 'Todo lo de Automatizacion + web profesional',
    features: ['Todo de Automatizacion', 'Landing page conversion', 'Dashboard de gestion', 'Portal de clientes', 'Pagos Stripe integrados', '1 mes soporte incluido'],
    noIncluye: ['Sistema de suscripciones'],
    cta: 'Consultar',
    popular: false
  },
  {
    nombre: 'SaaS Completo',
    precio: '8.000 - 12.000€',
    descripcion: 'Producto digital listo para escalar',
    features: ['Todo de Plataforma Web', 'Autenticacion completa', 'Sistema de suscripciones', 'Procesamiento con IA', 'Dashboard avanzado', 'Multi-idioma opcional', '1 mes soporte incluido'],
    noIncluye: [],
    cta: 'Consultar',
    popular: true
  },
];
