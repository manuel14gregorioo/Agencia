import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import { FAQS } from '../../data/constants';

const FAQItem = ({ pregunta, respuesta, isOpen, onClick, index }) => (
  <div className={`border-3 transition-all duration-300 ${isOpen ? 'border-lime-400 bg-lime-50 dark:bg-lime-900/20' : 'border-noir-200 dark:border-noir-700 bg-cream-50 dark:bg-noir-900 hover:border-lime-400'}`}>
    <button
      onClick={onClick}
      className="w-full p-6 flex items-center justify-between text-left group"
      aria-expanded={isOpen}
    >
      <span className="flex items-center gap-4">
        <span className={`w-10 h-10 flex items-center justify-center border-3 font-display font-bold text-sm transition-all duration-300 ${isOpen ? 'bg-lime-400 border-lime-400 text-noir-900' : 'bg-cream-50 dark:bg-noir-900 border-noir-200 dark:border-noir-700 text-noir-600 dark:text-noir-400 group-hover:border-lime-400'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={`font-display font-bold transition-colors ${isOpen ? 'text-noir-900 dark:text-noir-900' : 'text-noir-900 dark:text-cream-50'}`}>
          {pregunta}
        </span>
      </span>
      <div className={`w-10 h-10 flex items-center justify-center border-3 transition-all duration-300 flex-shrink-0 ml-4 ${isOpen ? 'bg-noir-900 border-noir-900 rotate-0' : 'bg-cream-50 dark:bg-noir-900 border-noir-200 dark:border-noir-700 group-hover:border-lime-400'}`}>
        {isOpen ? (
          <Minus className="w-5 h-5 text-lime-400" />
        ) : (
          <Plus className={`w-5 h-5 text-noir-600 dark:text-noir-400 group-hover:text-lime-500`} />
        )}
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
      <div className="px-6 pb-6 pl-20">
        <p className={`leading-relaxed ${isOpen ? 'text-noir-700 dark:text-noir-700' : 'text-noir-600 dark:text-noir-400'}`}>
          {respuesta}
        </p>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="faq" className="section bg-cream-50 dark:bg-noir-950">
      <div ref={ref} className={`max-w-4xl mx-auto px-4 md:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-noir-900 dark:bg-lime-400 text-cream-50 dark:text-noir-900 text-xs font-bold uppercase tracking-wider mb-6">
            FAQ
          </span>
          <h2 className="heading-xl text-noir-900 dark:text-cream-50 mb-4">
            Preguntas <span className="text-lime-500">frecuentes</span>
          </h2>
          <p className="text-lead max-w-xl mx-auto">
            Si tu pregunta no está aquí, escríbenos.
          </p>
        </div>

        {/* FAQ list */}
        <div className={`space-y-4 stagger-children ${isVisible ? 'visible' : ''}`}>
          {FAQS.map((faq, index) => (
            <FAQItem
              key={index}
              pregunta={faq.pregunta}
              respuesta={faq.respuesta}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
