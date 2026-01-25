import React from 'react';
import { Tag, Clock, CheckCircle, Code, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import { PROCESO } from '../../data/constants';

const ProcesoSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  const garantias = [
    { icon: Tag, text: 'Precio fijo cerrado antes de empezar' },
    { icon: Clock, text: 'Updates cada 2-3 dias durante desarrollo' },
    { icon: CheckCircle, text: 'Primera ronda de revisiones incluida' },
    { icon: Code, text: 'Codigo documentado - no dependes de nosotros' },
  ];

  return (
    <section id="proceso" className="section-lg bg-cream-50 dark:bg-noir-950">
      <div ref={ref} className="container-xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-2 bg-noir-900 dark:bg-lime-400 text-cream-50 dark:text-noir-900 text-xs font-bold uppercase tracking-wider mb-6">
            Proceso
          </span>
          <h2 className="heading-xl text-noir-900 dark:text-cream-50 mb-4">
            Como <span className="text-lime-500">trabajamos</span>
          </h2>
          <p className="text-lead max-w-xl mx-auto">
            Transparente. Sabes que esperar en cada fase.
          </p>
        </div>

        {/* Process steps */}
        <div className={`relative stagger-children ${isVisible ? 'visible' : ''}`}>
          {/* Connection line - desktop */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-noir-200 dark:bg-noir-800" />

          <div className="grid md:grid-cols-4 gap-8">
            {PROCESO.map((paso, index) => (
              <div key={paso.paso} className="relative">
                {/* Step card */}
                <div className="group relative bg-cream-50 dark:bg-noir-900 border-3 border-noir-900 dark:border-noir-700 p-6 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal dark:hover:shadow-brutal-lime">
                  {/* Step number */}
                  <div className="absolute -top-6 left-6 w-12 h-12 bg-lime-400 border-3 border-noir-900 flex items-center justify-center z-10">
                    <span className="text-xl font-display font-bold text-noir-900">{paso.paso}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 mt-6 mb-4 border-3 border-noir-200 dark:border-noir-700 flex items-center justify-center group-hover:border-lime-400 group-hover:bg-lime-400 transition-all duration-300">
                    <paso.icon className="w-7 h-7 text-noir-600 dark:text-noir-400 group-hover:text-noir-900 transition-colors" />
                  </div>

                  {/* Duration badge */}
                  <span className="inline-block px-3 py-1 bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400 text-xs font-bold uppercase tracking-wider mb-3">
                    {paso.duracion}
                  </span>

                  {/* Content */}
                  <h3 className="text-lg font-display font-bold text-noir-900 dark:text-cream-50 mb-2">
                    {paso.titulo}
                  </h3>
                  <p className="text-noir-600 dark:text-noir-400 text-sm mb-4">
                    {paso.descripcion}
                  </p>

                  {/* Output */}
                  <div className="pt-4 border-t-2 border-noir-200 dark:border-noir-700">
                    <p className="text-xs font-bold uppercase tracking-wider text-noir-400 mb-1">Saldras con</p>
                    <p className="text-sm font-semibold text-lime-600 dark:text-lime-400">{paso.salida}</p>
                  </div>
                </div>

                {/* Arrow to next - desktop */}
                {index < PROCESO.length - 1 && (
                  <div className="hidden md:flex absolute top-24 -right-4 w-8 h-8 bg-cream-50 dark:bg-noir-950 items-center justify-center z-10">
                    <ArrowRight className="w-5 h-5 text-noir-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className={`mt-20 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="border-3 border-lime-400 bg-lime-50 dark:bg-lime-900/20 p-8">
            <h3 className="text-xl font-display font-bold text-noir-900 dark:text-cream-50 mb-8 text-center">
              Garantias incluidas
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {garantias.map((garantia, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-cream-50 dark:bg-noir-900 border-3 border-noir-900 dark:border-noir-700 p-4"
                >
                  <div className="w-12 h-12 bg-lime-400 flex items-center justify-center flex-shrink-0">
                    <garantia.icon className="w-6 h-6 text-noir-900" />
                  </div>
                  <p className="text-sm font-semibold text-noir-900 dark:text-cream-50">
                    {garantia.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcesoSection;
