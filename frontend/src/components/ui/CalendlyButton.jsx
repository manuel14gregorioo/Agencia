import React from 'react';
import { CALENDLY_URL } from '../../data/constants';

const CalendlyButton = ({ children, className = '', variant = 'primary' }) => {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, '_blank');
    }
  };

  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all hover:scale-105 active:scale-[0.98]";
  const variants = {
    primary: "bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-white/10",
    secondary: "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20",
    cta: "bg-primary-600 text-white hover:bg-primary-700",
  };

  return (
    <button onClick={openCalendly} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default CalendlyButton;
