import React, { useState, useEffect, createContext, useContext } from 'react';
import { Cookie, Settings, X } from 'lucide-react';

const CookieConsentContext = createContext();

const CookieBanner = ({ onAcceptAll, onAcceptNecessary, onShowSettings }) => (
  <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 animate-slide-up">
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-strong border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
            <Cookie className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Usamos cookies</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar contenido.
            Puedes aceptar todas, solo las necesarias, o configurar tus preferencias.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={onShowSettings}
            className="px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Configurar
          </button>
          <button
            onClick={onAcceptNecessary}
            className="px-4 py-2.5 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
          >
            Solo necesarias
          </button>
          <button
            onClick={onAcceptAll}
            className="px-6 py-2.5 text-sm font-semibold bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  </div>
);

const CookieSettings = ({ onSave, onClose, currentConsent }) => {
  const [prefs, setPrefs] = useState({
    analytics: currentConsent?.analytics ?? false,
    marketing: currentConsent?.marketing ?? false,
  });

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Necesarias',
      description: 'Esenciales para el funcionamiento del sitio. No se pueden desactivar.',
      required: true,
    },
    {
      id: 'analytics',
      name: 'Analíticas',
      description: 'Nos ayudan a entender cómo usas el sitio para mejorarlo.',
      required: false,
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Permiten mostrarte anuncios relevantes en otras plataformas.',
      required: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-strong max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Configurar Cookies</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {cookieTypes.map((cookie) => (
            <div key={cookie.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">{cookie.name}</span>
                  {cookie.required && (
                    <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">Requerida</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{cookie.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cookie.required || prefs[cookie.id]}
                  onChange={(e) => !cookie.required && setPrefs({ ...prefs, [cookie.id]: e.target.checked })}
                  disabled={cookie.required}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 rounded-full peer transition-colors ${
                  cookie.required || prefs[cookie.id]
                    ? 'bg-primary-600'
                    : 'bg-gray-300 dark:bg-gray-600'
                } ${cookie.required ? 'opacity-60' : ''}`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    cookie.required || prefs[cookie.id] ? 'translate-x-5' : ''
                  }`} />
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(prefs)}
            className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Guardar preferencias
          </button>
        </div>
      </div>
    </div>
  );
};

export const CookieConsentProvider = ({ children }) => {
  const [consent, setConsent] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cookieConsent');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (consent === null) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [consent]);

  const acceptAll = () => {
    const newConsent = { necessary: true, analytics: true, marketing: true, timestamp: Date.now() };
    setConsent(newConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptNecessary = () => {
    const newConsent = { necessary: true, analytics: false, marketing: false, timestamp: Date.now() };
    setConsent(newConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
    setShowBanner(false);
    setShowSettings(false);
  };

  const savePreferences = (prefs) => {
    const newConsent = { ...prefs, necessary: true, timestamp: Date.now() };
    setConsent(newConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <CookieConsentContext.Provider value={{ consent, acceptAll, acceptNecessary, savePreferences, showSettings, setShowSettings }}>
      {children}
      {showBanner && <CookieBanner onAcceptAll={acceptAll} onAcceptNecessary={acceptNecessary} onShowSettings={() => setShowSettings(true)} />}
      {showSettings && <CookieSettings onSave={savePreferences} onClose={() => setShowSettings(false)} currentConsent={consent} />}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => useContext(CookieConsentContext);

export default CookieConsentContext;
