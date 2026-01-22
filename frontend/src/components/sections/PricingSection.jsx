import React from 'react';
import { Star, Check, Minus, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import { PLANES_PRICING } from '../../data/constants';
import { scrollToSection } from '../../utils/scroll';

const PricingSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="pricing" className="section-lg bg-gray-900 text-white">
      <div ref={ref} className={`container-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="heading-2 text-white mb-4">Precios transparentes</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Sin letra pequena, sin sorpresas. Precio fijo cerrado antes de empezar.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PLANES_PRICING.map((plan, index) => (
            <div key={plan.nombre} className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${plan.popular ? 'bg-white text-gray-900 ring-2 ring-primary-400' : 'bg-gray-800/50 border border-gray-700/50 hover:border-gray-600'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold"><Star className="w-3.5 h-3.5" /> RECOMENDADO</span>
                </div>
              )}
              <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-gray-900' : 'text-white'}`}>{plan.nombre}</h3>
              <p className={`text-sm mb-4 ${plan.popular ? 'text-gray-600' : 'text-gray-400'}`}>{plan.descripcion}</p>
              <div className="mb-6"><span className={`text-3xl font-bold ${plan.popular ? 'text-gray-900' : 'text-white'}`}>{plan.precio}</span></div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm ${plan.popular ? 'text-gray-600' : 'text-gray-300'}`}>
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-emerald-500' : 'text-emerald-400'}`} />{feature}
                  </li>
                ))}
                {plan.noIncluye.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Minus className="w-5 h-5 mt-0.5 flex-shrink-0" />{feature}
                  </li>
                ))}
              </ul>
              <a href="#contacto" onClick={(e) => scrollToSection(e, '#contacto')} className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-[0.98] ${plan.popular ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}`}>
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">Todos los precios son finales. IVA incluido para particulares, sin IVA para empresas.<br />Pago: 50% al inicio, 50% a la entrega.</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
