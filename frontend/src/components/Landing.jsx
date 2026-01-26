/**
 * ============================================
 * AGENCIA LANDING PAGE V2.3
 * ============================================
 * Refactorizado en componentes modulares:
 * - contexts/ - Contextos de tema, toast, cookies
 * - hooks/ - Hooks personalizados
 * - ui/ - Componentes de UI reutilizables
 * - sections/ - Secciones de la landing
 * - data/ - Datos estaticos y constantes
 * ============================================
 */

import React from 'react';

// Contexts
import { ThemeProvider, ToastProvider, CookieConsentProvider } from './contexts';

// Hooks
import { useScrollTracking } from './hooks';

// UI Components
import { Navbar, Footer, WhatsAppButton, ScrollToTopButton, ExitIntentPopup } from './ui';

// Sections
import {
  HeroSection,
  ValueProposition,
  TestimonialSection,
  PortfolioSection,
  ComparisonSection,
  ProcesoSection,
  PricingSection,
  FAQSection,
  CTASection,
} from './sections';

// Componente interno para usar hooks dentro de providers
const LandingContent = () => {
  useScrollTracking();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans antialiased transition-colors duration-300">
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      <header role="banner">
        <Navbar />
      </header>
      <main id="main-content" role="main">
        <HeroSection />
        <ValueProposition />
        <TestimonialSection />
        <PortfolioSection />
        <ComparisonSection />
        <ProcesoSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
      <ExitIntentPopup />
    </div>
  );
};

const Landing = () => (
  <ThemeProvider>
    <ToastProvider>
      <CookieConsentProvider>
        <LandingContent />
      </CookieConsentProvider>
    </ToastProvider>
  </ThemeProvider>
);

export default Landing;
