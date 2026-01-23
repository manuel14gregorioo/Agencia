/**
 * ============================================
 * ANALYTICS & TRACKING UTILITIES
 * ============================================
 * Sistema de tracking que respeta el consentimiento de cookies
 * Soporta: Google Analytics 4, Meta Pixel
 */

// IDs de tracking (configurar en producción)
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Reemplazar con tu ID de GA4
const META_PIXEL_ID = '000000000000000'; // Reemplazar con tu Pixel ID

// Estado de inicialización
let gaInitialized = false;
let metaInitialized = false;

/**
 * Inicializa Google Analytics 4
 */
export function initGA4() {
  if (gaInitialized || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;

  // Cargar script de gtag
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Configurar gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  gaInitialized = true;
  console.log('[Analytics] GA4 initialized');
}

/**
 * Inicializa Meta Pixel
 */
export function initMetaPixel() {
  if (metaInitialized || META_PIXEL_ID === '000000000000000') return;

  // Facebook Pixel Code
  !function(f,b,e,v,n,t,s) {
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');

  metaInitialized = true;
  console.log('[Analytics] Meta Pixel initialized');
}

/**
 * Trackea un evento en GA4
 */
export function trackEvent(eventName, params = {}) {
  if (!gaInitialized || !window.gtag) return;

  window.gtag('event', eventName, {
    ...params,
    timestamp: new Date().toISOString(),
  });

  console.log('[Analytics] Event tracked:', eventName, params);
}

/**
 * Trackea un evento en Meta Pixel
 */
export function trackMetaEvent(eventName, params = {}) {
  if (!metaInitialized || !window.fbq) return;

  window.fbq('track', eventName, params);
  console.log('[Analytics] Meta event tracked:', eventName, params);
}

/**
 * Eventos predefinidos de conversión
 */
export const ConversionEvents = {
  // Formulario de contacto
  contactFormStart: () => {
    trackEvent('form_start', { form_name: 'contact' });
    trackMetaEvent('Lead', { content_name: 'Contact Form Start' });
  },

  contactFormSubmit: (data = {}) => {
    trackEvent('generate_lead', {
      form_name: 'contact',
      ...data,
    });
    trackMetaEvent('Lead', {
      content_name: 'Contact Form Submit',
      ...data,
    });
  },

  // Newsletter
  newsletterSubscribe: () => {
    trackEvent('sign_up', { method: 'newsletter' });
    trackMetaEvent('Subscribe', { content_name: 'Newsletter' });
  },

  // CTAs
  ctaClick: (ctaName, location) => {
    trackEvent('cta_click', {
      cta_name: ctaName,
      location: location,
    });
  },

  // Calendly
  calendlyOpen: () => {
    trackEvent('schedule_start', { tool: 'calendly' });
    trackMetaEvent('Schedule', { content_name: 'Calendly Open' });
  },

  calendlyComplete: () => {
    trackEvent('schedule_complete', { tool: 'calendly' });
    trackMetaEvent('Schedule', { content_name: 'Calendly Complete' });
  },

  // Portfolio
  portfolioView: (projectName) => {
    trackEvent('view_item', {
      item_name: projectName,
      item_category: 'portfolio',
    });
  },

  // Pricing
  pricingView: (planName) => {
    trackEvent('view_item', {
      item_name: planName,
      item_category: 'pricing',
    });
  },

  // Exit Intent
  exitIntentShown: () => {
    trackEvent('exit_intent_shown');
  },

  exitIntentConverted: () => {
    trackEvent('exit_intent_converted');
    trackMetaEvent('Lead', { content_name: 'Exit Intent' });
  },

  // Scroll depth
  scrollDepth: (percentage) => {
    trackEvent('scroll', { percent_scrolled: percentage });
  },

  // Time on page
  timeOnPage: (seconds) => {
    trackEvent('engagement_time', { seconds: seconds });
  },

  // WhatsApp click
  whatsappClick: () => {
    trackEvent('contact', { method: 'whatsapp' });
    trackMetaEvent('Contact', { content_name: 'WhatsApp' });
  },
};

/**
 * Obtiene parámetros UTM de la URL
 */
export function getUTMParams() {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
  };
}

/**
 * Guarda UTM params en sessionStorage para persistir entre páginas
 */
export function saveUTMParams() {
  const utmParams = getUTMParams();
  const hasUTM = Object.values(utmParams).some(v => v);

  if (hasUTM) {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
  }
}

/**
 * Recupera UTM params guardados
 */
export function getSavedUTMParams() {
  if (typeof window === 'undefined') return {};

  const saved = sessionStorage.getItem('utm_params');
  return saved ? JSON.parse(saved) : getUTMParams();
}

export default {
  initGA4,
  initMetaPixel,
  trackEvent,
  trackMetaEvent,
  ConversionEvents,
  getUTMParams,
  saveUTMParams,
  getSavedUTMParams,
};
