/**
 * ============================================
 * AGENCIA DEV - APLICACIÓN PRINCIPAL
 * ============================================
 *
 * Performance optimizado con:
 * - Code splitting (React.lazy)
 * - Suspense con loading states
 * - Clean URL routing (History API) - SEO friendly
 */

import React, { useState, useEffect, Suspense, lazy, createContext, useContext } from 'react';

// Lazy loading de componentes para code splitting
const Landing = lazy(() => import('./components/Landing'));
const DemoReservas = lazy(() => import('./components/DemoReservas'));
const PrivacyPolicy = lazy(() => import('./components/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./components/pages/CookiePolicy'));
const Blog = lazy(() => import('./components/pages/Blog'));

// Router Context for navigation
const RouterContext = createContext(null);

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within App');
  }
  return context;
};

// Navigation helper - use this instead of <a href> for internal links
export const navigate = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

// Link component for internal navigation
export const Link = ({ to, children, className, ...props }) => {
  const handleClick = (e) => {
    // Allow cmd/ctrl+click to open in new tab
    if (e.metaKey || e.ctrlKey) return;

    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

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

// Parse pathname to route
const parseRoute = (pathname) => {
  // Normalize pathname
  const path = pathname === '' ? '/' : pathname;

  // Route matching
  if (path === '/') {
    return { page: 'landing', params: {} };
  } else if (path === '/demo') {
    return { page: 'demo', params: {} };
  } else if (path === '/privacidad') {
    return { page: 'privacy', params: {} };
  } else if (path === '/terminos') {
    return { page: 'terms', params: {} };
  } else if (path === '/cookies') {
    return { page: 'cookies', params: {} };
  } else if (path === '/blog') {
    return { page: 'blog', params: {} };
  } else if (path.startsWith('/blog/')) {
    const postId = path.replace('/blog/', '');
    return { page: 'blog-post', params: { postId } };
  } else {
    // Default to landing for unknown routes
    return { page: 'landing', params: {} };
  }
};

function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.pathname));

  useEffect(() => {
    // Handle browser back/forward and programmatic navigation
    const handlePopState = () => {
      setRoute(parseRoute(window.location.pathname));
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Redirect hash URLs to clean URLs (for backwards compatibility)
  useEffect(() => {
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      const cleanPath = window.location.hash.slice(1); // Remove #
      window.history.replaceState({}, '', cleanPath);
      setRoute(parseRoute(cleanPath));
    }
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

  const routerValue = { route, navigate };

  return (
    <RouterContext.Provider value={routerValue}>
      <Suspense fallback={<LoadingFallback />}>
        {renderRoute()}
      </Suspense>
    </RouterContext.Provider>
  );
}

export default App;
