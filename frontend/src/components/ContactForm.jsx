/**
 * ============================================
 * COMPONENTE: FORMULARIO DE CONTACTO
 * ============================================
 * Formulario con validación en tiempo real
 */

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitContact } from '../utils/api';
import { ConversionEvents, getSavedUTMParams } from '../utils/analytics';

// Validadores
const validators = {
  nombre: (value) => {
    if (!value.trim()) return 'El nombre es obligatorio';
    if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
    return null;
  },
  email: (value) => {
    if (!value.trim()) return 'El email es obligatorio';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Introduce un email válido';
    return null;
  },
  telefono: (value) => {
    if (!value.trim()) return null;
    const phoneRegex = /^[0-9+\s()-]{9,}$/;
    if (!phoneRegex.test(value)) return 'Introduce un teléfono válido';
    return null;
  },
  proyecto: (value) => {
    if (!value.trim()) return 'Cuéntanos algo sobre tu proyecto';
    if (value.trim().length < 20) return 'Por favor, describe tu proyecto con más detalle (mínimo 20 caracteres)';
    return null;
  },
};

// Componente Input con accesibilidad mejorada
const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false
}) => {
  const hasError = touched && error;
  const isValid = touched && !error && value;
  const errorId = `${name}-error`;

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          aria-required={required}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? errorId : undefined}
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-1
            ${hasError
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50'
              : isValid
                ? 'border-green-400 focus:border-green-500 focus:ring-green-200 bg-green-50'
                : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200 bg-white'
            }
          `}
        />
        {touched && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true">
            {hasError ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : isValid ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : null}
          </div>
        )}
      </div>
      {hasError && (
        <p
          id={errorId}
          className="text-sm text-red-500 flex items-center gap-1 mt-1"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
};

// Componente Textarea con accesibilidad mejorada
const FormTextarea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  rows = 4
}) => {
  const hasError = touched && error;
  const isValid = touched && !error && value;
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      <div className="relative">
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={rows}
          required={required}
          aria-required={required}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={`${hintId}${hasError ? ` ${errorId}` : ''}`}
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 resize-none
            focus:outline-none focus:ring-2 focus:ring-offset-1
            ${hasError
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50'
              : isValid
                ? 'border-green-400 focus:border-green-500 focus:ring-green-200 bg-green-50'
                : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200 bg-white'
            }
          `}
        />
        <div
          id={hintId}
          className="absolute right-3 bottom-3 text-xs text-gray-400"
          aria-live="polite"
        >
          {value.length} caracteres
        </div>
      </div>
      {hasError && (
        <p
          id={errorId}
          className="text-sm text-red-500 flex items-center gap-1 mt-1"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
};

// Componente Principal
const ContactForm = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    proyecto: '',
  });

  const [touched, setTouched] = useState({
    nombre: false,
    email: false,
    telefono: false,
    proyecto: false,
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [formStarted, setFormStarted] = useState(false);

  const validateField = (name, value) => {
    const validator = validators[name];
    return validator ? validator(value) : null;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Trackear inicio de formulario
    if (!formStarted && value.length > 0) {
      setFormStarted(true);
      ConversionEvents.contactFormStart();
    }

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      nombre: true,
      email: true,
      telefono: true,
      proyecto: true,
    });

    if (!validateForm()) return;

    setSubmitStatus('loading');

    try {
      // Añadir UTM params al envío
      const utmParams = getSavedUTMParams();
      await submitContact({ ...formData, ...utmParams });
      setSubmitStatus('success');

      // Trackear conversión
      ConversionEvents.contactFormSubmit({
        servicio: formData.servicio_interes,
        ...utmParams,
      });

      setTimeout(() => {
        setFormData({ nombre: '', email: '', telefono: '', proyecto: '' });
        setTouched({ nombre: false, email: false, telefono: false, proyecto: false });
        setErrors({});
        setSubmitStatus('idle');
        setFormStarted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div
        className={`bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          ¡Mensaje enviado!
        </h3>
        <p className="text-green-600">
          Te responderemos en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 ${className}`}
      noValidate
      aria-label="Formulario de contacto"
    >
      <div className="space-y-5">
        <FormInput
          label="Nombre"
          name="nombre"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.nombre}
          touched={touched.nombre}
          required
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          required
        />

        <FormInput
          label="Teléfono"
          name="telefono"
          type="tel"
          placeholder="+34 600 000 000 (opcional)"
          value={formData.telefono}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.telefono}
          touched={touched.telefono}
        />

        <FormTextarea
          label="Cuéntanos tu proyecto"
          name="proyecto"
          placeholder="¿Qué proceso quieres automatizar? ¿Qué problemas tienes actualmente?"
          value={formData.proyecto}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.proyecto}
          touched={touched.proyecto}
          required
          rows={5}
        />

        <button
          type="submit"
          disabled={submitStatus === 'loading'}
          aria-busy={submitStatus === 'loading'}
          aria-describedby="submit-hint"
          className={`
            w-full py-4 px-6 rounded-xl font-semibold text-white
            flex items-center justify-center gap-2
            transition-all duration-300 transform
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
            ${submitStatus === 'loading'
              ? 'bg-primary-400 cursor-not-allowed'
              : submitStatus === 'error'
                ? 'bg-red-500 focus:ring-red-500'
                : 'bg-primary-600 hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98]'
            }
          `}
        >
          {submitStatus === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>Enviando...</span>
            </>
          ) : submitStatus === 'error' ? (
            <>
              <AlertCircle className="w-5 h-5" aria-hidden="true" />
              <span>Error al enviar. Reintentar.</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" aria-hidden="true" />
              <span>Solicitar Consultoría Gratuita</span>
            </>
          )}
        </button>

        <p id="submit-hint" className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
          Respuesta garantizada en menos de 24h
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
