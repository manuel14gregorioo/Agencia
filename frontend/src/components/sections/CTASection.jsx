import React from 'react';
import { Shield, Clock, BadgeCheck, Check, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import ContactForm from '../ContactForm';

const CTASection = () => {
  const [ref, isVisible] = useScrollAnimation();

  const benefits = [
    'Analizamos tu caso particular',
    'Te decimos honestamente si podemos ayudar',
    'Propuesta con precio cerrado en 48h'
  ];

  return (
    <section id="contacto" className="section-lg bg-noir-900 dark:bg-noir-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-lime-400/5 skew-x-12 origin-top-right" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-3 border-lime-400/20 -translate-x-1/2 translate-y-1/2" />

      <div ref={ref} className="container-xl mx-auto relative z-10">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left column - Copy */}
          <div>
            <span className="inline-block px-4 py-2 bg-lime-400 text-noir-900 text-xs font-bold uppercase tracking-wider mb-8">
              Empezar
            </span>

            <h2 className="heading-xl text-cream-50 mb-6">
              ¿Listo para<br />
              <span className="text-lime-400">empezar</span>?
            </h2>

            <p className="text-xl text-noir-400 mb-10 leading-relaxed">
              Llamada de 30 minutos sin compromiso.
              Te decimos si tiene sentido trabajar juntos.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-12">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-lime-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-noir-900" />
                  </div>
                  <span className="text-cream-50 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-noir-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-lime-500" />
                <span>Sin spam</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-lime-500" />
                <span>Respuesta en 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-lime-500" />
                <span>Sin compromiso</span>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
