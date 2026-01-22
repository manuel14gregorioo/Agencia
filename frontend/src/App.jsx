/**
 * ============================================
 * AGENCIA DEV - APLICACIÓN PRINCIPAL
 * ============================================
 *
 * Performance optimizado con:
 * - Code splitting (React.lazy)
 * - Suspense con loading states
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';

// Lazy loading de componentes para code splitting
const Landing = lazy(() => import('./components/Landing'));
const DemoReservas = lazy(() => import('./components/DemoReservas'));

// Loading fallback component
const LoadingFallback = () => (
  <div
    className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
    role="status"
    aria-label="Cargando contenido"
  >
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    // Simple hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/demo') {
        setCurrentPage('demo');
      } else {
        setCurrentPage('landing');
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
      {currentPage === 'demo' ? <DemoReservas /> : <Landing />}
    </Suspense>
  );
}

export default App;
