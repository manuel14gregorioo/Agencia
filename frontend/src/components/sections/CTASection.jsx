import React from 'react';
import { Shield, Clock, BadgeCheck, Check } from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import ContactForm from '../ContactForm';

const CTASection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="contacto" className="section-lg bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_25%_25%,rgba(255,255,255,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_75%_75%,rgba(139,92,246,0.2),transparent)]" />

      <div ref={ref} className={`container-lg relative z-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para empezar?</h2>
            <p className="text-xl text-white/80 mb-8">Llamada de 30 minutos sin compromiso. Te decimos si tiene sentido trabajar juntos.</p>
            <div className="space-y-4 mb-8">
              {['Analizamos tu caso particular', 'Te decimos honestamente si podemos ayudar', 'Propuesta con precio cerrado en 48h'].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center flex-shrink-0"><Check className="w-4 h-4 text-emerald-900" /></div>
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> Sin spam</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> Respuesta en 24h</div>
              <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4" /> Sin compromiso</div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
