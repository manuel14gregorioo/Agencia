import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { ConversionEvents } from '../../utils/analytics';

const WHATSAPP_NUMBER = '34654858367';
const WHATSAPP_MESSAGE = 'Hola, me interesa un proyecto de desarrollo web';

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

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      aria-label="Contactar por WhatsApp"
    >
      {/* Brutalist WhatsApp Button */}
      <div className={`
        flex items-center gap-3
        bg-[#25D366] text-white
        border-3 border-noir-900
        transition-all duration-300
        hover:translate-x-[-4px] hover:translate-y-[-4px]
        hover:shadow-brutal
        ${isHovered ? 'pl-5 pr-6 py-4' : 'p-4'}
      `}>
        <MessageCircle className="w-6 h-6" />
        <span className={`
          text-sm font-bold uppercase tracking-wide whitespace-nowrap
          overflow-hidden transition-all duration-300
          ${isHovered ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}
        `}>
          ¿Hablamos?
        </span>
      </div>

      {/* Notification dot */}
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-coral-500 border-2 border-noir-900 animate-pulse" />
    </a>
  );
};

export default WhatsAppButton;
