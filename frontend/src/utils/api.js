/**
 * ============================================
 * API UTILITIES
 * ============================================
 * Funciones para comunicación con el backend
 */

const API_BASE = '/api';

/**
 * Manejador de errores de API
 */
class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

/**
 * Función base para peticiones fetch
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new APIError(
        data.error || 'Error en la petición',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Error de conexión', 0, null);
  }
}

/**
 * Enviar formulario de contacto
 */
export async function submitContact(formData) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

/**
 * Suscribirse a newsletter
 */
export async function subscribeNewsletter(email) {
  return request('/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

/**
 * Obtener configuración pública
 */
export async function getConfig() {
  return request('/config');
}

/**
 * Registrar evento de analytics
 */
export async function trackEvent(eventName, eventData = {}) {
  return request('/analytics/event', {
    method: 'POST',
    body: JSON.stringify({
      event: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer,
    }),
  });
}

export default {
  submitContact,
  subscribeNewsletter,
  getConfig,
  trackEvent,
};
