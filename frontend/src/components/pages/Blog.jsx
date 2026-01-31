import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag, User, Search, Share2, Copy, Check, Mail, ChevronDown, List } from 'lucide-react';
import { Link } from '../../App';
import { SEOHead, getBlogListSchemas, getArticleSchema } from '../seo';

// Datos de los posts del blog
const BLOG_POSTS = [
  {
    id: 'que-es-geo-generative-engine-optimization',
    title: 'GEO: Qué Es y Por Qué tu Web Necesita Optimización para IA en 2025',
    excerpt: 'Google ya no es el único que decide si te encuentran. ChatGPT, Perplexity y Google AI Overviews están cambiando las reglas. Te explicamos qué es GEO y cómo preparar tu negocio.',
    date: '2025-01-30',
    readTime: '9 min',
    category: 'SEO & GEO',
    image: null,
    featured: true,
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
    content: `
## El SEO ya no es suficiente

Durante 20 años, posicionar tu web significaba una cosa: aparecer en Google. Elegías palabras clave, escribías contenido, conseguías enlaces y subías en los resultados. Simple (aunque laborioso).

Pero en 2025, el panorama ha cambiado radicalmente. Cada vez más personas no buscan en Google: **preguntan directamente a una IA**.

- "ChatGPT, recomiéndame una agencia de desarrollo web en Madrid"
- "Perplexity, ¿cuánto cuesta una web profesional en España?"
- "Google, ¿qué opciones hay para automatizar reservas en mi clínica?"

Si tu web no está preparada para que las IAs te citen, estás perdiendo clientes sin saberlo. Aquí es donde entra **GEO**.

## ¿Qué es GEO?

**GEO (Generative Engine Optimization)** es el conjunto de técnicas para optimizar tu presencia web de manera que los motores de IA generativa —ChatGPT, Perplexity, Google AI Overviews, Claude, Copilot— te citen, te recomienden y enlacen cuando un usuario hace una consulta relacionada con tu negocio.

Mientras el SEO tradicional se centra en aparecer en una lista de 10 enlaces azules, el GEO se centra en **ser la respuesta** que la IA da directamente al usuario.

### La diferencia clave

**SEO tradicional:** Tu web aparece en el resultado #3 de Google → el usuario hace clic → llega a tu web.

**GEO:** Un usuario pregunta a ChatGPT "¿qué agencia de desarrollo web entrega rápido en España?" → la IA responde citando tu marca → el usuario ya confía en ti antes de visitarte.

En GEO, no compites por un clic. **Compites por ser la respuesta.**

## ¿Por qué importa ahora?

### Los datos hablan

- El 30% de las búsquedas en Google ya muestran una respuesta generada por IA (AI Overviews) antes de los resultados tradicionales.
- ChatGPT tiene más de 200 millones de usuarios activos semanales.
- Perplexity procesa millones de consultas diarias como alternativa a Google.
- El 40% de la Generación Z prefiere buscar información en IA o TikTok antes que en Google.

### Qué significa para tu negocio

Si alguien pregunta a una IA "¿qué empresa me puede hacer un chatbot de WhatsApp para mi clínica?" y la IA no te menciona, has perdido ese cliente. No importa que estés en la primera página de Google.

Lo preocupante es que la mayoría de negocios **ni siquiera sabe que esto está pasando**, porque no hay una métrica equivalente al "ranking de Google" para las IAs. Es tráfico invisible que nunca llega.

## Los 6 pilares del GEO

### 1. Datos estructurados (Schema JSON-LD)

Las IAs necesitan entender qué eres, qué haces y cómo encontrarte. Los schemas JSON-LD le dan esa información de forma directa.

**Qué implementar:**
- Schema de **Organization** con datos de contacto, idiomas y fundador
- Schema de **ProfessionalService** con servicios, precios y área de cobertura
- Schema de **FAQPage** con preguntas y respuestas completas
- Schema de **Article** con autor, fecha y contenido speakable
- Schema de **Person** para el fundador o equipo directivo

**Por qué funciona:** Cuando ChatGPT o Perplexity rastrean tu web, los schemas les dan información procesable al instante. Sin schemas, la IA tiene que "interpretar" tu HTML, con mucho más margen de error.

### 2. Contenido citrable

Las IAs citan frases concretas, no páginas enteras. Tu contenido debe incluir **definiciones claras** que la IA pueda extraer.

**Ejemplo malo:** "Somos una empresa que hace cosas de tecnología"

**Ejemplo bueno:** "M.G.M Automations es una agencia de desarrollo web y automatización de procesos con sede en Madrid que entrega proyectos funcionales en 1-3 semanas con precio fijo cerrado"

La segunda frase es una definición que una IA puede citar textualmente cuando alguien pregunte "¿Qué es M.G.M Automations?".

**Regla práctica:** Cada página principal de tu web debería tener al menos una frase definitoria que responda "¿Qué es [tu marca/servicio]?" de forma clara y completa.

### 3. E-E-A-T (Experiencia, Expertise, Autoridad, Confianza)

Google lleva años usando E-E-A-T para evaluar contenido. Las IAs hacen lo mismo, pero de forma aún más estricta. Necesitan saber **quién dice qué** para decidir si es fiable.

**Qué implementar:**
- Artículos firmados con nombre real, rol y datos del autor
- Schema Person vinculado al autor del blog y a la organización
- Contenido basado en experiencia propia, no genérico
- Casos de estudio reales con datos verificables

**Ejemplo:** Un artículo sobre "Cómo automatizar reservas" tiene más peso si está firmado por alguien que ha desarrollado un sistema de reservas real, no por un redactor anónimo.

### 4. FAQs optimizadas para queries de IA

Las preguntas frecuentes son oro puro para GEO. Cuando un usuario pregunta algo a una IA, esta busca pares pregunta-respuesta que coincidan con la consulta.

**Claves para FAQs efectivas:**
- Redactar las preguntas exactamente como las haría un usuario ("¿Cuánto cuesta una web en 2025?" en vez de "Información de precios")
- Respuestas completas pero concisas (2-4 frases)
- Incluir datos específicos (precios, plazos, nombres de tecnologías)
- Marcarlas con schema FAQPage para que las IAs las detecten al instante

### 5. Archivo llms.txt

Es un concepto nuevo: un archivo de texto plano en la raíz de tu web (como el robots.txt) que resume tu negocio en un formato fácil de procesar por IAs.

**Qué incluir:**
- Descripción del negocio en 2-3 frases
- Lista de servicios con precios
- Portfolio y casos de estudio
- Stack tecnológico
- Datos de contacto
- Hechos clave diferenciadores

**Por qué funciona:** Cuando un crawler de IA visita tu web, lo primero que busca es información estructurada. El llms.txt le da un resumen perfecto sin necesidad de parsear todo tu HTML.

### 6. Acceso para crawlers de IA

De nada sirve optimizar si bloqueas a los robots de IA. Tu robots.txt debe permitir explícitamente el acceso a:

- **GPTBot** y **ChatGPT-User** (OpenAI)
- **Google-Extended** (Google AI)
- **ClaudeBot** y **anthropic-ai** (Anthropic)
- **PerplexityBot** (Perplexity)

Muchos sitios bloquean estos bots por defecto sin saberlo, especialmente si usan plugins de seguridad de WordPress.

## GEO vs. SEO: ¿Se complementan?

Sí, al 100%. No se trata de elegir uno u otro. El GEO **construye sobre el SEO**, no lo reemplaza.

| Aspecto | SEO | GEO |
|---------|-----|-----|
| Objetivo | Aparecer en resultados de Google | Ser citado por IAs |
| Formato | Links azules + snippets | Respuesta directa en lenguaje natural |
| Señal clave | Backlinks + relevancia | Datos estructurados + autoridad |
| Métricas | Posición, CTR, tráfico orgánico | Menciones, citaciones, tráfico referido desde IA |
| Contenido | Optimizado por keywords | Optimizado para definiciones citables |

Si ya tienes buen SEO, implementar GEO es relativamente sencillo porque ya tienes la base: contenido de calidad, estructura limpia y autoridad temática.

## Checklist: ¿Tu web está preparada para GEO?

Hazte estas preguntas:

- ¿Tienes schemas JSON-LD (Organization, FAQPage, Article)?
- ¿Tu robots.txt permite GPTBot, ClaudeBot y PerplexityBot?
- ¿Tienes un archivo llms.txt?
- ¿Cada página tiene una frase definitoria que una IA pueda citar?
- ¿Tus artículos incluyen autor con nombre real y rol?
- ¿Tus FAQs están marcadas con schema y tienen respuestas completas?
- ¿Tu contenido incluye datos específicos (precios, plazos, cifras)?

Si has respondido "no" a 3 o más, tu web no está optimizada para los motores de IA que ya están decidiendo si te recomiendan o no.

## Cómo implementamos GEO en M.G.M Automations

Nosotros mismos hemos aplicado GEO en nuestra propia web. Esto es lo que hicimos:

1. **Meta tags dinámicos** por página con react-helmet-async
2. **6 tipos de schemas JSON-LD**: ProfessionalService, FAQPage, Article (con speakable), CollectionPage, WebApplication y WebPage
3. **Frases definitorias** en cada sección principal (Hero, Servicios)
4. **8 FAQs enriquecidas** con preguntas orientadas a queries de IA
5. **Schema Person** para vincular autoría del blog con entidad real
6. **Byline de autor** visual en cada artículo con nombre y rol
7. **llms.txt** con resumen estructurado del negocio
8. **robots.txt** con acceso explícito para 6 crawlers de IA

El resultado: nuestra web ahora está preparada para que ChatGPT, Perplexity y Google AI Overviews nos citen cuando alguien pregunte por desarrollo web o automatizaciones en España.

## ¿Necesitas implementar GEO en tu web?

En M.G.M Automations implementamos optimización GEO como parte de nuestros servicios de desarrollo web. No es un extra: es parte de cómo construimos webs en 2025.

Si quieres que analicemos tu web actual y te digamos cómo está de preparada para los motores de IA, agenda una consulta gratuita. En 30 minutos te damos un diagnóstico claro y un plan de acción.
    `,
  },
  {
    id: 'gestoria-web-pierde-clientes',
    title: 'Por Qué tu Gestoría Pierde Clientes por Culpa de su Web',
    excerpt: 'Analizamos las webs de más de 50 gestorías en España. El 80% tiene problemas técnicos graves que espantan clientes. Descubre si la tuya es una de ellas.',
    date: '2025-01-29',
    readTime: '7 min',
    category: 'Análisis Sectorial',
    image: null,
    featured: false,
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
    content: `
## El Problema que Nadie te Cuenta

Tu gestoría lleva 20, 30, puede que 40 años funcionando. Tienes clientes fieles, haces bien tu trabajo y las cosas van. Pero hay un problema: cada vez más clientes potenciales te buscan en Google antes de llamarte. Y lo que encuentran no les convence.

Hemos analizado las webs de más de 50 gestorías en España. Los resultados son preocupantes.

## Lo que Encontramos: Datos Reales

### El 73% no tiene certificado SSL

Esto significa que cuando alguien entra a tu web, el navegador muestra un aviso de "No seguro" junto a la URL. Para un negocio que maneja datos fiscales y contables de sus clientes, esto es devastador. El cliente piensa: "Si no pueden proteger su propia web, ¿cómo van a proteger mis datos?"

### El 85% tiene un diseño anterior a 2018

Webs con jQuery de 2012. Plantillas de WordPress sin personalizar. Constructores web gratuitos como Weebly o IONOS. Incluso gestorías con 40 años de experiencia usando subdominios de wordpress.com o pymes.com como su web corporativa.

### El 90% no tiene blog ni genera contenido

Cero artículos sobre cambios fiscales, cero guías sobre la declaración de la renta, cero contenido que ayude a posicionar en Google. Oportunidades de captar clientes que se pierden cada día.

### El 40% usa email no profesional

Gmail o Yahoo como correo corporativo. Imagina recibir una factura desde gestoriapepe@gmail.com frente a contacto@gestoriapepe.es. La confianza que transmite es radicalmente diferente.

## Por Qué Esto te Está Costando Dinero

### El cliente de 2025 busca en Google

Cuando alguien necesita una gestoría, no abre las Páginas Amarillas. Busca "gestoría + su ciudad" en Google. Si tu web no aparece, no existes. Si aparece pero tiene mala pinta, el cliente se va al siguiente resultado.

**Dato real:** El 75% de los usuarios juzga la credibilidad de un negocio por el diseño de su web (estudio de Stanford).

### Tu competencia ya se está moviendo

De las 50 gestorías que analizamos, un 20% sí tiene webs modernas y bien posicionadas. Esas son las que se llevan los clientes nuevos. No porque sean mejores gestores, sino porque transmiten más confianza online.

### El coste de no hacer nada

Supongamos que pierdes solo 2 clientes al mes por tener una web deficiente. Si cada cliente vale 150€/mes de cuota:

- **2 clientes perdidos x 150€ x 12 meses = 3.600€/año**

Eso es más de lo que cuesta tener una web profesional.

## Los 5 Problemas Más Graves (y Cómo Solucionarlos)

### 1. Sin SSL / HTTPS

**Qué es:** El candado verde que aparece en la barra del navegador. Sin él, Chrome marca tu web como "No segura".

**Solución:** Instalar un certificado SSL. Es gratuito con Let's Encrypt o viene incluido en cualquier hosting moderno.

**Impacto:** Google penaliza webs sin SSL en los resultados de búsqueda.

### 2. Web no responsive

**Qué es:** Tu web se ve mal en el móvil. Texto pequeño, botones imposibles de pulsar, scroll horizontal.

**Solución:** Rediseño con tecnología moderna que se adapte a cualquier pantalla.

**Impacto:** El 60% de las búsquedas en Google se hacen desde móvil.

### 3. Velocidad de carga lenta

**Qué es:** Tu web tarda más de 3 segundos en cargar. Plugins pesados, imágenes sin optimizar, código antiguo.

**Solución:** Optimización técnica o reconstrucción con tecnología ligera.

**Impacto:** El 53% de los usuarios abandona una web que tarda más de 3 segundos.

### 4. Contenido desactualizado

**Qué es:** Tu web habla de la "nueva normativa de 2019" o tiene un copyright de 2021.

**Solución:** Blog con contenido actualizado sobre novedades fiscales, guías prácticas y preguntas frecuentes.

**Impacto:** El contenido fresco mejora tu posición en Google y genera confianza.

### 5. Sin información de contacto clara

**Qué es:** El cliente tiene que buscar tu teléfono o email. No hay formulario de contacto, no hay WhatsApp, no hay mapa.

**Solución:** Sección de contacto visible con múltiples canales y un formulario simple.

**Impacto:** Cada segundo que el cliente pierde buscando cómo contactarte es una oportunidad de que se vaya.

## Qué Debería Tener la Web de una Gestoría en 2025

### Lo básico (imprescindible)

- Diseño profesional y moderno que transmita confianza
- Certificado SSL (HTTPS)
- Responsive (perfecta en móvil)
- Velocidad de carga inferior a 2 segundos
- Información de contacto visible: teléfono, email profesional, dirección, mapa
- Páginas de servicios claras: fiscal, laboral, contable, mercantil
- Formulario de contacto funcional

### Lo recomendable (diferenciador)

- Blog con artículos sobre novedades fiscales y guías prácticas
- Testimonios de clientes reales
- Sistema de cita previa online
- Chat o WhatsApp integrado
- Portal de clientes para intercambiar documentos
- Política de privacidad y cookies actualizada

### Lo avanzado (ventaja competitiva)

- Automatización de recordatorios de plazos fiscales
- Envío automático de newsletters con cambios normativos
- Sistema de firma digital de documentos
- Dashboard para que el cliente vea el estado de sus gestiones

## Cuánto Cuesta Modernizar la Web de tu Gestoría

No hace falta gastar una fortuna:

- **Web profesional completa:** 2.500-4.000€ (diseño a medida, todas las páginas, SEO básico, responsive)
- **Web + blog + posicionamiento SEO:** 3.500-5.000€
- **Web + automatizaciones (citas, WhatsApp, portal):** 4.000-6.000€

La inversión se recupera en menos de un año con los clientes nuevos que captarás.

## Test Rápido: ¿Tu Web Necesita una Reforma?

Hazte estas preguntas:

- ¿Tu web tiene el candado de seguridad (HTTPS)?
- ¿Se ve bien en el móvil sin hacer zoom?
- ¿Carga en menos de 3 segundos?
- ¿Tiene un diseño que transmite profesionalidad?
- ¿Apareces en la primera página de Google al buscar "gestoría + tu ciudad"?
- ¿Tu email corporativo es de tu propio dominio (no Gmail/Yahoo)?
- ¿Has actualizado el contenido en los últimos 6 meses?

Si has respondido "no" a 3 o más preguntas, tu web te está costando clientes.

## ¿Necesitas Ayuda?

En M.G.M Automations desarrollamos webs profesionales para gestorías y asesorías. Entregamos en 2-3 semanas con precio cerrado desde el primer día.

Te hacemos una auditoría gratuita de tu web actual en 15 minutos: te decimos exactamente qué problemas tiene y cómo solucionarlos. Sin compromiso.
    `,
  },
  {
    id: 'ia-para-pymes-guia-2025',
    title: 'Inteligencia Artificial para PYMEs: Guía Práctica 2025',
    excerpt: 'Descubre cómo las pequeñas y medianas empresas están usando IA para automatizar tareas, reducir costes y competir con grandes corporaciones. Sin jerga técnica, con ejemplos reales.',
    date: '2025-01-27',
    readTime: '10 min',
    category: 'Inteligencia Artificial',
    image: null,
    featured: false,
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
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
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
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
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
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
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
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
  // ===== NUEVOS ARTÍCULOS POR INDUSTRIA =====
  {
    id: 'clinica-dental-web-moderna-2025',
    title: 'Por Qué tu Clínica Dental Necesita una Web Moderna en 2025',
    excerpt: 'El 70% de pacientes busca dentista en Google antes de llamar. Si tu web no convence en 5 segundos, ese paciente se va a la competencia. Analizamos qué necesita la web de una clínica dental.',
    date: '2026-01-28',
    readTime: '8 min',
    category: 'Análisis Sectorial',
    image: null,
    featured: false,
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
    content: `
## Tu Web Es la Primera Impresión de tu Clínica

El 70% de los pacientes nuevos busca "dentista cerca de mí" o "clínica dental + ciudad" en Google antes de coger el teléfono. Lo que encuentren en esos 5 primeros segundos determina si te llaman o siguen buscando.

Y la realidad es preocupante: la mayoría de webs de clínicas dentales en España están desactualizadas, son lentas y no transmiten la confianza que un paciente necesita para poner su salud bucal en tus manos.

## Los Problemas Más Comunes en Webs de Clínicas Dentales

### Diseño anticuado que genera desconfianza

Webs con fotos genéricas de stock, colores desfasados y diseños que parecen de 2010. Un paciente asocia inconscientemente la calidad de tu web con la calidad de tu clínica. Si tu web parece abandonada, pensará que tu clínica también lo está.

### Sin sistema de reservas online

En 2025, obligar a un paciente a llamar por teléfono para pedir cita es un obstáculo innecesario. El paciente quiere reservar a las 11 de la noche desde el sofá, no esperar al lunes para llamar en horario de oficina.

**Dato clave:** Las clínicas con reserva online captan un 35% más de pacientes nuevos que las que solo ofrecen teléfono.

### Información de tratamientos incompleta

Muchas webs listan servicios como "ortodoncia", "implantes", "blanqueamiento" sin explicar en qué consiste, cuánto dura, qué precio aproximado tiene o qué resultados esperar. El paciente necesita esa información para decidir.

### Sin testimonios ni casos reales

Las reseñas de Google son importantes, pero tener testimonios directamente en tu web, con fotos de antes/después (con consentimiento), genera una confianza que ningún otro elemento iguala.

## Qué Necesita la Web de una Clínica Dental en 2025

### Sistema de reservas online integrado

No un enlace a Doctoralia (que te cobra comisión por paciente), sino un sistema propio integrado en tu web:

- Calendario con disponibilidad en tiempo real
- Selección de tratamiento y profesional
- Confirmación automática por email y WhatsApp
- Recordatorio 24h antes para reducir no-shows

**Resultado real:** Nuestros clientes con sistema de reservas propio han reducido los no-shows en un 40% gracias a los recordatorios automáticos.

### Páginas de tratamiento completas

Cada tratamiento debería tener su propia página con:

- Descripción clara del procedimiento
- Duración estimada
- Rango de precios (transparencia genera confianza)
- Preguntas frecuentes específicas del tratamiento
- CTA para reservar consulta

Esto no solo convence a pacientes: también posiciona en Google para búsquedas como "precio implantes dentales Madrid" o "cuánto dura una ortodoncia invisible".

### Ficha de cada profesional

Los pacientes quieren saber quién les va a tratar. Incluye:

- Foto profesional real (no de stock)
- Formación y especialidades
- Años de experiencia
- Breve bio personal que humanice

### WhatsApp Business integrado

El 92% de los españoles usa WhatsApp. Tener un botón de WhatsApp en tu web que abra una conversación directa elimina la fricción de llamar. Para consultas rápidas ("¿cuánto cuesta una limpieza?", "¿tenéis hueco esta semana?"), WhatsApp es imbatible.

### Blog con contenido de salud dental

Artículos como "¿Cada cuánto hay que hacer una limpieza dental?" o "Ortodoncia invisible vs brackets: pros y contras" posicionan en Google y demuestran expertise.

Un blog activo con 2-4 artículos al mes puede generar 200-500 visitas orgánicas mensuales en 6 meses. Cada visita es un paciente potencial.

## El Coste de una Web Profesional para tu Clínica

### Opción básica: 2.500-3.500€
- Diseño moderno y responsive
- 8-12 páginas (inicio, tratamientos, equipo, contacto)
- Formulario de contacto y WhatsApp
- SEO básico

### Opción completa: 3.500-5.000€
- Todo lo anterior +
- Sistema de reservas online integrado
- Blog configurado
- Integración con Google Business Profile
- Schema JSON-LD para SEO local

### Opción premium: 5.000-7.000€
- Todo lo anterior +
- Chatbot de WhatsApp para consultas 24/7
- Recordatorios automáticos de citas
- Portal de pacientes básico
- Campaña SEO local inicial

## Caso Real: Clínica Dental en Valencia

Una clínica con 2 profesionales y 15 años de trayectoria nos contactó con una web de WordPress de 2016. Sin reserva online, sin blog, sin WhatsApp.

**Lo que implementamos:**
- Web nueva con diseño profesional
- Sistema de reservas propio con calendario
- Recordatorios por WhatsApp automáticos
- 6 páginas de tratamientos optimizadas para SEO
- Blog con 4 artículos iniciales

**Resultados a los 3 meses:**
- 45% más de pacientes nuevos respecto al trimestre anterior
- 38% de las reservas se hacen fuera de horario laboral
- No-shows reducidos del 25% al 10%
- Posición top 5 en Google para "dentista + barrio"

## ¿Tu Web Está Espantando Pacientes?

Hazte estas preguntas:

- ¿Pueden reservar cita online sin llamar?
- ¿Tu web carga en menos de 3 segundos?
- ¿Se ve profesional en el móvil?
- ¿Tienes páginas detalladas de cada tratamiento?
- ¿Hay testimonios reales de pacientes?
- ¿Tienes WhatsApp integrado en la web?

Si has respondido "no" a 3 o más, estás perdiendo pacientes cada día.

## ¿Necesitas una Web que Capte Pacientes?

En M.G.M Automations desarrollamos webs para clínicas dentales con sistema de reservas integrado y optimización para SEO local. Entregamos en 2-3 semanas con precio cerrado.

Agenda una consulta gratuita y te hacemos un análisis de tu web actual con recomendaciones concretas.
    `,
  },
  {
    id: 'peluqueria-duplicar-reservas-automatizacion',
    title: 'Cómo una Peluquería Puede Duplicar sus Reservas con Automatización',
    excerpt: 'El 60% de las citas que pierdes son porque el cliente no pudo reservar fuera de horario. Te enseñamos cómo un sistema de reservas y recordatorios automáticos transforma tu salón.',
    date: '2026-01-24',
    readTime: '7 min',
    category: 'Automatización',
    image: null,
    featured: false,
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
    content: `
## El Problema de las Peluquerías con las Reservas

Si tienes una peluquería, conoces esta situación: estás con un cliente, las manos llenas de tinte, y suena el teléfono. No puedes cogerlo. Cuando devuelves la llamada 30 minutos después, el cliente ya ha reservado en otro sitio.

El 60% de las citas perdidas en peluquerías ocurre porque el cliente no pudo contactar en el momento que quiso reservar. Y la mayoría de esas llamadas son fuera de horario laboral o cuando el equipo está ocupado.

## La Solución: Reservas Online + Automatización

### Sistema de reservas 24/7

Un sistema de reservas online permite que tus clientes reserven a cualquier hora, desde cualquier dispositivo. Sin llamadas, sin esperas, sin citas perdidas.

**Cómo funciona:**
- El cliente entra a tu web o tu perfil de Instagram
- Ve la disponibilidad en tiempo real de cada profesional
- Selecciona servicio, profesional, fecha y hora
- Recibe confirmación instantánea por WhatsApp y email

**Resultado:** Capturas citas que antes perdías. El 40% de las reservas online se hacen fuera de horario laboral.

### Recordatorios automáticos por WhatsApp

Los no-shows cuestan dinero. Un hueco vacío de 45 minutos es dinero perdido. Los recordatorios automáticos reducen los no-shows drásticamente.

**Flujo automático:**
1. Confirmación inmediata al reservar
2. Recordatorio 24h antes: "Hola María, te recordamos tu cita de mechas mañana a las 16:00 con Ana. ¿Confirmas?"
3. Si no confirma, alerta al equipo para rellenar el hueco
4. SMS/WhatsApp post-servicio pidiendo reseña en Google

**Resultado real:** Reducción de no-shows del 30% al 8%.

### Gestión inteligente de clientes

Un sistema digitalizado te permite:

- Ver el historial completo de cada cliente (qué servicios se hizo, cuándo, con quién)
- Enviar promociones personalizadas ("Hace 6 semanas de tu último corte, ¿reservamos?")
- Identificar clientes que no vuelven y enviar ofertas de recuperación
- Análisis de qué servicios son más rentables y qué horarios tienen más demanda

## Qué Necesita tu Peluquería para Digitalizarse

### Lo esencial

- **Web con reservas online:** Calendario integrado con servicios, precios y disponibilidad
- **WhatsApp Business:** Para confirmaciones automáticas y comunicación directa
- **Google Business Profile optimizado:** Con fotos reales, servicios, horarios y reseñas

### El siguiente nivel

- **Recordatorios automáticos:** WhatsApp + email antes de cada cita
- **Sistema de fidelización:** Puntos, descuentos para clientes frecuentes
- **Marketing automático:** Emails y WhatsApp segmentados por tipo de cliente
- **Reseñas automáticas:** Solicitud de reseña en Google después de cada visita

### Para salones con varios profesionales

- **Agenda por profesional:** Cada estilista con su calendario independiente
- **Control de comisiones:** Seguimiento automático de servicios por profesional
- **Turnos y disponibilidad:** Gestión de horarios del equipo
- **Informes de rendimiento:** Facturación por profesional, servicio y período

## Cuánto Cuesta Automatizar tu Peluquería

### Sistema básico: 1.500-2.500€
- Web profesional con reservas online
- Integración WhatsApp Business
- Google Business Profile optimizado

### Sistema completo: 2.500-4.000€
- Todo lo anterior +
- Recordatorios automáticos
- CRM de clientes con historial
- Sistema de reseñas automáticas

### Sistema premium: 4.000-6.000€
- Todo lo anterior +
- App de fidelización
- Marketing automatizado
- Dashboard de analíticas del negocio

## Caso Real: Peluquería con 3 Estilistas en Madrid

**Situación inicial:**
- Reservas solo por teléfono e Instagram DM
- 25% de no-shows
- Sin historial de clientes digitalizado
- El 100% de las reservas en horario laboral

**Lo que implementamos:**
- Web con sistema de reservas por profesional
- Recordatorios WhatsApp automáticos 24h y 2h antes
- CRM básico con historial de servicios
- Email automático de reseña post-servicio

**Resultados a los 2 meses:**
- 85% más reservas (de 120/mes a 222/mes)
- No-shows reducidos al 7%
- 35% de reservas fuera de horario
- De 12 a 47 reseñas en Google en 2 meses
- Tiempo de gestión administrativa reducido un 60%

## ¿Merece la Pena?

Hagamos números con un ejemplo conservador:

- Ticket medio por servicio: 35€
- Citas perdidas por no poder atender teléfono: 8/semana
- Ingresos perdidos: 8 x 35€ x 4 semanas = **1.120€/mes**

Si un sistema de reservas te recupera el 50% de esas citas, son 560€/mes extra. En 3-4 meses has recuperado la inversión.

## ¿Listo para Modernizar tu Salón?

En M.G.M Automations desarrollamos sistemas de reservas y automatización para peluquerías y salones de belleza. Todo llave en mano: web, reservas, WhatsApp y CRM.

Agenda una consulta gratuita y te mostramos cómo funcionaría en tu negocio concreto.
    `,
  },
  {
    id: 'web-abogados-captar-clientes-2025',
    title: 'Web para Abogados: Cómo Captar Clientes Online en 2025',
    excerpt: 'El 80% de las personas que necesitan un abogado buscan primero en Google. Si tu despacho no tiene una web profesional con contenido legal SEO, estás dejando clientes a la competencia.',
    date: '2026-01-20',
    readTime: '9 min',
    category: 'Análisis Sectorial',
    image: null,
    featured: false,
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
    content: `
## El Nuevo Cliente Legal Busca en Google

El 80% de las personas que necesitan un abogado comienzan su búsqueda en internet. Ya no piden recomendaciones al vecino: buscan "abogado divorcios Madrid", "mejor abogado laboralista Barcelona" o "cuánto cobra un abogado por una herencia".

Si tu despacho no aparece en esa búsqueda, estás dejando clientes a la competencia. Y si aparece pero tu web no transmite profesionalidad y confianza, el cliente contactará al siguiente resultado.

## Por Qué las Webs de Abogados Fallan

### El problema de la credibilidad

Un abogado vende confianza. El cliente está en una situación vulnerable (un divorcio, un despido, una herencia conflictiva) y necesita sentir que el profesional al que va a confiar su caso es competente y serio.

Tu web es tu carta de presentación. Si parece un template genérico de WordPress sin personalizar, el cliente pensará que tu despacho también es genérico.

### Contenido legal que no posiciona

Muchos despachos tienen webs con textos como "ofrecemos servicios de derecho civil, penal, laboral y mercantil". Esto no posiciona en Google porque no responde a ninguna búsqueda real de un potencial cliente.

Las búsquedas reales son:
- "¿Cuánto cuesta un abogado para un divorcio?"
- "¿Me pueden despedir estando de baja?"
- "¿Cómo reclamar una herencia sin testamento?"

Si tu web no responde a estas preguntas, Google no la mostrará.

### Sin formulario de consulta optimizado

El potencial cliente que llega a tu web tiene una necesidad urgente. Si tiene que buscar un teléfono y llamar en horario de oficina, lo perderás. Necesita un formulario de consulta simple que le permita describir su caso y recibir una respuesta rápida.

## Qué Necesita la Web de un Despacho de Abogados

### Estructura de páginas orientada a SEO

Cada área de práctica debería tener su propia página optimizada:

- **Página de derecho de familia:** Divorcios, custodia, pensiones. Con preguntas frecuentes reales y rangos de precio.
- **Página de derecho laboral:** Despidos, reclamaciones, acoso laboral. Con casos tipo y plazos legales.
- **Página de herencias:** Sucesiones, testamentos, legítimas. Con proceso paso a paso.

Cada página debe incluir:
- Keywords relevantes en títulos y subtítulos
- Respuestas a preguntas frecuentes del área
- CTAs claros para solicitar consulta
- Schema FAQ para aparecer en featured snippets de Google

### Blog con contenido legal práctico

Un blog activo con artículos que respondan dudas reales es la mejor herramienta de captación. Ejemplos:

- "¿Cuánto tarda un divorcio de mutuo acuerdo en 2025?"
- "Guía completa: Cómo reclamar un despido improcedente"
- "Herencia sin testamento: Tus derechos explicados paso a paso"

Cada artículo es una puerta de entrada desde Google. Un blog con 20-30 artículos puede generar 1.000-3.000 visitas orgánicas mensuales.

### Formulario de consulta estratégico

No pidas 15 campos. Un formulario efectivo tiene:
- Nombre
- Teléfono o email
- Área legal (desplegable)
- Breve descripción del caso (textarea)
- Casilla GDPR

Añade un mensaje como "Respondemos en menos de 24 horas" para generar expectativa.

### Perfiles de abogados detallados

Cada abogado del despacho necesita una página con:
- Foto profesional real
- Especialidades y áreas de práctica
- Formación y colegiación
- Casos destacados o publicaciones
- Valoraciones de clientes

### WhatsApp para consultas rápidas

Muchos potenciales clientes prefieren escribir un WhatsApp antes que rellenar un formulario. Un botón de WhatsApp visible en toda la web facilita el primer contacto.

## SEO Local para Abogados: La Clave

### Google Business Profile optimizado

Es gratuito y fundamental:
- Dirección verificada del despacho
- Horarios actualizados
- Fotos reales de las instalaciones
- Responder a todas las reseñas (positivas y negativas)
- Publicaciones periódicas con novedades legales

### Reseñas de clientes

Las reseñas en Google son el factor de decisión #1 para potenciales clientes. Implementa un sistema para pedir reseñas:
- Email automático post-servicio
- QR en el despacho que lleve a Google Reviews
- Respuesta profesional a todas las reseñas

## Cuánto Cuesta la Web de un Despacho

### Web profesional: 3.000-5.000€
- Diseño a medida que transmita autoridad
- Páginas por área de práctica optimizadas
- Perfiles de abogados
- Formulario de consulta
- SEO básico + Google Business Profile

### Web + contenido SEO: 4.500-7.000€
- Todo lo anterior +
- Blog con 10 artículos iniciales optimizados
- Estrategia de keywords por área
- Schema JSON-LD completo

### Web + automatización + SEO: 6.000-9.000€
- Todo lo anterior +
- Chatbot para consultas iniciales 24/7
- CRM para gestión de leads
- Campaña SEO local los primeros 3 meses

## Resultados Esperados

Con una web profesional y contenido SEO, un despacho puede esperar:

- **Mes 1-3:** Primeras posiciones para keywords de baja competencia
- **Mes 3-6:** 200-500 visitas orgánicas mensuales, 10-20 consultas/mes
- **Mes 6-12:** 500-1.500 visitas orgánicas, 20-40 consultas/mes

Si conviertes el 20% de las consultas en clientes, con un ticket medio de 1.500€ por caso, los números hablan solos.

## ¿Tu Despacho Necesita una Web Profesional?

En M.G.M Automations desarrollamos webs para despachos de abogados con contenido legal SEO, formularios de consulta optimizados y automatizaciones para gestionar leads.

Te hacemos una auditoría gratuita de tu presencia online y te decimos exactamente cómo puedes captar más clientes desde Google.
    `,
  },
  {
    id: 'automatizacion-inmobiliarias-leads',
    title: 'Automatización para Inmobiliarias: De 50 Llamadas Diarias a 5',
    excerpt: 'El 80% de los leads inmobiliarios no están cualificados. Un sistema de automatización con chatbot WhatsApp y filtrado inteligente libera tu tiempo para cerrar los que sí importan.',
    date: '2026-01-16',
    readTime: '8 min',
    category: 'Automatización',
    image: null,
    featured: false,
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
    content: `
## El Problema de las Inmobiliarias con los Leads

Si trabajas en inmobiliaria, conoces el ciclo: publicas un piso en Idealista, te llegan 50 consultas, y el 80% son curiosos, personas que no pueden permitírselo o que buscan algo completamente diferente a lo que ofreces.

El resultado: pasas el día al teléfono filtrando leads en lugar de cerrar operaciones. Y los leads buenos se enfrían porque no puedes atenderlos rápido.

## La Solución: Automatización Inteligente de Leads

### Chatbot de WhatsApp para filtrado automático

Un chatbot de WhatsApp puede gestionar el primer contacto con cada lead de forma automática, las 24 horas del día:

**Flujo de conversación automático:**
1. Lead escribe preguntando por un inmueble
2. El bot responde con información básica (precio, m², ubicación, fotos)
3. Si el lead sigue interesado, el bot hace preguntas de cualificación:
   - ¿Buscas para comprar o alquilar?
   - ¿Cuál es tu presupuesto?
   - ¿Necesitas financiación?
   - ¿Cuándo quieres mudarte?
4. Si el lead está cualificado → alerta al agente con toda la información
5. Si no está cualificado → respuesta amable + se guarda en CRM para futuro

**Resultado:** De 50 llamadas diarias pasas a 5-10 con leads cualificados. El resto los gestiona el bot.

### Respuestas automáticas a portales inmobiliarios

Cuando alguien contacta desde Idealista, Fotocasa o tu web, cada minuto cuenta. Los estudios muestran que responder en los primeros 5 minutos multiplica por 10 la probabilidad de convertir el lead.

**Sistema automatizado:**
- Respuesta automática inmediata al lead
- Envío de ficha completa del inmueble
- Preguntas de cualificación
- Programación de visita si el lead está cualificado
- Todo sin intervención humana

### CRM inmobiliario con seguimiento automático

Un CRM adaptado al sector inmobiliario te permite:

- **Base de datos de leads centralizada:** Todos los contactos de todos los portales en un solo lugar
- **Seguimiento automático:** Si un lead no responde en 48h, se envía un recordatorio
- **Matching automático:** Si entra un inmueble que encaja con lo que busca un lead anterior, se le notifica
- **Pipeline visual:** Ve en qué fase está cada operación (contacto, visita, oferta, cierre)

## Automatizaciones Clave para Inmobiliarias

### 1. Publicación multiportal automatizada

Subes el inmueble una vez y se publica automáticamente en Idealista, Fotocasa, Pisos.com y tu web. Cambias el precio y se actualiza en todas partes.

### 2. Generación de fichas de inmueble

A partir de fotos y datos básicos, un sistema con IA genera descripciones atractivas y optimizadas para cada portal. Lo que tardabas 30 minutos por inmueble, lo haces en 2.

### 3. Valoración automática para captación

Un formulario en tu web que estima el valor de una propiedad a partir de la dirección, m² y estado. El propietario recibe la valoración y tú recibes un lead de captación.

### 4. Seguimiento post-visita automático

Después de una visita, se envía automáticamente:
- Agradecimiento por la visita
- Ficha del inmueble en PDF
- Encuesta de satisfacción
- Propuesta de inmuebles similares si no le convenció

### 5. Alertas de precio y matching

Cuando baja el precio de un inmueble o entra uno nuevo que encaja con los criterios de un lead, se le envía un WhatsApp o email automático.

## El Impacto en Números

### Antes de automatizar:
- 50+ llamadas/día de leads sin cualificar
- 2-3 horas/día gestionando portales
- 30 min/inmueble escribiendo descripciones
- Leads que se enfrían por respuesta lenta
- Sin seguimiento sistemático

### Después de automatizar:
- 5-10 leads cualificados/día con toda la información
- Publicación en 5 portales con 1 clic
- Descripciones generadas en 2 minutos
- Respuesta automática en menos de 1 minuto
- Seguimiento automático de cada lead

## Cuánto Cuesta Automatizar tu Inmobiliaria

### Nivel básico: 2.000-3.500€
- Chatbot WhatsApp para cualificación de leads
- Respuestas automáticas a portales
- CRM básico con pipeline

### Nivel completo: 3.500-6.000€
- Todo lo anterior +
- Publicación multiportal automatizada
- Generación de fichas con IA
- Seguimiento post-visita automático

### Nivel premium: 6.000-10.000€
- Todo lo anterior +
- Valorador automático en web
- Matching avanzado lead-inmueble
- Dashboard de analíticas de rendimiento
- Integración con software de gestión existente

## ¿Estás Perdiendo Operaciones por Falta de Automatización?

Hazte estas preguntas:
- ¿Cuántas horas al día pasas filtrando leads no cualificados?
- ¿Cuánto tardas en responder a un lead nuevo?
- ¿Tienes un seguimiento sistemático de cada contacto?
- ¿Publicas manualmente en cada portal?

Si la respuesta a cualquiera de estas te incomoda, la automatización es tu mejor inversión.

## ¿Quieres Automatizar tu Inmobiliaria?

En M.G.M Automations desarrollamos sistemas de automatización para inmobiliarias: chatbots de WhatsApp, CRM, publicación multiportal y más.

Agenda una consulta gratuita y te mostramos exactamente cómo se reduciría tu carga de trabajo.
    `,
  },
  {
    id: 'digitalizacion-clinicas-veterinarias-guia',
    title: 'Digitalización de Clínicas Veterinarias: Guía Completa',
    excerpt: 'Recordatorios de vacunas automáticos, historial de pacientes online, reservas 24/7. Todo lo que una clínica veterinaria necesita para modernizarse sin perder la cercanía con sus clientes.',
    date: '2026-01-12',
    readTime: '8 min',
    category: 'Análisis Sectorial',
    image: null,
    featured: false,
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
    content: `
## Por Qué las Clínicas Veterinarias Necesitan Digitalizarse

El sector veterinario es uno de los más rezagados en digitalización. Muchas clínicas todavía gestionan citas con una agenda de papel, envían recordatorios de vacunas llamando uno a uno, y no tienen presencia online más allá de una ficha en Google Maps.

Mientras tanto, los dueños de mascotas son cada vez más digitales: buscan veterinario en Google, quieren reservar online y esperan comunicación por WhatsApp.

## Los Problemas Más Comunes

### Recordatorios de vacunas manuales

El veterinario sabe que la vacuna de "Rocky" toca en marzo, pero ¿quién llama al dueño para recordárselo? Si nadie lo hace, la clínica pierde la visita y el paciente pierde su calendario de vacunación.

**Dato:** Las clínicas que automatizan recordatorios de vacunas ven un incremento del 40% en las visitas de revacunación.

### Citas por teléfono en horario limitado

Los dueños de mascotas trabajan. Necesitan poder reservar una cita para la revisión de su perro a las 10 de la noche, no esperar al día siguiente para llamar.

### Sin historial digital del paciente

¿Cuándo fue la última desparasitación? ¿Qué tratamiento se prescribió hace 6 meses? ¿Tiene alguna alergia? Si esta información está en fichas de papel, encontrarla lleva tiempo y es propensa a errores.

### Web inexistente o desactualizada

Muchas clínicas no tienen web o tienen una página básica sin información útil. El cliente potencial que busca "veterinario urgencias + zona" no te encuentra.

## Qué Necesita una Clínica Veterinaria Digital

### Sistema de reservas online

Un calendario de citas accesible desde la web y el móvil:

- Tipos de cita: consulta general, vacunación, cirugía, urgencias
- Selección de veterinario (si hay varios)
- Disponibilidad en tiempo real
- Confirmación automática por WhatsApp
- Posibilidad de adjuntar información ("Mi gato no come desde ayer")

### Recordatorios automáticos

**Vacunas:**
- Recordatorio 2 semanas antes: "La vacuna polivalente de Rocky toca el 15 de marzo. ¿Reservamos cita?"
- Si no responde, segundo recordatorio 3 días antes
- Link directo para reservar cita

**Desparasitación:**
- Recordatorio trimestral automático
- Opción de comprar el producto online

**Revisiones anuales:**
- Email + WhatsApp al cumplir un año de la última revisión

**Resultado real:** Incremento del 40% en visitas de vacunación y del 25% en revisiones anuales.

### Historial clínico digital

Un sistema donde cada paciente tiene su ficha con:
- Datos del animal (especie, raza, edad, peso, chip)
- Historial de visitas con fecha, motivo y tratamiento
- Calendario de vacunación
- Alergias y condiciones crónicas
- Fotos de evolución (útil para dermatología)
- Datos del propietario y contacto

El veterinario accede a todo en 2 clics, desde el ordenador o una tablet en la consulta.

### Web profesional con SEO local

Una web que posicione en Google para búsquedas como:
- "Veterinario + barrio/ciudad"
- "Veterinario urgencias + zona"
- "Clínica veterinaria 24 horas + ciudad"

Con páginas específicas para cada servicio: consultas, vacunación, cirugía, odontología, dermatología, etc.

### Comunicación por WhatsApp

- Confirmaciones y recordatorios de citas
- Envío de resultados de analíticas
- Fotos de evolución post-cirugía
- Respuesta a consultas rápidas
- Solicitud de reseñas post-visita

## Plan de Digitalización por Fases

### Fase 1: Lo esencial (1.500-3.000€)
- Web profesional con información de servicios
- Google Business Profile optimizado
- Sistema de reservas online básico
- WhatsApp Business configurado

### Fase 2: Automatización (3.000-5.000€)
- Recordatorios automáticos de vacunas y desparasitación
- Confirmaciones de cita por WhatsApp
- Solicitud automática de reseñas
- Blog con 5 artículos de salud animal

### Fase 3: Gestión completa (5.000-8.000€)
- Historial clínico digital completo
- Portal para propietarios (ver historial, solicitar recetas)
- CRM de clientes con segmentación
- Dashboard de métricas del negocio

## Caso Real: Clínica Veterinaria con 2 Profesionales

**Situación inicial:**
- Agenda en papel
- Recordatorios de vacunas por llamada telefónica (cuando se acordaban)
- Web de una sola página sin reservas
- Toda la comunicación por teléfono

**Lo que implementamos:**
- Web nueva con reservas online y perfil de cada veterinario
- Sistema de recordatorios automáticos por WhatsApp
- Historial clínico digital básico
- Blog con 6 artículos de salud animal

**Resultados a los 4 meses:**
- 35% más de visitas de vacunación (recordatorios automáticos)
- 45% de citas reservadas online (muchas fuera de horario)
- 15 minutos menos por consulta gracias al historial digital
- De 8 a 32 reseñas en Google

## ¿Tu Clínica Está Lista para Digitalizarse?

La digitalización no significa perder la cercanía con tus pacientes y sus dueños. Significa tener más tiempo para dedicar a lo que importa: cuidar animales.

En M.G.M Automations desarrollamos soluciones digitales para clínicas veterinarias. Desde la web hasta el sistema de recordatorios, todo adaptado a tu forma de trabajar.

Agenda una consulta gratuita y te mostramos cómo modernizar tu clínica paso a paso.
    `,
  },
  {
    id: 'sistema-reservas-gimnasios-guia',
    title: 'Sistema de Reservas para Gimnasios: Guía para Propietarios',
    excerpt: 'Control de aforo, reservas de clases, pagos recurrentes automatizados. La guía definitiva para digitalizar la gestión de tu gimnasio o centro deportivo.',
    date: '2026-01-08',
    readTime: '7 min',
    category: 'Automatización',
    image: null,
    featured: false,
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
    content: `
## El Reto de Gestionar un Gimnasio en 2025

Gestionar un gimnasio hoy implica malabares constantes: control de aforo, reservas de clases dirigidas, cobros de cuotas, gestión de horarios de monitores, comunicación con socios... Todo esto multiplicado por decenas o cientos de socios.

Los gimnasios que siguen gestionando esto con Excel, WhatsApp y papel están perdiendo socios frente a los que ofrecen una experiencia digital fluida.

## Lo Que Espera el Socio de 2025

### Reservas desde el móvil

El socio quiere abrir el móvil a las 7 de la mañana, ver qué clases hay disponibles y reservar su plaza en spinning de las 19:00. Si no puede hacerlo así, buscará un gimnasio donde sí pueda.

### Información en tiempo real

¿Cuántas plazas quedan en yoga? ¿A qué hora está menos llena la sala de pesas? ¿Mi monitor habitual da clase hoy? El socio quiere esta información al instante.

### Pagos sin fricción

Nada de transferencias bancarias mensuales ni pasar por recepción a pagar. Cobro automático por domiciliación o tarjeta, con factura digital.

## Funcionalidades Clave de un Sistema de Reservas

### Reserva de clases dirigidas

- Catálogo de clases con descripción, monitor, horario y plazas disponibles
- Reserva con 1 clic desde web o app
- Lista de espera automática cuando la clase está llena
- Cancelación hasta X horas antes (configurable)
- Notificación si se libera una plaza

### Control de aforo inteligente

Post-pandemia, el control de aforo se ha convertido en estándar. Un buen sistema permite:

- Aforo máximo por zona (sala pesas, cardio, clases dirigidas)
- Check-in digital al entrar (QR o código)
- Visualización en tiempo real de la ocupación
- Franja horaria con más/menos afluencia

### Gestión de cuotas y pagos

- Planes de suscripción configurables (mensual, trimestral, anual)
- Cobro automático recurrente
- Gestión de impagos con alertas automáticas
- Congelación de cuota (vacaciones, lesiones)
- Facturación digital automática

### Comunicación con socios

- Notificaciones push o WhatsApp para cambios de horario
- Promociones personalizadas (renovación con descuento)
- Encuestas de satisfacción automáticas
- Newsletter mensual con novedades

## Cómo Implementar un Sistema de Reservas

### Paso 1: Definir necesidades

No todos los gimnasios necesitan lo mismo:

- **Box de CrossFit:** Reserva de WOD por horario, control de aforo estricto
- **Gimnasio convencional:** Reserva de clases + control de aforo general
- **Centro deportivo:** Multi-actividad con piscina, pádel, sala fitness
- **Estudio boutique:** Reserva de plaza específica (tu bici de spinning)

### Paso 2: Elegir la solución

**Opción A: Software existente (SaaS)**
- Soluciones como Trainingym, Resamania o Fitogram
- Cuota mensual (50-200€/mes según socios)
- Rápido de implementar
- Limitaciones de personalización

**Opción B: Desarrollo a medida**
- Sistema adaptado 100% a tu negocio
- Inversión inicial mayor, sin cuotas mensuales
- Total control y personalización
- Integración con tu web y marca

### Paso 3: Migración y formación

- Importar base de datos de socios existente
- Configurar clases, horarios y monitores
- Formar al equipo (recepción, monitores, gerencia)
- Comunicar a los socios el nuevo sistema

## El Impacto Real en tu Gimnasio

### Operaciones
- **70% menos tiempo en gestión administrativa**
- Eliminación de errores de overbooking
- Información de ocupación en tiempo real
- Gestión de impagos automática

### Socios
- **25% más retención** gracias a mejor experiencia
- Mayor asistencia a clases dirigidas
- Satisfacción por la transparencia y facilidad
- Comunicación más fluida

### Negocio
- **Más ingresos** por mejor ocupación de clases
- Datos para tomar decisiones (qué clases añadir/quitar)
- Reducción de impagos
- Imagen moderna y profesional

## Cuánto Cuesta

### Sistema básico: 2.000-4.000€
- Web con reserva de clases
- Control de aforo básico
- Panel de administración

### Sistema completo: 4.000-7.000€
- Todo lo anterior +
- Gestión de cuotas y cobros automáticos
- App o PWA para socios
- Notificaciones WhatsApp
- Dashboard de métricas

### Sistema premium: 7.000-12.000€
- Todo lo anterior +
- Integración con tornos de acceso
- Multi-centro
- CRM avanzado de socios
- Marketing automatizado

## ¿Tu Gimnasio Necesita Digitalizarse?

Si todavía gestionas reservas por WhatsApp, cobras cuotas manualmente o no tienes datos de ocupación, estás perdiendo socios y dinero.

En M.G.M Automations desarrollamos sistemas de reservas y gestión para gimnasios y centros deportivos. Soluciones a medida que se adaptan a tu forma de trabajar.

Agenda una consulta gratuita y te mostramos cómo simplificar la gestión de tu centro.
    `,
  },
  {
    id: 'talleres-mecanicos-web-comercial-2025',
    title: 'Talleres Mecánicos en 2025: Tu Web es tu Mejor Comercial',
    excerpt: 'El 65% de los conductores busca taller en Google antes de llevar su coche. Presupuestos online, seguimiento de reparaciones y reseñas: así se capta cliente en 2025.',
    date: '2026-01-05',
    readTime: '7 min',
    category: 'Análisis Sectorial',
    image: null,
    featured: false,
    author: { name: 'Manuel Gregorio', role: 'Founder de M.G.M Automations' },
    content: `
## Tu Taller Necesita Más que un Cartel en la Puerta

El 65% de los conductores busca "taller mecánico cerca de mí" en Google cuando necesita un servicio. Si tu taller no aparece o tu web no convence, ese cliente se va al competidor de al lado que sí tiene presencia online.

La realidad del sector es esta: los talleres que dependen solo del boca a boca están perdiendo cuota de mercado frente a los que han invertido en su presencia digital.

## Qué Busca un Cliente Cuando Busca Taller

### Confianza y transparencia

El cliente de taller tiene miedo a que le engañen. Es un sector donde la reputación lo es todo. Tu web debe transmitir:
- Transparencia en precios
- Reseñas reales de otros clientes
- Información sobre el equipo y las instalaciones
- Especialidades claras (mecánica general, chapa y pintura, ITV, etc.)

### Presupuesto rápido

Nadie quiere llamar a 5 talleres para comparar precios. Si ofreces una herramienta de presupuesto online (aunque sea aproximado), captarás a los clientes que buscan comparar cómodamente.

### Seguimiento de la reparación

"¿Ya está mi coche?" Es la pregunta que reciben todos los talleres 10 veces al día. Un sistema de seguimiento online donde el cliente pueda ver el estado de su reparación elimina esas llamadas y mejora la experiencia.

## Funcionalidades Clave para la Web de un Taller

### Solicitud de presupuesto online

Un formulario donde el cliente describe el problema:
- Marca y modelo del vehículo
- Kilómetros
- Tipo de servicio (revisión, reparación, ITV, chapa)
- Descripción del problema o servicio deseado
- Fotos (opcional, muy útil para chapa y pintura)

El taller recibe la solicitud, elabora un presupuesto y lo envía por email o WhatsApp. El cliente percibe profesionalidad y agilidad.

### Seguimiento de reparaciones

Un panel simple donde el cliente introduce su matrícula o un código y ve:
- Estado actual: "En diagnóstico", "Esperando pieza", "En reparación", "Listo para recoger"
- Fecha estimada de entrega
- Fotos del progreso (especialmente útil en chapa y pintura)
- Importe actualizado si hay cambios

**Beneficio doble:** El cliente está informado y satisfecho. El taller recibe un 70% menos de llamadas de seguimiento.

### Reserva de cita para revisiones y mantenimiento

Para servicios programables (revisión anual, cambio de aceite, neumáticos, ITV):
- Calendario con disponibilidad
- Selección de servicio y vehículo
- Recordatorio automático por WhatsApp
- Estimación de duración y precio

### Fichas de servicios detalladas

Cada servicio con su propia página en la web:
- Descripción del servicio
- Qué incluye
- Precio orientativo o desde
- Tiempo estimado
- Preguntas frecuentes

Esto posiciona en Google para búsquedas como "precio cambio de embrague + ciudad" o "cuánto cuesta pasar la ITV en + zona".

### Reseñas y casos reales

Las reseñas de Google son el factor #1 de decisión. Complementa con:
- Testimonios destacados en la web
- Fotos de antes/después (chapa y pintura)
- Contador de vehículos atendidos
- Años de experiencia

## SEO Local: Aparecer Cuando te Buscan

### Google Business Profile

Para un taller, Google Business Profile es obligatorio:
- Dirección exacta con mapa
- Horarios actualizados
- Fotos reales del taller (instalaciones, equipo, trabajos)
- Servicios listados con precios
- Respuesta a todas las reseñas
- Publicaciones periódicas con ofertas o consejos

### Keywords que importan

Las búsquedas más frecuentes para talleres:
- "Taller mecánico + ciudad/barrio"
- "Mecánico de confianza + zona"
- "Precio + servicio + ciudad" (ej: "precio distribución Seat León Madrid")
- "Taller + marca + ciudad" (ej: "taller Volkswagen Sevilla")

Cada una de estas debería tener contenido en tu web.

## Automatizaciones que Ahorran Tiempo

### Recordatorio de revisión anual
Email + WhatsApp automático cuando se cumple un año de la última visita: "Tu coche tiene la revisión pendiente. ¿Reservamos cita?"

### Solicitud de reseña post-servicio
WhatsApp automático 24h después de recoger el coche con link directo a Google Reviews.

### Seguimiento de presupuestos
Si envías un presupuesto y el cliente no responde en 48h, se envía un recordatorio automático.

### Alertas de ITV
Si tienes la fecha de ITV del cliente, envía un recordatorio 1 mes antes ofreciendo preparar el coche.

## Cuánto Cuesta la Web de un Taller

### Web profesional: 2.000-3.500€
- Diseño que transmita confianza
- Páginas de servicios optimizadas
- Formulario de presupuesto
- Google Business Profile optimizado
- SEO local básico

### Web + automatizaciones: 3.500-5.500€
- Todo lo anterior +
- Sistema de seguimiento de reparaciones
- Recordatorios automáticos (WhatsApp)
- Solicitud de reseñas automática
- Reserva de citas online

### Web + gestión completa: 5.500-8.000€
- Todo lo anterior +
- CRM de clientes con historial de vehículos
- Facturación digital
- Dashboard de métricas del negocio
- Marketing automatizado

## ¿Tu Taller Está en Google?

Busca "taller mecánico + tu ciudad" en Google. Si no apareces en los primeros resultados, estás perdiendo clientes cada día. Si apareces pero tu web no convence, estás perdiendo los que sí te encuentran.

En M.G.M Automations desarrollamos webs y automatizaciones para talleres mecánicos. Presupuestos online, seguimiento de reparaciones, reservas y más. Todo adaptado a tu negocio.

Agenda una consulta gratuita y te hacemos un análisis de tu presencia online con recomendaciones concretas.
    `,
  },
];

// --- Utilidades ---
const slugify = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const extractH2s = (content) => {
  const headings = [];
  content.split('\n').forEach((line) => {
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      const text = line.replace('## ', '').trim();
      headings.push({ text, id: slugify(text) });
    }
  });
  return headings;
};

// --- Componente de Tabla de Contenidos ---
const TableOfContents = ({ headings }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length <= 5) return null;

  return (
    <>
      {/* Mobile: collapsible */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 font-display font-bold text-noir-900 dark:text-cream-50"
        >
          <span className="flex items-center gap-2">
            <List className="w-5 h-5 text-lime-500" />
            Tabla de contenidos
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <nav className="border-3 border-t-0 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 p-4">
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-noir-600 dark:text-noir-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 p-5">
          <h4 className="font-display font-bold text-noir-900 dark:text-cream-50 mb-4 flex items-center gap-2">
            <List className="w-4 h-4 text-lime-500" />
            Contenidos
          </h4>
          <nav>
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="text-sm text-noir-600 dark:text-noir-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors block py-0.5"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

// --- Botones de compartir ---
const ShareButtons = ({ title, postId }) => {
  const [copied, setCopied] = useState(false);
  const url = `https://mgmautomations.es/blog/${postId}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-noir-500 text-xs mr-1 flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" /> Compartir:
      </span>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 border-2 border-noir-300 dark:border-noir-600 text-noir-500 hover:border-green-500 hover:text-green-500 transition-colors"
        aria-label="Compartir en WhatsApp"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 border-2 border-noir-300 dark:border-noir-600 text-noir-500 hover:border-sky-500 hover:text-sky-500 transition-colors"
        aria-label="Compartir en X"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 border-2 border-noir-300 dark:border-noir-600 text-noir-500 hover:border-blue-600 hover:text-blue-600 transition-colors"
        aria-label="Compartir en LinkedIn"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <button
        onClick={handleCopy}
        className={`p-1.5 border-2 transition-colors ${copied ? 'border-lime-500 text-lime-500' : 'border-noir-300 dark:border-noir-600 text-noir-500 hover:border-lime-500 hover:text-lime-500'}`}
        aria-label="Copiar enlace"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};

// --- Posts Relacionados ---
const RelatedPosts = ({ currentPost }) => {
  const related = useMemo(() => {
    const sameCategory = BLOG_POSTS.filter(
      (p) => p.category === currentPost.category && p.id !== currentPost.id
    );
    const others = BLOG_POSTS.filter(
      (p) => p.category !== currentPost.category && p.id !== currentPost.id
    );
    const result = [...sameCategory];
    if (result.length < 3) {
      result.push(...others.slice(0, 3 - result.length));
    }
    return result.slice(0, 3);
  }, [currentPost]);

  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h3 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-6">
        Artículos Relacionados
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="group border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 p-5 hover:border-lime-400 transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-3.5 h-3.5 text-lime-500" />
              <span className="text-xs font-bold uppercase text-noir-500">
                {post.category}
              </span>
            </div>
            <h4 className="text-base font-display font-bold text-noir-900 dark:text-cream-50 mb-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors line-clamp-2">
              {post.title}
            </h4>
            <p className="text-noir-600 dark:text-noir-400 text-sm line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-noir-500 mt-3">
              <span>{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// --- Newsletter CTA ---
const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="mb-12 border-3 border-lime-400 bg-white dark:bg-noir-900 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-display font-bold text-noir-900 dark:text-cream-50 mb-2 flex items-center gap-2">
            <Mail className="w-5 h-5 text-lime-500" />
            Recibe nuestros artículos en tu email
          </h3>
          <p className="text-noir-600 dark:text-noir-400 text-sm">
            Un email a la semana con guías prácticas para digitalizar tu negocio. Sin spam, cancela cuando quieras.
          </p>
        </div>
        <div className="flex-shrink-0 w-full md:w-auto">
          {submitted ? (
            <p className="text-lime-600 dark:text-lime-400 font-bold flex items-center gap-2">
              <Check className="w-5 h-5" />
              ¡Suscrito correctamente!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 md:w-56 px-4 py-3 border-3 border-noir-200 dark:border-noir-700 bg-cream-50 dark:bg-noir-800 text-noir-900 dark:text-cream-50 focus:border-lime-400 focus:outline-none focus:shadow-[4px_4px_0_0_rgba(163,230,53,0.3)] transition-all text-sm"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-noir-900 dark:bg-lime-400 text-lime-400 dark:text-noir-900 font-bold border-3 border-noir-900 dark:border-lime-400 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all text-sm whitespace-nowrap"
              >
                Suscribirse
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// Componente para la lista de posts
const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(
    () => ['Todos', ...new Set(BLOG_POSTS.map((p) => p.category))],
    []
  );

  const filteredPosts = useMemo(() => {
    let posts = BLOG_POSTS;
    if (activeCategory !== 'Todos') {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeCategory, searchQuery]);

  const featuredPost = BLOG_POSTS.find((post) => post.featured);

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-noir-950">
      <SEOHead
        title="Blog - Desarrollo Web, Automatización e IA | M.G.M Automations"
        description="Recursos, guías y casos de estudio sobre desarrollo web, automatización de negocios e inteligencia artificial para PYMEs. Por M.G.M Automations."
        canonical="/blog"
        ogTitle="Blog - M.G.M Automations"
        ogDescription="Artículos sobre desarrollo web, automatización e IA para negocios. Guías prácticas con ejemplos reales."
        ogImage="https://mgmautomations.es/og-image.jpg"
        schemas={getBlogListSchemas()}
      />
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
          <p className="text-xl text-noir-400 max-w-2xl mb-8">
            Recursos, guías y casos de estudio sobre desarrollo web y automatización de negocios.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-noir-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artículos..."
              className="w-full pl-11 pr-4 py-3 border-3 border-noir-700 bg-noir-800 text-cream-50 placeholder-noir-500 focus:border-lime-400 focus:outline-none focus:shadow-[4px_4px_0_0_rgba(163,230,53,0.3)] transition-all"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="mb-10 -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-bold border-3 transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-lime-400 text-noir-900 border-noir-900 dark:border-lime-400'
                    : 'bg-white dark:bg-noir-900 text-noir-600 dark:text-noir-400 border-noir-200 dark:border-noir-700 hover:border-noir-400 dark:hover:border-noir-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post (only if no filter/search active) */}
        {featuredPost && activeCategory === 'Todos' && !searchQuery.trim() && (
          <section className="mb-12">
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

        {/* Newsletter CTA (only on unfiltered view) */}
        {activeCategory === 'Todos' && !searchQuery.trim() && <NewsletterCTA />}

        {/* Posts grid */}
        <section>
          <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-8">
            {activeCategory === 'Todos' && !searchQuery.trim()
              ? 'Todos los artículos'
              : searchQuery.trim()
              ? `Resultados para "${searchQuery}"`
              : activeCategory}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900">
              <Search className="w-12 h-12 text-noir-300 dark:text-noir-600 mx-auto mb-4" />
              <p className="text-noir-600 dark:text-noir-400 text-lg font-display font-bold mb-2">
                No se encontraron artículos
              </p>
              <p className="text-noir-500 text-sm">
                Prueba con otros términos de búsqueda o selecciona otra categoría.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
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
          )}
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
  const post = BLOG_POSTS.find((p) => p.id === postId);

  const headings = useMemo(() => (post ? extractH2s(post.content) : []), [post]);
  const showTOC = headings.length > 5;

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
      <SEOHead
        title={`${post.title} | Blog M.G.M Automations`}
        description={post.excerpt}
        canonical={`/blog/${post.id}`}
        ogTitle={post.title}
        ogDescription={post.excerpt}
        ogImage={post.image ? `https://mgmautomations.es${post.image}` : 'https://mgmautomations.es/og-image.jpg'}
        ogType="article"
        schemas={getArticleSchema(post)}
      />
      {/* Header */}
      <header className="bg-noir-900 dark:bg-noir-900 py-12 px-4">
        <div className={`mx-auto ${showTOC ? 'max-w-5xl' : 'max-w-4xl'}`}>
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
          {/* Author byline */}
          <div className="flex items-center gap-4 mt-6">
            <div className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center border-2 border-lime-400">
              <User className="w-5 h-5 text-noir-900" />
            </div>
            <div>
              <p className="text-cream-50 font-semibold text-sm">{post.author?.name || 'Manuel Gregorio'}</p>
              <p className="text-noir-400 text-xs">{post.author?.role || 'Founder de M.G.M Automations'} · {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
          {/* Share buttons */}
          <ShareButtons title={post.title} postId={post.id} />
        </div>
      </header>

      {/* Content */}
      <main className={`mx-auto px-4 py-12 ${showTOC ? 'max-w-5xl' : 'max-w-4xl'}`}>
        {/* Mobile TOC */}
        {showTOC && <TableOfContents headings={headings} />}

        <div className={showTOC ? 'grid lg:grid-cols-[1fr_250px] gap-8' : ''}>
          <div>
            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:text-noir-900 dark:prose-headings:text-cream-50 prose-p:text-noir-600 dark:prose-p:text-noir-400 prose-li:text-noir-600 dark:prose-li:text-noir-400 prose-strong:text-noir-900 dark:prose-strong:text-cream-50 prose-a:text-lime-600 dark:prose-a:text-lime-400">
              {post.content.split('\n').map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  const text = paragraph.replace('## ', '');
                  return <h2 key={idx} id={slugify(text)} className="text-2xl font-display font-bold mt-12 mb-4">{text}</h2>;
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

            {/* Related Posts */}
            <RelatedPosts currentPost={post} />

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
          </div>

          {/* Desktop TOC sidebar */}
          {showTOC && <TableOfContents headings={headings} />}
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
