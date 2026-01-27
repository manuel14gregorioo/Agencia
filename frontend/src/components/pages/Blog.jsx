import React from 'react';
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from 'lucide-react';
import { Link } from '../../App';

// Datos de los posts del blog
const BLOG_POSTS = [
  {
    id: 'ia-para-pymes-guia-2025',
    title: 'Inteligencia Artificial para PYMEs: Guía Práctica 2025',
    excerpt: 'Descubre cómo las pequeñas y medianas empresas están usando IA para automatizar tareas, reducir costes y competir con grandes corporaciones. Sin jerga técnica, con ejemplos reales.',
    date: '2025-01-27',
    readTime: '10 min',
    category: 'Inteligencia Artificial',
    image: null,
    featured: true,
    content: `
## La IA Ya No Es Solo para Grandes Empresas

Hace 3 años, implementar inteligencia artificial costaba cientos de miles de euros y requería un equipo de científicos de datos. Hoy, cualquier PYME puede usar herramientas de IA por menos de 100€/mes.

El cambio ha sido radical: ChatGPT, Claude, y otras herramientas han democratizado el acceso a la IA. Ya no necesitas ser Google para automatizar procesos con inteligencia artificial.

## 5 Aplicaciones Reales de IA para tu Negocio

### 1. Atención al Cliente 24/7

**El problema:** Tus clientes escriben a las 11 de la noche y tú ya no estás para responder.

**La solución:** Un chatbot con IA que entiende lenguaje natural y responde preguntas frecuentes, gestiona citas, y escala a un humano cuando es necesario.

**Herramientas:** Chatbots personalizados con GPT-4, integración WhatsApp Business API

**Coste aproximado:** 200-500€ setup + 50-100€/mes

**ROI real:** Una clínica dental que implementamos redujo las llamadas de consulta en un 60%.

### 2. Generación de Contenido

**El problema:** Necesitas publicar en redes, escribir emails, crear descripciones de productos... y no tienes tiempo.

**La solución:** IA que genera borradores de contenido que luego revisas y personalizas.

**Herramientas:** Claude, ChatGPT, Jasper, Copy.ai

**Coste aproximado:** 20-100€/mes

**ROI real:** Lo que antes tardabas 4 horas ahora lo haces en 30 minutos.

### 3. Transcripción y Resúmenes

**El problema:** Reuniones largas de las que nadie toma notas útiles.

**La solución:** Grabas la reunión, la IA la transcribe y genera un resumen con puntos de acción.

**Herramientas:** VOCAP.io (1€/hora), Otter.ai, Fireflies

**Coste aproximado:** 10-50€/mes

**ROI real:** Ahorro de 5+ horas semanales en documentación.

### 4. Análisis de Datos

**El problema:** Tienes datos de ventas, clientes, inventario... pero no sabes qué hacer con ellos.

**La solución:** IA que analiza tus datos y te da insights accionables: "Tus ventas caen los martes, considera promociones ese día".

**Herramientas:** ChatGPT con Code Interpreter, Claude, dashboards con IA integrada

**Coste aproximado:** 20-200€/mes

**ROI real:** Decisiones basadas en datos, no en intuición.

### 5. Automatización de Procesos Repetitivos

**El problema:** Tu equipo pasa horas copiando datos de un sistema a otro.

**La solución:** Flujos automatizados que conectan tus herramientas y usan IA para procesar información.

**Herramientas:** Zapier, Make, n8n + integraciones con IA

**Coste aproximado:** 50-300€/mes

**ROI real:** Eliminación de 10-20 horas semanales de trabajo manual.

## Cómo Empezar: El Método de 3 Pasos

### Paso 1: Identifica el Cuello de Botella

Hazte estas preguntas:
- ¿Qué tarea repetitiva consume más tiempo en tu empresa?
- ¿Dónde pierdes clientes por falta de velocidad?
- ¿Qué información tienes que podrías aprovechar mejor?

### Paso 2: Empieza Pequeño

No intentes automatizar todo de golpe. Elige UNA tarea y automatízala bien. Mide resultados. Aprende. Escala.

**Ejemplo:** Antes de crear un chatbot completo, prueba a usar ChatGPT manualmente para responder emails. Si funciona, entonces automatiza.

### Paso 3: Mide el ROI

La IA debe ahorrarte tiempo o dinero. Si no lo hace, estás jugando con tecnología en vez de resolver problemas de negocio.

**Métricas a seguir:**
- Horas ahorradas por semana
- Reducción en tiempo de respuesta a clientes
- Incremento en conversiones
- Reducción de errores humanos

## Errores Comunes (y Cómo Evitarlos)

### Error 1: "La IA lo hará todo sola"

**Realidad:** La IA es una herramienta, no un empleado. Necesita supervisión, feedback, y ajustes constantes.

### Error 2: Empezar por lo más complejo

**Realidad:** Muchas empresas quieren un "asistente virtual superinteligente" cuando lo que necesitan es un simple bot que responda 5 preguntas frecuentes.

### Error 3: Ignorar la privacidad de datos

**Realidad:** Si manejas datos de clientes, asegúrate de que las herramientas de IA que uses cumplan con GDPR y no entrenen sus modelos con tu información.

### Error 4: No formar al equipo

**Realidad:** La mejor IA del mundo es inútil si tu equipo no sabe usarla o le tiene miedo.

## Presupuesto Realista para una PYME

**Inversión mínima viable:** 100-200€/mes
- ChatGPT Plus o Claude Pro: 20€/mes
- Herramienta de automatización (Zapier/Make): 30-50€/mes
- Chatbot básico: 50-100€/mes

**Inversión recomendada:** 300-500€/mes
- Todo lo anterior +
- Transcripción de reuniones
- Análisis de datos avanzado
- Integraciones personalizadas

**Inversión para escalar:** 500-1.500€/mes
- Chatbots personalizados
- Automatizaciones complejas
- Dashboards con IA
- Soporte técnico dedicado

## Caso Real: Clínica Dental

**Situación inicial:**
- 2 recepcionistas gestionando citas por teléfono
- 30% de citas perdidas por no-shows
- Pacientes frustrados por no poder reservar fuera de horario

**Solución implementada:**
- Chatbot de WhatsApp para reservas 24/7
- Recordatorios automáticos 24h antes
- Sistema de lista de espera automatizado

**Resultados a los 3 meses:**
- 60% menos llamadas de consulta
- No-shows reducidos al 12%
- Una recepcionista reasignada a tareas de mayor valor
- ROI positivo en el segundo mes

## Conclusión: El Momento es Ahora

La IA está en un punto óptimo: suficientemente madura para ser útil, pero aún poco adoptada por PYMEs. Las empresas que empiecen ahora tendrán ventaja competitiva.

No necesitas ser experto en tecnología. No necesitas un presupuesto enorme. Solo necesitas identificar UN problema y probar UNA solución.

## ¿Necesitas Ayuda?

En M.G.M Automations implementamos soluciones de IA para PYMEs desde 500€. Chatbots, automatizaciones, integraciones personalizadas.

Sin compromisos: te hacemos una consulta gratuita donde analizamos tu caso y te decimos si la IA puede ayudarte (y si no puede, también te lo decimos).
    `,
  },
  {
    id: 'vocap-caso-estudio',
    title: 'Cómo Desarrollamos VOCAP.io en 3 Semanas',
    excerpt: 'Un vistazo detrás de escenas al desarrollo de nuestra plataforma SaaS de transcripción con IA. Stack tecnológico, decisiones de arquitectura y lecciones aprendidas.',
    date: '2025-01-20',
    readTime: '8 min',
    category: 'Caso de Estudio',
    image: '/images/vocap-hero.jpg',
    featured: false,
    content: `
## El Reto

Queríamos crear una plataforma de transcripción de audio con IA que compitiera con Otter.ai pero a una fracción del precio. El objetivo: ofrecer transcripciones de calidad profesional a 1€/hora frente a los 8-12€ de la competencia.

## Stack Tecnológico

Elegimos las tecnologías que mejor conocemos y que nos permiten iterar rápido:

- **Backend:** Python + Flask (simple, rápido de desarrollar)
- **Frontend:** React + Tailwind CSS (componentes reutilizables)
- **Base de Datos:** PostgreSQL (robusto y escalable)
- **IA:** OpenAI Whisper (transcripción), Claude AI (resúmenes)
- **Pagos:** Stripe (suscripciones y créditos)
- **Hosting:** Railway (despliegue simple)

## Proceso de Desarrollo

### Semana 1: MVP Base
- Sistema de autenticación completo
- Upload de archivos de audio
- Integración con Whisper para transcripción
- Dashboard básico de usuario

### Semana 2: Monetización
- Sistema de créditos
- 4 planes de suscripción con Stripe
- Landing page bilingüe (ES/EN)
- Emails transaccionales

### Semana 3: Pulido
- Resúmenes automáticos con Claude
- Sistema de referidos
- Optimización de rendimiento
- Testing y corrección de bugs

## Lecciones Aprendidas

1. **Empieza simple:** La primera versión no tenía resúmenes automáticos. Los añadimos después de validar que había demanda.

2. **Precio agresivo:** Al ser 8x más barato que la competencia, no necesitamos un producto perfecto desde el día 1.

3. **Feedback continuo:** Los primeros usuarios nos ayudaron a priorizar features.

## Resultado

VOCAP.io ahora tiene usuarios reales pagando suscripciones. Puedes probarlo gratis en [vocap.io](https://vocap.io).
    `,
  },
  {
    id: 'automatizar-reservas-restaurante',
    title: '5 Procesos que Todo Restaurante Debería Automatizar',
    excerpt: 'Desde reservas online hasta recordatorios por WhatsApp, descubre cómo la automatización puede liberar horas de trabajo manual en tu negocio de hostelería.',
    date: '2025-01-15',
    readTime: '5 min',
    category: 'Automatización',
    image: null,
    featured: false,
    content: `
## Por Qué Automatizar

Un restaurante medio gasta 10-15 horas semanales en tareas administrativas repetitivas. Esto es tiempo que podrías dedicar a mejorar la experiencia del cliente o simplemente a descansar.

## 1. Sistema de Reservas Online

**El problema:** Llamadas constantes para reservar, con el ruido del local de fondo.

**La solución:** Un sistema de reservas online que muestre disponibilidad en tiempo real y envíe confirmaciones automáticas.

**Ahorro estimado:** 5-8 horas/semana

## 2. Recordatorios de Reserva

**El problema:** No-shows que suponen mesas vacías y pérdida de ingresos.

**La solución:** WhatsApp automático 24h antes pidiendo confirmación. Si no responden, la mesa se libera.

**Ahorro estimado:** 15-20% menos no-shows

## 3. Gestión de Reseñas

**El problema:** Clientes satisfechos que no dejan reseñas en Google.

**La solución:** Email automático post-visita con link directo a Google Reviews.

**Ahorro estimado:** +30% más reseñas

## 4. Pedidos para Llevar

**El problema:** Llamadas telefónicas largas para anotar pedidos.

**La solución:** Bot de WhatsApp con menú interactivo y pago integrado.

**Ahorro estimado:** 3-5 horas/semana

## 5. Gestión de Proveedores

**El problema:** Pedidos manuales a proveedores que se olvidan.

**La solución:** Sistema de inventario con pedidos automáticos cuando el stock baja.

**Ahorro estimado:** 2-3 horas/semana

## ¿Te Interesa?

Desarrollamos sistemas de automatización personalizados desde 1.500€. [Contacta con nosotros](#/contacto) para una consulta gratuita.
    `,
  },
  {
    id: 'cuanto-cuesta-web-2025',
    title: '¿Cuánto Cuesta una Web en 2025? Guía de Precios Actualizada',
    excerpt: 'Desglosamos los precios reales del mercado: desde templates de 50€ hasta desarrollos a medida de 50.000€. Descubre qué opción se adapta a tu negocio.',
    date: '2025-01-10',
    readTime: '6 min',
    category: 'Guía',
    image: null,
    featured: false,
    content: `
## El Rango de Precios

El coste de una web puede variar enormemente:

- **DIY con template:** 50-200€
- **Freelancer básico:** 500-2.000€
- **Agencia pequeña:** 3.000-10.000€
- **Agencia premium:** 10.000-50.000€+

Pero, ¿qué obtienes en cada rango?

## DIY con Template (50-200€)

**Qué obtienes:**
- Tema de WordPress o Squarespace
- Diseño genérico
- Sin personalización real

**Para quién:** Proyectos personales, tests de mercado

## Freelancer Básico (500-2.000€)

**Qué obtienes:**
- Diseño más personalizado
- 5-10 páginas
- Responsive básico
- Sin funcionalidades avanzadas

**Para quién:** Pequeños negocios locales, portfolios

## Agencia Pequeña (3.000-10.000€)

**Qué obtienes:**
- Diseño único y profesional
- Funcionalidades a medida
- Integraciones (CRM, pagos, etc.)
- Soporte post-lanzamiento

**Para quién:** PYMEs, e-commerce pequeño

## ¿Dónde Encajamos Nosotros?

En M.G.M Automations ofrecemos:

- **Automatización:** 1.500-2.500€ (chatbots, reservas)
- **Plataforma Web:** 2.500-4.000€ (dashboard, portal)
- **SaaS Completo:** A consultar

Nuestro diferencial: **velocidad** (2-3 semanas) y **precio fijo** cerrado antes de empezar.

## Conclusión

No necesitas gastar 10.000€ para tener una web profesional. Tampoco deberías conformarte con un template de 50€ si tu negocio es serio.

El sweet spot para la mayoría de negocios está entre 2.000-5.000€.
    `,
  },
];

// Componente para la lista de posts
const BlogList = () => {
  const featuredPost = BLOG_POSTS.find(post => post.featured);
  const regularPosts = BLOG_POSTS.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-noir-950">
      {/* Header */}
      <header className="bg-noir-900 dark:bg-noir-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-cream-50 mb-4">
            Blog
          </h1>
          <p className="text-xl text-noir-400 max-w-2xl">
            Recursos, guías y casos de estudio sobre desarrollo web y automatización de negocios.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <Link
              to={`/blog/${featuredPost.id}`}
              className="group block border-3 border-noir-900 dark:border-noir-700 bg-white dark:bg-noir-900 overflow-hidden hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal dark:hover:shadow-brutal-lime transition-all"
            >
              <div className="grid md:grid-cols-2">
                {featuredPost.image && (
                  <div className="aspect-video md:aspect-auto bg-noir-200 dark:bg-noir-800">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-lime-400 text-noir-900 text-xs font-bold uppercase">
                      Destacado
                    </span>
                    <span className="px-3 py-1 bg-noir-100 dark:bg-noir-800 text-noir-600 dark:text-noir-400 text-xs font-bold uppercase">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-noir-600 dark:text-noir-400 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-noir-500">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Regular Posts */}
        <section>
          <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-8">
            Todos los artículos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 p-6 hover:border-lime-400 transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-lime-500" />
                  <span className="text-xs font-bold uppercase text-noir-500">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-noir-900 dark:text-cream-50 mb-3 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-noir-600 dark:text-noir-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-noir-500">
                  <span>{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-noir-900 py-8 px-4 text-center">
        <p className="text-noir-500 text-sm">
          © {new Date().getFullYear()} M.G.M Automations. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

// Componente para un post individual
const BlogPost = ({ postId }) => {
  const post = BLOG_POSTS.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-cream-50 dark:bg-noir-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
            Artículo no encontrado
          </h1>
          <Link to="/blog" className="text-lime-600 dark:text-lime-400 hover:underline">
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-noir-950">
      {/* Header */}
      <header className="bg-noir-900 dark:bg-noir-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-lime-400 text-noir-900 text-xs font-bold uppercase">
              {post.category}
            </span>
            <span className="flex items-center gap-2 text-sm text-noir-400">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-cream-50 mb-4">
            {post.title}
          </h1>
          <p className="text-noir-400">
            {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:text-noir-900 dark:prose-headings:text-cream-50 prose-p:text-noir-600 dark:prose-p:text-noir-400 prose-li:text-noir-600 dark:prose-li:text-noir-400 prose-strong:text-noir-900 dark:prose-strong:text-cream-50 prose-a:text-lime-600 dark:prose-a:text-lime-400">
          {post.content.split('\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={idx} className="text-2xl font-display font-bold mt-12 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-xl font-display font-bold mt-8 mb-3">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('- **')) {
              const [label, ...rest] = paragraph.replace('- **', '').split(':**');
              return (
                <div key={idx} className="flex gap-2 my-2">
                  <span className="text-lime-500">•</span>
                  <span><strong className="text-noir-900 dark:text-cream-50">{label}:</strong> {rest.join(':**')}</span>
                </div>
              );
            }
            if (paragraph.startsWith('**')) {
              const [label, ...rest] = paragraph.replace('**', '').split(':**');
              return (
                <p key={idx} className="my-4">
                  <strong className="text-noir-900 dark:text-cream-50">{label}:</strong> {rest.join(':**').replace('**', '')}
                </p>
              );
            }
            if (paragraph.trim() === '') return null;
            return <p key={idx} className="my-4">{paragraph}</p>;
          })}
        </article>

        {/* CTA */}
        <div className="mt-16 p-8 border-3 border-lime-400 bg-lime-50 dark:bg-lime-900/20">
          <h3 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
            ¿Te ha resultado útil?
          </h3>
          <p className="text-noir-600 dark:text-noir-400 mb-6">
            Si estás pensando en un proyecto similar, estaremos encantados de ayudarte.
          </p>
          <Link
            to="/#contacto"
            className="inline-flex items-center gap-2 bg-noir-900 text-lime-400 px-6 py-4 font-bold border-3 border-noir-900 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal transition-all"
          >
            Contactar
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-noir-900 py-8 px-4 text-center">
        <p className="text-noir-500 text-sm">
          © {new Date().getFullYear()} M.G.M Automations. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

// Componente principal del Blog
const Blog = ({ postId }) => {
  if (postId) {
    return <BlogPost postId={postId} />;
  }
  return <BlogList />;
};

export { BLOG_POSTS };
export default Blog;
