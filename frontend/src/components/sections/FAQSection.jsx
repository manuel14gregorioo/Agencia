import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../hooks';
import { FAQS } from '../../data/constants';

const FAQItem = ({ pregunta, respuesta, isOpen, onClick }) => (
  <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
    <button onClick={onClick} className="w-full py-6 flex items-center justify-between text-left hover:text-primary-600 dark:hover:text-primary-400 transition-colors group">
      <span className="font-semibold text-gray-900 dark:text-white pr-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{pregunta}</span>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${isOpen ? 'bg-primary-100 dark:bg-primary-900/30 rotate-180' : 'bg-gray-100 dark:bg-gray-700'}`}>
        <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`} />
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{respuesta}</p>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="faq" className="section bg-white dark:bg-gray-800">
      <div ref={ref} className={`max-w-3xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <h2 className="heading-2 text-gray-900 dark:text-white mb-4">Preguntas frecuentes</h2>
          <p className="lead dark:text-gray-400">Si tu pregunta no esta aqui, escribenos.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 px-6">
          {FAQS.map((faq, index) => (
            <FAQItem key={index} pregunta={faq.pregunta} respuesta={faq.respuesta} isOpen={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? -1 : index)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
