/**
 * ============================================
 * EXIT INTENT POPUP
 * ============================================
 * Popup que aparece cuando el usuario intenta abandonar la página
 * Ofrece un lead magnet o descuento para capturar el email
 */

import React, { useState, useEffect, useCallback } from 'react';
import { X, Gift, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { subscribeNewsletter } from '../../utils/api';
import { ConversionEvents } from '../../utils/analytics';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [hasShown, setHasShown] = useState(false);

  // Detectar exit intent (mouse sale del viewport por arriba)
  const handleMouseLeave = useCallback((e) => {
    if (hasShown) return;
    if (e.clientY <= 0) {
      // Verificar si ya se mostró en esta sesión
      const shown = sessionStorage.getItem('exitIntentShown');
      if (shown) return;

      setIsVisible(true);
      setHasShown(true);
      sessionStorage.setItem('exitIntentShown', 'true');
      ConversionEvents.exitIntentShown();
    }
  }, [hasShown]);

  useEffect(() => {
    // Solo activar en desktop
    if (window.innerWidth < 768) return;

    // Esperar 5 segundos antes de activar el listener
    const timeout = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');

    try {
      await subscribeNewsletter(email);
      setStatus('success');
      ConversionEvents.exitIntentConverted();

      // Cerrar después de 3 segundos
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error subscribing:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header con gradiente */}
        <div className="bg-gradient-to-br from-primary-600 to-purple-600 px-6 py-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            ¡Espera! Tenemos algo para ti
          </h2>
          <p className="text-white/80 text-sm">
            Recibe nuestra guía gratuita de automatización
          </p>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                ¡Listo! Revisa tu email
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Te hemos enviado la guía. Revisa también spam.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  En esta guía aprenderás:
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>5 procesos que puedes automatizar hoy mismo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Cómo calcular el ROI de una automatización</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Errores comunes que debes evitar</span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 transition-all outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : status === 'error' ? (
                    'Error. Reintentar'
                  ) : (
                    <>
                      Quiero la guía gratis
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-center text-gray-400 mt-4">
                Sin spam. Puedes darte de baja cuando quieras.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
