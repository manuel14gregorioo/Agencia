import React from 'react';
import { Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks';

const TestimonialSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-lime-400 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-noir-900/10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-noir-900/10 translate-x-1/2 translate-y-1/2" />

      <div
        ref={ref}
        className={`container-lg mx-auto px-4 md:px-8 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Quote icon */}
        <div className="w-16 h-16 mx-auto mb-8 bg-noir-900 flex items-center justify-center">
          <Quote className="w-8 h-8 text-lime-400" />
        </div>

        {/* Quote text */}
        <blockquote className="max-w-4xl mx-auto mb-10">
          <p className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-noir-900 leading-tight">
            "Desarrollamos VOCAP.io en 3 semanas desde cero hasta producción.
            Autenticación, pagos con Stripe, procesamiento con OpenAI, dashboard completo.
            <span className="relative inline-block mx-2">
              Ahora mismo tiene usuarios reales pagando suscripciones.
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none">
                <path d="M2 6C80 2 220 2 298 6" stroke="#0A0A0B" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
            Eso es lo que podemos hacer por tu negocio."
          </p>
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-center gap-4">
          <div className="w-14 h-14 bg-noir-900 border-3 border-noir-900 flex items-center justify-center">
            <span className="text-xl font-display font-bold text-lime-400">M</span>
          </div>
          <div className="text-left">
            <p className="font-display font-bold text-noir-900">Manuel Gregorio</p>
            <p className="text-sm text-noir-700">Founder @ M.G.M Automations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
