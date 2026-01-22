import React from 'react';
import { Tag, Clock, CheckCircle, Code } from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import { PROCESO } from '../../data/constants';

const ProcesoSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="proceso" className="section-lg bg-white dark:bg-gray-800">
      <div ref={ref} className={`container-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 dark:text-white mb-4">Como trabajamos</h2>
          <p className="lead dark:text-gray-400 max-w-2xl mx-auto">Proceso transparente. Sabes que esperar en cada fase.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {PROCESO.map((paso, index) => (
            <div key={paso.paso} className="relative">
              {index < PROCESO.length - 1 && <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-200 dark:from-primary-700 to-primary-100 dark:to-primary-800" />}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-medium transition-all duration-300 text-center group cursor-pointer">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-xl font-bold text-white">{paso.paso}</span>
                </div>
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-4 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-colors">
                  <paso.icon className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </div>
                <span className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">{paso.duracion}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{paso.titulo}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{paso.descripcion}</p>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Saldras con</p>
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400">{paso.salida}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-2xl p-8 border border-primary-100 dark:border-gray-600">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Garantias incluidas</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Tag, text: 'Precio fijo cerrado antes de empezar' },
              { icon: Clock, text: 'Updates cada 2-3 dias durante desarrollo' },
              { icon: CheckCircle, text: 'Primera ronda de revisiones incluida' },
              { icon: Code, text: 'Codigo documentado - no dependes de nosotros' },
            ].map((garantia, index) => (
              <div key={index} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 border border-primary-100 dark:border-gray-600">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <garantia.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{garantia.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcesoSection;
