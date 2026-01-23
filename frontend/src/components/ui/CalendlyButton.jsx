import React, { useState, useCallback, useEffect } from 'react';
import { CALENDLY_URL } from '../../data/constants';
import { ConversionEvents } from '../../utils/analytics';

// Lazy load del script de Calendly solo cuando se necesita
const loadCalendlyScript = () => {
  return new Promise((resolve) => {
    // Si ya está cargado, resolver inmediatamente
    if (window.Calendly) {
      resolve(window.Calendly);
      return;
    }

    // Verificar si el script ya está en el DOM
    const existingScript = document.querySelector('script[src*="calendly.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.Calendly));
      return;
    }

    // Cargar script dinámicamente
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => resolve(window.Calendly);
    document.head.appendChild(script);

    // También cargar estilos
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });
};

const CalendlyButton = ({ children, className = '', variant = 'primary' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const openCalendly = useCallback(async () => {
    setIsLoading(true);
    ConversionEvents.calendlyOpen();

    try {
      const Calendly = await loadCalendlyScript();
      if (Calendly) {
        Calendly.initPopupWidget({ url: CALENDLY_URL });
      } else {
        // Fallback: abrir en nueva pestaña
        window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      // Fallback si falla la carga
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Escuchar evento de Calendly cuando se completa la reserva
  useEffect(() => {
    const handleCalendlyEvent = (e) => {
      if (e.data.event === 'calendly.event_scheduled') {
        ConversionEvents.calendlyComplete();
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, []);

  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all hover:scale-105 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";
  const variants = {
    primary: "bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-white/10",
    secondary: "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20",
    cta: "bg-primary-600 text-white hover:bg-primary-700",
  };

  return (
    <button
      onClick={openCalendly}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      aria-label="Agendar llamada de consulta gratuita"
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          Cargando...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default CalendlyButton;
