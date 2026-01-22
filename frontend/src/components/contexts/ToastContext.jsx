import React, { useState, createContext, useContext, useCallback } from 'react';
import { CheckCircle, X } from 'lucide-react';

const ToastContext = createContext();

const ToastContainer = ({ toasts }) => (
  <div className="fixed bottom-24 right-6 z-[100] flex flex-col gap-2">
    {toasts.map(toast => (
      <div
        key={toast.id}
        className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-up ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' :
          toast.type === 'error' ? 'bg-red-500 text-white' :
          'bg-gray-900 text-white'
        }`}
      >
        {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
        {toast.type === 'error' && <X className="w-5 h-5" />}
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    ))}
  </div>
);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

export default ToastContext;
