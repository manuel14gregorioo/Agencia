import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import { COMPARATIVA } from '../../data/constants';

const ComparisonSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="section bg-white dark:bg-gray-800">
      <div ref={ref} className={`container-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 dark:text-white mb-4">Comparativa honesta</h2>
          <p className="lead dark:text-gray-400 max-w-2xl mx-auto">Sin marketing, solo hechos.</p>
        </div>

        <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="text-left py-5 px-6 font-semibold text-gray-900 dark:text-white">Aspecto</th>
                <th className="text-center py-5 px-6 font-semibold text-gray-500 dark:text-gray-400">Agencias</th>
                <th className="text-center py-5 px-6 font-semibold text-gray-500 dark:text-gray-400">Freelancers</th>
                <th className="text-center py-5 px-6 font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20">Nosotros</th>
              </tr>
            </thead>
            <tbody>
              {COMPARATIVA.map((row, index) => (
                <tr key={index} className={`border-t border-gray-100 dark:border-gray-700 ${row.destacado ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''}`}>
                  <td className="py-5 px-6 font-medium text-gray-900 dark:text-white">{row.aspecto}</td>
                  <td className="py-5 px-6 text-center text-gray-500 dark:text-gray-400">{row.agencias}</td>
                  <td className="py-5 px-6 text-center text-gray-500 dark:text-gray-400">{row.freelancers}</td>
                  <td className="py-5 px-6 text-center bg-primary-50/50 dark:bg-primary-900/10">
                    <span className={`inline-flex items-center gap-1.5 font-semibold ${row.destacado ? 'text-emerald-600 dark:text-emerald-400' : 'text-primary-600 dark:text-primary-400'}`}>
                      {row.destacado && <CheckCircle className="w-4 h-4" />}{row.nosotros}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {COMPARATIVA.map((row, index) => (
            <div key={index} className={`rounded-xl border p-4 ${row.destacado ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>
              <p className="font-semibold text-gray-900 dark:text-white mb-3">{row.aspecto}</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div><p className="text-gray-400 text-xs mb-1">Agencias</p><p className="text-gray-600 dark:text-gray-400">{row.agencias}</p></div>
                <div><p className="text-gray-400 text-xs mb-1">Freelancers</p><p className="text-gray-600 dark:text-gray-400">{row.freelancers}</p></div>
                <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2 -m-1"><p className="text-primary-600 dark:text-primary-400 text-xs mb-1">Nosotros</p><p className="font-semibold text-primary-700 dark:text-primary-300">{row.nosotros}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
