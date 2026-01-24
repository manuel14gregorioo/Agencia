import React from 'react';
import { Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks';

const TestimonialSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="py-16 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-800">
      <div ref={ref} className={`max-w-4xl mx-auto px-4 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Quote className="w-12 h-12 text-primary-300 dark:text-primary-600 mx-auto mb-6" />
        <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
          "Desarrollamos VOCAP.io en 3 semanas desde cero hasta produccion. Autenticacion, pagos con Stripe, procesamiento con OpenAI, dashboard completo. Ahora mismo tiene usuarios reales pagando suscripciones. Eso es lo que podemos hacer por tu negocio."
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">M</div>
          <div className="text-left">
            <p className="font-semibold text-gray-900 dark:text-white">Manuel Gregorio</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Founder @ M.G.M Automations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
