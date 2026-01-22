import React from 'react';
import { Star, Check } from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import { SERVICIOS, TECNOLOGIAS } from '../../data/constants';

const ServiciosSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="servicios" className="section bg-gray-50 dark:bg-gray-900">
      <div ref={ref} className={`container-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 dark:text-white mb-4">Servicios</h2>
          <p className="lead dark:text-gray-400 max-w-2xl mx-auto">Tres niveles segun lo que necesites. Precio fijo, sin sorpresas.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICIOS.map((servicio, index) => (
            <div key={servicio.id} className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-medium cursor-pointer ${servicio.popular ? 'border-primary-200 dark:border-primary-700 ring-2 ring-primary-100 dark:ring-primary-900' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              {servicio.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold"><Star className="w-3.5 h-3.5" /> MAS POPULAR</span>
                </div>
              )}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${servicio.popular ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                <servicio.icon className={`w-7 h-7 ${servicio.popular ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{servicio.titulo}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[48px]">{servicio.descripcion}</p>
              <ul className="space-y-3 mb-8">
                {servicio.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${servicio.popular ? 'text-primary-500' : 'text-emerald-500'}`} />{feature}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <p className={`text-2xl font-bold ${servicio.popular ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>{servicio.precio}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Precio fijo cerrado</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">Stack tecnologico</p>
          <div className="flex flex-wrap justify-center gap-3">
            {TECNOLOGIAS.map((tech, index) => (
              <span key={index} className={`${tech.color} px-4 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105`}>{tech.nombre}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiciosSection;
