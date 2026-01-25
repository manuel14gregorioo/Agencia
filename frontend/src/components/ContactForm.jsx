/**
 * ============================================
 * COMPONENTE: FORMULARIO DE CONTACTO
 * ============================================
 * Formulario con validacion en tiempo real - Brutalist Design
 */

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkojdwll';

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
    if (!emailRegex.test(value)) return 'Introduce un email valido';
    return null;
  },
  telefono: (value) => {
    if (!value.trim()) return null;
    const phoneRegex = /^[0-9+\s()-]{9,}$/;
    if (!phoneRegex.test(value)) return 'Introduce un telefono valido';
    return null;
  },
  proyecto: (value) => {
    if (!value.trim()) return 'Cuentanos algo sobre tu proyecto';
    if (value.trim().length < 20) return 'Por favor, describe tu proyecto con mas detalle (minimo 20 caracteres)';
    return null;
  },
};

// Componente Input - Brutalist Style
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
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-bold uppercase tracking-wider text-noir-900 dark:text-cream-50">
        {label}
        {required && <span className="text-coral-500 ml-1" aria-hidden="true">*</span>}
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
            w-full px-5 py-4 border-3 transition-all duration-200
            font-medium placeholder:text-noir-400
            focus:outline-none focus:translate-x-[-2px] focus:translate-y-[-2px]
            ${hasError
              ? 'border-coral-500 bg-coral-50 dark:bg-coral-900/20 focus:shadow-brutal-coral'
              : isValid
                ? 'border-lime-500 bg-lime-50 dark:bg-lime-900/20 focus:shadow-brutal-lime'
                : 'border-noir-200 dark:border-noir-700 bg-cream-50 dark:bg-noir-800 focus:border-noir-900 dark:focus:border-lime-400 focus:shadow-brutal-sm dark:focus:shadow-brutal-lime'
            }
            text-noir-900 dark:text-cream-50
          `}
        />
        {touched && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2" aria-hidden="true">
            {hasError ? (
              <AlertCircle className="w-5 h-5 text-coral-500" />
            ) : isValid ? (
              <CheckCircle className="w-5 h-5 text-lime-500" />
            ) : null}
          </div>
        )}
      </div>
      {hasError && (
        <p
          id={errorId}
          className="text-sm text-coral-500 flex items-center gap-2"
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

// Componente Textarea - Brutalist Style
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
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-bold uppercase tracking-wider text-noir-900 dark:text-cream-50">
        {label}
        {required && <span className="text-coral-500 ml-1" aria-hidden="true">*</span>}
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
            w-full px-5 py-4 border-3 transition-all duration-200 resize-none
            font-medium placeholder:text-noir-400
            focus:outline-none focus:translate-x-[-2px] focus:translate-y-[-2px]
            ${hasError
              ? 'border-coral-500 bg-coral-50 dark:bg-coral-900/20 focus:shadow-brutal-coral'
              : isValid
                ? 'border-lime-500 bg-lime-50 dark:bg-lime-900/20 focus:shadow-brutal-lime'
                : 'border-noir-200 dark:border-noir-700 bg-cream-50 dark:bg-noir-800 focus:border-noir-900 dark:focus:border-lime-400 focus:shadow-brutal-sm dark:focus:shadow-brutal-lime'
            }
            text-noir-900 dark:text-cream-50
          `}
        />
        <div
          id={hintId}
          className="absolute right-4 bottom-4 text-xs font-mono text-noir-400"
          aria-live="polite"
        >
          {value.length}/20+
        </div>
      </div>
      {hasError && (
        <p
          id={errorId}
          className="text-sm text-coral-500 flex items-center gap-2"
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

    if (!formStarted && value.length > 0) {
      setFormStarted(true);
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
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono || 'No proporcionado',
          proyecto: formData.proyecto,
          _subject: `Nuevo contacto de ${formData.nombre}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setSubmitStatus('success');

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
        className={`bg-lime-400 border-3 border-noir-900 p-10 text-center ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="w-20 h-20 bg-noir-900 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-lime-400" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-display font-bold text-noir-900 mb-3">
          ¡Mensaje enviado!
        </h3>
        <p className="text-noir-700">
          Te responderemos en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-cream-50 dark:bg-noir-800 border-3 border-noir-900 dark:border-noir-700 p-6 md:p-8 ${className}`}
      noValidate
      aria-label="Formulario de contacto"
    >
      {/* Form header */}
      <div className="mb-8">
        <h3 className="text-xl font-display font-bold text-noir-900 dark:text-cream-50 mb-2">
          Solicitar Consultoria
        </h3>
        <p className="text-sm text-noir-500 dark:text-noir-400">
          Gratuita y sin compromiso
        </p>
      </div>

      <div className="space-y-6">
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
          label="Telefono"
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
          label="Cuentanos tu proyecto"
          name="proyecto"
          placeholder="¿Que proceso quieres automatizar? ¿Que problemas tienes actualmente?"
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
            w-full py-5 px-6 font-bold uppercase tracking-wide
            flex items-center justify-center gap-3
            border-3 transition-all duration-300
            focus:outline-none
            ${submitStatus === 'loading'
              ? 'bg-noir-400 border-noir-400 text-cream-50 cursor-not-allowed'
              : submitStatus === 'error'
                ? 'bg-coral-500 border-coral-500 text-white'
                : 'bg-lime-400 border-noir-900 text-noir-900 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none'
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
              <span>Error. Reintentar.</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" aria-hidden="true" />
              <span>Enviar Mensaje</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </>
          )}
        </button>

        <p id="submit-hint" className="text-center text-sm text-noir-500 dark:text-noir-400 flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4 text-lime-500" aria-hidden="true" />
          Respuesta garantizada en menos de 24h
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
