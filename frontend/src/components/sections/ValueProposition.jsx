import React from 'react';
import { Zap, Euro, Headphones } from 'lucide-react';
import { useScrollAnimation } from '../hooks';

const ValueProposition = () => {
  const [ref, isVisible] = useScrollAnimation();
  const pilares = [
    { icon: Zap, titulo: '2 semanas', subtitulo: 'No 3 meses', descripcion: 'Metodologia agil con sprints cortos. Ves avances cada 2-3 dias.', color: 'from-purple-500 to-indigo-600', stat: 'vs 2-4 meses' },
    { icon: Euro, titulo: '3-8k€', subtitulo: 'No 10-25k€', descripcion: 'Precio fijo cerrado antes de empezar. Sin sorpresas ni extras.', color: 'from-emerald-500 to-teal-600', stat: 'vs 10-25k€' },
    { icon: Headphones, titulo: 'Tecnico directo', subtitulo: 'No account manager', descripcion: 'Hablas con quien desarrolla tu proyecto. Sin intermediarios.', color: 'from-orange-500 to-red-600', stat: 'Comunicacion' },
  ];

  return (
    <section className="section bg-white dark:bg-gray-900">
      <div ref={ref} className={`container-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 dark:text-white mb-4">El punto medio que tu negocio necesita</h2>
          <p className="lead dark:text-gray-400 max-w-2xl mx-auto">Calidad de agencia, velocidad de startup, precio justo.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pilares.map((pilar, index) => (
            <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-medium cursor-pointer" style={{ transitionDelay: `${index * 100}ms` }}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pilar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <pilar.icon className="w-7 h-7 text-white" />
              </div>
              <div className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium mb-4">{pilar.stat}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{pilar.titulo}</h3>
              <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-3">{pilar.subtitulo}</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{pilar.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
