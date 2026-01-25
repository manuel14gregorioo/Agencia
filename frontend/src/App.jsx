/**
 * ============================================
 * AGENCIA DEV - APLICACIÓN PRINCIPAL
 * ============================================
 *
 * Performance optimizado con:
 * - Code splitting (React.lazy)
 * - Suspense con loading states
 * - Hash-based routing
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';

// Lazy loading de componentes para code splitting
const Landing = lazy(() => import('./components/Landing'));
const DemoReservas = lazy(() => import('./components/DemoReservas'));
const PrivacyPolicy = lazy(() => import('./components/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./components/pages/CookiePolicy'));
const Blog = lazy(() => import('./components/pages/Blog'));

// Loading fallback component
const LoadingFallback = () => (
  <div
    className="min-h-screen flex items-center justify-center bg-cream-50 dark:bg-noir-950"
    role="status"
    aria-label="Cargando contenido"
  >
    <div className="text-center">
      <div className="inline-block w-12 h-12 border-4 border-lime-400 border-t-transparent animate-spin mb-4" />
      <p className="text-noir-600 dark:text-noir-400 font-medium">Cargando...</p>
    </div>
  </div>
);

function App() {
  const [route, setRoute] = useState({ page: 'landing', params: {} });

  useEffect(() => {
    // Parse hash-based routes
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/'; // Remove # and default to /

      // Route matching
      if (hash === '/' || hash === '') {
        setRoute({ page: 'landing', params: {} });
      } else if (hash === '/demo') {
        setRoute({ page: 'demo', params: {} });
      } else if (hash === '/privacidad') {
        setRoute({ page: 'privacy', params: {} });
      } else if (hash === '/terminos') {
        setRoute({ page: 'terms', params: {} });
      } else if (hash === '/cookies') {
        setRoute({ page: 'cookies', params: {} });
      } else if (hash === '/blog') {
        setRoute({ page: 'blog', params: {} });
      } else if (hash.startsWith('/blog/')) {
        const postId = hash.replace('/blog/', '');
        setRoute({ page: 'blog-post', params: { postId } });
      } else {
        // Default to landing for unknown routes
        setRoute({ page: 'landing', params: {} });
      }

      // Scroll to top on route change
      window.scrollTo(0, 0);
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Render current route
  const renderRoute = () => {
    switch (route.page) {
      case 'demo':
        return <DemoReservas />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsOfService />;
      case 'cookies':
        return <CookiePolicy />;
      case 'blog':
        return <Blog />;
      case 'blog-post':
        return <Blog postId={route.params.postId} />;
      case 'landing':
      default:
        return <Landing />;
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      {renderRoute()}
    </Suspense>
  );
}

export default App;
