import React from 'react';
import { Star, Check, Minus, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import { PLANES_PRICING } from '../../data/constants';
import { scrollToSection } from '../../utils/scroll';

const PricingSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="pricing" className="section-lg bg-noir-900 dark:bg-noir-950 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div ref={ref} className="container-xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-2 bg-lime-400 text-noir-900 text-xs font-bold uppercase tracking-wider mb-6">
            Precios
          </span>
          <h2 className="heading-xl text-cream-50 mb-4">
            Transparentes.<br />
            <span className="text-lime-400">Sin letra pequena.</span>
          </h2>
          <p className="text-lead text-noir-400 max-w-xl mx-auto">
            Precio fijo cerrado antes de empezar. Sin sorpresas ni extras.
          </p>
        </div>

        {/* Pricing cards */}
        <div className={`grid md:grid-cols-3 gap-6 lg:gap-8 stagger-children ${isVisible ? 'visible' : ''}`}>
          {PLANES_PRICING.map((plan, index) => (
            <div
              key={plan.nombre}
              className={`group relative p-8 border-3 transition-all duration-300 ${
                plan.popular
                  ? 'border-lime-400 bg-cream-50 dark:bg-cream-50'
                  : 'border-noir-700 bg-noir-800/50 hover:border-lime-400'
              } hover:translate-x-[-4px] hover:translate-y-[-4px] ${
                plan.popular ? 'hover:shadow-brutal-lime' : 'hover:shadow-brutal-lime'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-2 bg-coral-500 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider border-3 border-noir-900">
                    <Star className="w-4 h-4" />
                    Recomendado
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className={`text-2xl font-display font-bold mb-2 ${
                plan.popular ? 'text-noir-900' : 'text-cream-50'
              }`}>
                {plan.nombre}
              </h3>
              <p className={`text-sm mb-6 ${
                plan.popular ? 'text-noir-600' : 'text-noir-400'
              }`}>
                {plan.descripcion}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className={`text-4xl font-display font-bold ${
                  plan.popular ? 'text-noir-900' : 'text-lime-400'
                }`}>
                  {plan.precio}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm ${
                    plan.popular ? 'text-noir-700' : 'text-noir-300'
                  }`}>
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      plan.popular ? 'text-lime-600' : 'text-lime-400'
                    }`} />
                    {feature}
                  </li>
                ))}
                {plan.noIncluye.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm ${
                    plan.popular ? 'text-noir-400' : 'text-noir-500'
                  }`}>
                    <Minus className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contacto"
                onClick={(e) => scrollToSection(e, '#contacto')}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-bold uppercase tracking-wide border-3 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-noir-900 text-cream-50 border-noir-900 hover:bg-noir-800'
                    : 'bg-lime-400 text-noir-900 border-lime-400 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lime'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Payment terms */}
        <div className={`mt-12 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-noir-400 text-sm">
            Todos los precios son finales. IVA incluido para particulares, sin IVA para empresas.
          </p>
          <p className="text-noir-500 text-sm mt-2">
            Pago: <strong className="text-cream-50">50% al inicio</strong>, <strong className="text-cream-50">50% a la entrega</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
