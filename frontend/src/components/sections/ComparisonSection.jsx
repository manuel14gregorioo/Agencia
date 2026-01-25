import React from 'react';
import { Check, X, Minus } from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import { COMPARATIVA } from '../../data/constants';

const ComparisonSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="section bg-cream-50 dark:bg-noir-900">
      <div ref={ref} className="container-xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-2 bg-noir-900 dark:bg-lime-400 text-cream-50 dark:text-noir-900 text-xs font-bold uppercase tracking-wider mb-6">
            Sin marketing
          </span>
          <h2 className="heading-xl text-noir-900 dark:text-cream-50 mb-4">
            Comparativa <span className="text-lime-500">honesta</span>
          </h2>
          <p className="text-lead max-w-xl mx-auto">
            Solo hechos. Tu decides.
          </p>
        </div>

        {/* Desktop table */}
        <div className={`hidden md:block transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="border-3 border-noir-900 dark:border-noir-700 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-5 px-6 font-display font-bold text-noir-900 dark:text-cream-50 bg-noir-100 dark:bg-noir-800 border-b-3 border-noir-900 dark:border-noir-700">
                    Aspecto
                  </th>
                  <th className="text-center py-5 px-6 font-display font-bold text-noir-500 dark:text-noir-400 bg-noir-100 dark:bg-noir-800 border-b-3 border-l-3 border-noir-900 dark:border-noir-700">
                    Agencias
                  </th>
                  <th className="text-center py-5 px-6 font-display font-bold text-noir-500 dark:text-noir-400 bg-noir-100 dark:bg-noir-800 border-b-3 border-l-3 border-noir-900 dark:border-noir-700">
                    Freelancers
                  </th>
                  <th className="text-center py-5 px-6 font-display font-bold text-noir-900 bg-lime-400 border-b-3 border-l-3 border-noir-900">
                    Nosotros
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVA.map((row, index) => (
                  <tr
                    key={index}
                    className={`${row.destacado ? 'bg-lime-50 dark:bg-lime-900/10' : 'bg-cream-50 dark:bg-noir-900'} ${index < COMPARATIVA.length - 1 ? 'border-b-3 border-noir-200 dark:border-noir-800' : ''}`}
                  >
                    <td className="py-5 px-6 font-semibold text-noir-900 dark:text-cream-50">
                      {row.aspecto}
                    </td>
                    <td className="py-5 px-6 text-center text-noir-500 dark:text-noir-400 border-l-3 border-noir-200 dark:border-noir-800">
                      {row.agencias}
                    </td>
                    <td className="py-5 px-6 text-center text-noir-500 dark:text-noir-400 border-l-3 border-noir-200 dark:border-noir-800">
                      {row.freelancers}
                    </td>
                    <td className={`py-5 px-6 text-center border-l-3 border-noir-900 font-bold ${row.destacado ? 'bg-lime-100 dark:bg-lime-900/20 text-lime-700 dark:text-lime-400' : 'bg-lime-50 dark:bg-lime-900/10 text-noir-900 dark:text-lime-400'}`}>
                      <span className="inline-flex items-center gap-2">
                        {row.destacado && <Check className="w-5 h-5" />}
                        {row.nosotros}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className={`md:hidden space-y-4 stagger-children ${isVisible ? 'visible' : ''}`}>
          {COMPARATIVA.map((row, index) => (
            <div
              key={index}
              className={`border-3 p-5 ${row.destacado ? 'border-lime-400 bg-lime-50 dark:bg-lime-900/20' : 'border-noir-200 dark:border-noir-700 bg-cream-50 dark:bg-noir-900'}`}
            >
              <p className="font-display font-bold text-noir-900 dark:text-cream-50 mb-4">{row.aspecto}</p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-noir-400 mb-1">Agencias</p>
                  <p className="text-noir-600 dark:text-noir-400">{row.agencias}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-noir-400 mb-1">Freelancers</p>
                  <p className="text-noir-600 dark:text-noir-400">{row.freelancers}</p>
                </div>
                <div className="bg-lime-400 dark:bg-lime-400/20 p-2 -m-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-noir-700 dark:text-lime-400 mb-1">Nosotros</p>
                  <p className="font-bold text-noir-900 dark:text-lime-300">{row.nosotros}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
