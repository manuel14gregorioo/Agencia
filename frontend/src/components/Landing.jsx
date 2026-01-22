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

// UI Components
import { Navbar, Footer, WhatsAppButton, ScrollToTopButton } from './ui';

// Sections
import {
  HeroSection,
  ValueProposition,
  TestimonialSection,
  PortfolioSection,
  ComparisonSection,
  ServiciosSection,
  ProcesoSection,
  PricingSection,
  FAQSection,
  CTASection,
} from './sections';

const Landing = () => (
  <ThemeProvider>
    <ToastProvider>
      <CookieConsentProvider>
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
            <ServiciosSection />
            <ProcesoSection />
            <PricingSection />
            <FAQSection />
            <CTASection />
          </main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTopButton />
        </div>
      </CookieConsentProvider>
    </ToastProvider>
  </ThemeProvider>
);

export default Landing;
