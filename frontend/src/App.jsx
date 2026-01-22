/**
 * ============================================
 * AGENCIA DEV - APLICACIÓN PRINCIPAL
 * ============================================
 */

import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import DemoReservas from './components/DemoReservas';

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

  if (currentPage === 'demo') {
    return <DemoReservas />;
  }

  return <Landing />;
}

export default App;
