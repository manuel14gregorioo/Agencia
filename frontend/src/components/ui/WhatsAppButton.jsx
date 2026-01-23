import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { ConversionEvents } from '../../utils/analytics';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleClick = () => {
    ConversionEvents.whatsappClick();
  };

  return (
    <a
      href="https://wa.me/34XXXXXXXXX?text=Hola,%20me%20interesa%20un%20proyecto%20de%20desarrollo%20web"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={`flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${isHovered ? 'pr-6' : ''}`}>
        <MessageCircle className="w-6 h-6" />
        <span className={`text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ${isHovered ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}`}>
          ¿Hablamos?
        </span>
      </div>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    </a>
  );
};

export default WhatsAppButton;
