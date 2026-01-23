/**
 * ============================================
 * VIDEO MODAL COMPONENT
 * ============================================
 * Modal para reproducir video promocional
 */

import React, { useEffect, useRef } from 'react';
import { X, Play } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, videoSrc }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Cerrar video"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Video container */}
      <div
        className="relative max-w-5xl w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          controls
          autoPlay
          playsInline
          className="w-full rounded-2xl shadow-2xl"
          onEnded={onClose}
        >
          Tu navegador no soporta videos HTML5.
        </video>
      </div>
    </div>
  );
};

// Botón para abrir el video
export const VideoPlayButton = ({ onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all hover:scale-105 active:scale-[0.98] group ${className}`}
    aria-label="Ver video promocional"
  >
    <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
      <Play className="w-5 h-5 fill-current" />
    </span>
    Ver Video
  </button>
);

export default VideoModal;
