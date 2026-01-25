import React from 'react';
import { Target, Rocket, Shield, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks';

const ValueProposition = () => {
  const [ref, isVisible] = useScrollAnimation();

  const values = [
    {
      icon: Target,
      title: 'Enfoque claro',
      description: 'Sin reuniones innecesarias. Entendemos tu problema y lo solucionamos.',
      accent: 'lime',
    },
    {
      icon: Rocket,
      title: 'Velocidad real',
      description: '2-3 semanas de desarrollo. No 3 meses esperando por una agencia.',
      accent: 'coral',
    },
    {
      icon: Shield,
      title: 'Sin riesgos',
      description: 'Precio fijo cerrado antes de empezar. Sin sorpresas ni costes ocultos.',
      accent: 'lime',
    },
    {
      icon: TrendingUp,
      title: 'Resultados medibles',
      description: 'Codigo que puedes ver y tocar. Proyectos reales como VOCAP.io.',
      accent: 'coral',
    },
  ];

  return (
    <section className="section bg-noir-900 dark:bg-noir-950 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div ref={ref} className="container-xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 md:mb-24 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-2 bg-lime-400 text-noir-900 text-xs font-bold uppercase tracking-wider mb-6">
            Por que nosotros
          </span>
          <h2 className="heading-xl text-cream-50 mb-6">
            Menos promesas,<br />
            <span className="text-lime-400">mas resultados</span>
          </h2>
          <p className="text-lead text-noir-400 max-w-2xl mx-auto">
            No somos una agencia tradicional que te cobra por horas y alarga los proyectos.
            Somos desarrolladores que entregan.
          </p>
        </div>

        {/* Values grid */}
        <div className={`grid md:grid-cols-2 gap-6 stagger-children ${isVisible ? 'visible' : ''}`}>
          {values.map((value, index) => (
            <div
              key={index}
              className={`group relative p-8 md:p-10 border-3 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] cursor-default ${
                value.accent === 'lime'
                  ? 'border-lime-400 hover:shadow-brutal-lime bg-noir-800/50'
                  : 'border-coral-500 hover:shadow-brutal-coral bg-noir-800/50'
              }`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 mb-6 border-3 border-noir-700 flex items-center justify-center transition-all duration-300 group-hover:border-current ${
                value.accent === 'lime' ? 'group-hover:bg-lime-400' : 'group-hover:bg-coral-500'
              }`}>
                <value.icon className={`w-8 h-8 transition-colors duration-300 ${
                  value.accent === 'lime'
                    ? 'text-lime-400 group-hover:text-noir-900'
                    : 'text-coral-500 group-hover:text-white'
                }`} />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-display font-bold text-cream-50 mb-3">
                {value.title}
              </h3>
              <p className="text-noir-400 leading-relaxed">
                {value.description}
              </p>

              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-6 h-6 transition-all duration-300 group-hover:w-8 group-hover:h-8 ${
                value.accent === 'lime' ? 'bg-lime-400' : 'bg-coral-500'
              }`} />
            </div>
          ))}
        </div>

        {/* Bottom stat */}
        <div className={`mt-16 md:mt-24 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-8 md:gap-12 px-8 py-6 border-3 border-noir-700 bg-noir-800/50">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-display font-bold text-lime-400">2-3</p>
              <p className="text-xs font-bold uppercase tracking-wider text-noir-500 mt-1">Semanas</p>
            </div>
            <div className="w-px h-12 bg-noir-700" />
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-display font-bold text-cream-50">100%</p>
              <p className="text-xs font-bold uppercase tracking-wider text-noir-500 mt-1">Remoto</p>
            </div>
            <div className="w-px h-12 bg-noir-700" />
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-display font-bold text-coral-500">0</p>
              <p className="text-xs font-bold uppercase tracking-wider text-noir-500 mt-1">Sorpresas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
