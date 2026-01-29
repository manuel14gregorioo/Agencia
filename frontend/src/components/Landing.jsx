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

// SEO
import { SEOHead, getLandingSchemas } from './seo';

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
  ServiciosSection,
  ProcesoSection,
  FAQSection,
  CTASection,
} from './sections';

// Componente interno para usar hooks dentro de providers
const LandingContent = () => {
  useScrollTracking();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans antialiased transition-colors duration-300">
      <SEOHead
        title="Desarrollo Web y Automatizaciones en 2 Semanas | M.G.M Automations Madrid"
        description="M.G.M Automations es una agencia de desarrollo web y automatización de procesos en Madrid. Entregamos sistemas completos en 1-3 semanas con precio fijo. Creadores de VOCAP.io."
        canonical="/"
        ogTitle="De idea a sistema funcionando en 2 semanas | M.G.M Automations"
        ogDescription="Desarrollo web y automatizaciones para negocios. Desde 1.500€. Creadores de VOCAP.io - SaaS real en producción que puedes probar."
        ogImage="https://mgmautomations.es/og-image.jpg"
        schemas={getLandingSchemas()}
      />
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
