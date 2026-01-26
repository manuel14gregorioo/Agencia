import React from 'react';
import { Star, Check, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import { SERVICIOS, TECNOLOGIAS } from '../../data/constants';
import { scrollToSection } from '../../utils/scroll';

const ServiciosSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="servicios" className="section bg-noir-900 dark:bg-noir-950 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div ref={ref} className="container-xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-2 bg-lime-400 text-noir-900 text-xs font-bold uppercase tracking-wider mb-6">
            Servicios
          </span>
          <h2 className="heading-xl text-cream-50 mb-4">
            Tres niveles.<br />
            <span className="text-lime-400">Precio fijo.</span>
          </h2>
          <p className="text-lead text-noir-400 max-w-xl mx-auto">
            Sin sorpresas. Eliges lo que necesitas.
          </p>
        </div>

        {/* Services grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto stagger-children ${isVisible ? 'visible' : ''}`}>
          {SERVICIOS.map((servicio, index) => (
            <div
              key={servicio.id}
              className={`group relative p-8 border-3 transition-all duration-300 ${
                servicio.popular
                  ? 'border-lime-400 bg-lime-400'
                  : 'border-noir-700 bg-noir-800/50 hover:border-lime-400'
              } hover:translate-x-[-4px] hover:translate-y-[-4px] ${
                servicio.popular ? 'hover:shadow-brutal-lime' : 'hover:shadow-brutal-lime'
              }`}
            >
              {/* Popular badge */}
              {servicio.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-2 bg-noir-900 text-lime-400 px-4 py-2 text-xs font-bold uppercase tracking-wider border-3 border-noir-900">
                    <Star className="w-4 h-4" />
                    Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 mb-6 border-3 flex items-center justify-center transition-all duration-300 ${
                servicio.popular
                  ? 'border-noir-900 bg-noir-900'
                  : 'border-noir-700 group-hover:border-lime-400 group-hover:bg-lime-400'
              }`}>
                <servicio.icon className={`w-8 h-8 ${
                  servicio.popular
                    ? 'text-lime-400'
                    : 'text-lime-400 group-hover:text-noir-900'
                }`} />
              </div>

              {/* Content */}
              <h3 className={`text-2xl font-display font-bold mb-2 ${
                servicio.popular ? 'text-noir-900' : 'text-cream-50'
              }`}>
                {servicio.titulo}
              </h3>
              <p className={`mb-6 ${
                servicio.popular ? 'text-noir-700' : 'text-noir-400'
              }`}>
                {servicio.descripcion}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {servicio.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm ${
                    servicio.popular ? 'text-noir-700' : 'text-noir-400'
                  }`}>
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      servicio.popular ? 'text-noir-900' : 'text-lime-400'
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className={`pt-6 border-t ${
                servicio.popular ? 'border-noir-300' : 'border-noir-700'
              }`}>
                <p className={`text-3xl font-display font-bold ${
                  servicio.popular ? 'text-noir-900' : 'text-lime-400'
                }`}>
                  {servicio.precio}
                </p>
                <p className={`text-sm mt-1 ${
                  servicio.popular ? 'text-noir-600' : 'text-noir-500'
                }`}>
                  Precio fijo cerrado
                </p>
              </div>

              {/* CTA */}
              <a
                href="#contacto"
                onClick={(e) => scrollToSection(e, '#contacto')}
                className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-bold uppercase tracking-wide border-3 transition-all duration-300 ${
                  servicio.popular
                    ? 'bg-noir-900 text-lime-400 border-noir-900 hover:bg-noir-800'
                    : 'bg-transparent text-cream-50 border-noir-700 hover:border-lime-400 hover:text-lime-400'
                }`}
              >
                Consultar
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className={`mt-20 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-noir-500 mb-8">
            Stack Tecnológico
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {TECNOLOGIAS.map((tech, index) => (
              <span
                key={index}
                className="px-5 py-3 bg-noir-800 text-noir-300 text-sm font-semibold border-2 border-noir-700 hover:border-lime-400 hover:text-lime-400 transition-all duration-300 cursor-default"
              >
                {tech.nombre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiciosSection;
