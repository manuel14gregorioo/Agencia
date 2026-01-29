const BASE_URL = 'https://mgmautomations.es';

const ORGANIZATION = {
  '@type': 'Organization',
  name: 'M.G.M Automations',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.svg`,
  email: 'hola@mgmautomations.es',
};

const FOUNDER = {
  '@type': 'Person',
  name: 'Manuel Gregorio',
  jobTitle: 'Founder',
  url: BASE_URL,
  worksFor: ORGANIZATION,
};

export function getLandingSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'M.G.M Automations',
      image: `${BASE_URL}/og-image.jpg`,
      description:
        'M.G.M Automations es una agencia de desarrollo web y automatización de procesos con sede en Madrid. Entregamos proyectos en 1-3 semanas con precio fijo. Creadores de VOCAP.io.',
      url: BASE_URL,
      email: 'hola@mgmautomations.es',
      founder: FOUNDER,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Madrid',
        addressRegion: 'Madrid',
        addressCountry: 'ES',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 40.4168,
        longitude: -3.7038,
      },
      priceRange: '€-€€€',
      areaServed: { '@type': 'Country', name: 'España' },
      knowsAbout: [
        'Python',
        'Flask',
        'React',
        'PostgreSQL',
        'Stripe API',
        'WhatsApp API',
        'OpenAI',
        'Claude AI',
      ],
      knowsLanguage: ['es', 'en'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Tenéis ejemplos reales de vuestro trabajo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, VOCAP.io es un proyecto propio que puedes probar gratis ahora mismo. Es una plataforma SaaS completa de transcripción con IA que demuestra nuestra capacidad end-to-end: backend con Python/Flask, frontend React, pagos Stripe y procesamiento con OpenAI Whisper.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto tiempo tarda un proyecto?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Automatizaciones en 1-2 semanas. Plataformas web en 2-3 semanas. SaaS completos en 3-4 semanas. Trabajamos en sprints con demos cada 2-3 días para que veas avances reales.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto cuesta?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Automatizaciones desde 1.500€, plataformas web desde 2.500€, SaaS completos a consultar. Precio fijo cerrado antes de empezar, sin sorpresas.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué pasa si necesito cambios después?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Una ronda de revisiones está incluida sin coste adicional. Para cambios posteriores ofrecemos soporte a 80€/hora o packs mensuales de mantenimiento.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Trabajáis solo en Madrid?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '100% remoto. Trabajamos con clientes de toda España. Reuniones por videollamada, respuesta garantizada en menos de 24 horas.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué tecnologías utilizáis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nuestro stack principal es Python con Flask en backend, React en frontend, PostgreSQL como base de datos, Stripe para pagos, y APIs de OpenAI y Claude AI para funcionalidades de inteligencia artificial. Desplegamos en Vercel y Railway.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué es VOCAP.io?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'VOCAP.io es nuestro producto propio: una plataforma SaaS de transcripción de audio con inteligencia artificial. Ofrece transcripciones de calidad profesional a 1€/hora, frente a los 8-12€ de la competencia. Está desarrollado con Python/Flask, React, PostgreSQL, Stripe y OpenAI Whisper.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Ofrecéis mantenimiento después de la entrega?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Todos los proyectos incluyen 1 mes de soporte gratuito para bugs y ajustes menores. Después, ofrecemos mantenimiento continuo a 80€/hora o packs mensuales adaptados a cada cliente.',
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: `${BASE_URL}/`,
        },
      ],
    },
  ];
}

export function getArticleSchema(post) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: post.author?.name || 'Manuel Gregorio',
        jobTitle: post.author?.role || 'Founder',
        url: BASE_URL,
      },
      publisher: ORGANIZATION,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/blog/${post.id}`,
      },
      image: post.image
        ? `${BASE_URL}${post.image}`
        : `${BASE_URL}/og-image.jpg`,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['article h1', 'article h2', 'article p'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: `${BASE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${BASE_URL}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `${BASE_URL}/blog/${post.id}`,
        },
      ],
    },
  ];
}

export function getBlogListSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Blog - M.G.M Automations',
      description:
        'Recursos, guías y casos de estudio sobre desarrollo web, automatización de negocios e inteligencia artificial para PYMEs.',
      url: `${BASE_URL}/blog`,
      publisher: ORGANIZATION,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: `${BASE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${BASE_URL}/blog`,
        },
      ],
    },
  ];
}

export function getDemoSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Demo Sistema de Reservas - M.G.M Automations',
      description:
        'Demo interactiva del sistema de reservas online desarrollado por M.G.M Automations. Disponible para clínicas, peluquerías, talleres, veterinarias y centros de estética.',
      url: `${BASE_URL}/demo`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '1500',
        priceCurrency: 'EUR',
        description: 'Sistema de reservas personalizado desde 1.500€',
      },
      author: ORGANIZATION,
    },
  ];
}

export function getLegalPageSchema(pageName, pageSlug) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${pageName} - M.G.M Automations`,
      url: `${BASE_URL}/${pageSlug}`,
      publisher: ORGANIZATION,
      inLanguage: 'es',
    },
  ];
}
