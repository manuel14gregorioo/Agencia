/**
 * ============================================
 * DEMO SISTEMA DE RESERVAS
 * Para mostrar a clientes potenciales
 * ============================================
 */

import React, { useState } from 'react';

// Configuraciones por sector
const SECTORES = {
  clinica: {
    nombre: 'Clínica Dental Ejemplo',
    color: '#0ea5e9',
    servicios: [
      { id: 1, nombre: 'Limpieza dental', duracion: 30, precio: 45 },
      { id: 2, nombre: 'Revisión general', duracion: 20, precio: 25 },
      { id: 3, nombre: 'Empaste', duracion: 45, precio: 60 },
      { id: 4, nombre: 'Blanqueamiento', duracion: 60, precio: 150 },
    ],
    profesionales: ['Dra. García', 'Dr. Martínez', 'Dra. López'],
  },
  peluqueria: {
    nombre: 'Peluquería Ejemplo',
    color: '#ec4899',
    servicios: [
      { id: 1, nombre: 'Corte mujer', duracion: 45, precio: 25 },
      { id: 2, nombre: 'Corte hombre', duracion: 20, precio: 15 },
      { id: 3, nombre: 'Tinte', duracion: 90, precio: 45 },
      { id: 4, nombre: 'Mechas', duracion: 120, precio: 70 },
      { id: 5, nombre: 'Peinado', duracion: 30, precio: 20 },
    ],
    profesionales: ['María', 'Carmen', 'Lucía'],
  },
  taller: {
    nombre: 'Taller Mecánico Ejemplo',
    color: '#f59e0b',
    servicios: [
      { id: 1, nombre: 'Cambio de aceite', duracion: 30, precio: 45 },
      { id: 2, nombre: 'Revisión pre-ITV', duracion: 60, precio: 35 },
      { id: 3, nombre: 'Cambio pastillas freno', duracion: 45, precio: 80 },
      { id: 4, nombre: 'Diagnosis electrónica', duracion: 30, precio: 25 },
    ],
    profesionales: ['Box 1', 'Box 2', 'Box 3'],
  },
  veterinaria: {
    nombre: 'Clínica Veterinaria Ejemplo',
    color: '#10b981',
    servicios: [
      { id: 1, nombre: 'Consulta general', duracion: 20, precio: 35 },
      { id: 2, nombre: 'Vacunación', duracion: 15, precio: 25 },
      { id: 3, nombre: 'Desparasitación', duracion: 15, precio: 20 },
      { id: 4, nombre: 'Limpieza dental', duracion: 45, precio: 80 },
    ],
    profesionales: ['Dr. Ruiz', 'Dra. Fernández'],
  },
  estetica: {
    nombre: 'Centro Estética Ejemplo',
    color: '#8b5cf6',
    servicios: [
      { id: 1, nombre: 'Limpieza facial', duracion: 60, precio: 45 },
      { id: 2, nombre: 'Manicura', duracion: 30, precio: 18 },
      { id: 3, nombre: 'Pedicura', duracion: 45, precio: 25 },
      { id: 4, nombre: 'Depilación láser', duracion: 30, precio: 50 },
      { id: 5, nombre: 'Masaje relajante', duracion: 60, precio: 55 },
    ],
    profesionales: ['Ana', 'Sofía', 'Elena'],
  },
};

// Generar horarios disponibles
const generarHorarios = () => {
  const horarios = [];
  for (let h = 9; h <= 19; h++) {
    horarios.push(`${h.toString().padStart(2, '0')}:00`);
    if (h < 19) horarios.push(`${h.toString().padStart(2, '0')}:30`);
  }
  return horarios;
};

// Generar días del mes
const generarDias = () => {
  const dias = [];
  const hoy = new Date();
  for (let i = 0; i < 14; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);
    dias.push(fecha);
  }
  return dias;
};

const DemoReservas = () => {
  const [sectorActual, setSectorActual] = useState('clinica');
  const [paso, setPaso] = useState(1);
  const [reserva, setReserva] = useState({
    servicio: null,
    profesional: null,
    fecha: null,
    hora: null,
    nombre: '',
    telefono: '',
    email: '',
  });
  const [confirmado, setConfirmado] = useState(false);
  const [vistaAdmin, setVistaAdmin] = useState(false);

  const sector = SECTORES[sectorActual];
  const horarios = generarHorarios();
  const dias = generarDias();

  const formatearFecha = (fecha) => {
    const opciones = { weekday: 'short', day: 'numeric', month: 'short' };
    return fecha.toLocaleDateString('es-ES', opciones);
  };

  const handleConfirmar = () => {
    setConfirmado(true);
    setPaso(5);
  };

  const resetear = () => {
    setPaso(1);
    setReserva({
      servicio: null,
      profesional: null,
      fecha: null,
      hora: null,
      nombre: '',
      telefono: '',
      email: '',
    });
    setConfirmado(false);
  };

  // Reservas de ejemplo para vista admin
  const reservasEjemplo = [
    { hora: '09:00', cliente: 'María García', servicio: sector.servicios[0]?.nombre, telefono: '612 345 678' },
    { hora: '10:00', cliente: 'Juan López', servicio: sector.servicios[1]?.nombre, telefono: '623 456 789' },
    { hora: '11:30', cliente: 'Ana Martínez', servicio: sector.servicios[0]?.nombre, telefono: '634 567 890' },
    { hora: '12:30', cliente: 'Pedro Sánchez', servicio: sector.servicios[2]?.nombre, telefono: '645 678 901' },
    { hora: '16:00', cliente: 'Laura Fernández', servicio: sector.servicios[1]?.nombre, telefono: '656 789 012' },
    { hora: '17:30', cliente: 'Carlos Ruiz', servicio: sector.servicios[0]?.nombre, telefono: '667 890 123' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header con selector de sector */}
      <div style={{
        backgroundColor: '#1e293b',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Demo para:
          </span>
          <select
            value={sectorActual}
            onChange={(e) => { setSectorActual(e.target.value); resetear(); }}
            style={{
              marginLeft: '12px',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: sector.color,
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            <option value="clinica">Clínica Dental</option>
            <option value="peluqueria">Peluquería</option>
            <option value="taller">Taller Mecánico</option>
            <option value="veterinaria">Veterinaria</option>
            <option value="estetica">Centro Estética</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setVistaAdmin(false)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: !vistaAdmin ? sector.color : '#475569',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Vista Cliente
          </button>
          <button
            onClick={() => setVistaAdmin(true)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: vistaAdmin ? sector.color : '#475569',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Vista Admin
          </button>
        </div>
      </div>

      {/* Vista Cliente */}
      {!vistaAdmin && (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '24px' }}>
          {/* Logo y nombre del negocio */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: sector.color,
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              {sector.nombre.charAt(0)}
            </div>
            <h1 style={{ margin: 0, color: '#1e293b', fontSize: '24px' }}>{sector.nombre}</h1>
            <p style={{ color: '#64748b', margin: '8px 0 0' }}>Sistema de reservas online</p>
          </div>

          {/* Indicador de pasos */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '32px'
          }}>
            {[1, 2, 3, 4].map((p) => (
              <div
                key={p}
                style={{
                  width: '40px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: paso >= p ? sector.color : '#e2e8f0',
                  transition: 'background-color 0.3s'
                }}
              />
            ))}
          </div>

          {/* Paso 1: Seleccionar servicio */}
          {paso === 1 && (
            <div>
              <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '16px' }}>
                ¿Qué servicio necesitas?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sector.servicios.map((servicio) => (
                  <button
                    key={servicio.id}
                    onClick={() => {
                      setReserva({ ...reserva, servicio });
                      setPaso(2);
                    }}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.borderColor = sector.color}
                    onMouseOut={(e) => e.target.style.borderColor = '#e2e8f0'}
                  >
                    <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                      {servicio.nombre}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>
                      {servicio.duracion} min · {servicio.precio}€
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Paso 2: Seleccionar fecha y hora */}
          {paso === 2 && (
            <div>
              <button
                onClick={() => setPaso(1)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: sector.color,
                  cursor: 'pointer',
                  marginBottom: '16px',
                  fontSize: '14px'
                }}
              >
                ← Cambiar servicio
              </button>

              <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '16px' }}>
                Selecciona fecha
              </h2>

              <div style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '8px',
                marginBottom: '24px'
              }}>
                {dias.map((dia, index) => (
                  <button
                    key={index}
                    onClick={() => setReserva({ ...reserva, fecha: dia })}
                    style={{
                      minWidth: '70px',
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: reserva.fecha?.toDateString() === dia.toDateString()
                        ? `2px solid ${sector.color}`
                        : '2px solid #e2e8f0',
                      backgroundColor: reserva.fecha?.toDateString() === dia.toDateString()
                        ? sector.color
                        : 'white',
                      color: reserva.fecha?.toDateString() === dia.toDateString()
                        ? 'white'
                        : '#1e293b',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>
                      {dia.toLocaleDateString('es-ES', { weekday: 'short' })}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>
                      {dia.getDate()}
                    </div>
                  </button>
                ))}
              </div>

              {reserva.fecha && (
                <>
                  <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '16px' }}>
                    Selecciona hora
                  </h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '8px'
                  }}>
                    {horarios.map((hora, index) => {
                      // Simular algunas horas no disponibles
                      const disponible = !['10:30', '12:00', '16:30'].includes(hora);
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            if (disponible) {
                              setReserva({ ...reserva, hora });
                              setPaso(3);
                            }
                          }}
                          disabled={!disponible}
                          style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: disponible ? 'white' : '#f1f5f9',
                            color: disponible ? '#1e293b' : '#94a3b8',
                            cursor: disponible ? 'pointer' : 'not-allowed',
                            fontSize: '14px',
                            textDecoration: disponible ? 'none' : 'line-through'
                          }}
                        >
                          {hora}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Paso 3: Seleccionar profesional */}
          {paso === 3 && (
            <div>
              <button
                onClick={() => setPaso(2)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: sector.color,
                  cursor: 'pointer',
                  marginBottom: '16px',
                  fontSize: '14px'
                }}
              >
                ← Cambiar fecha/hora
              </button>

              <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '16px' }}>
                ¿Con quién prefieres?
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => {
                    setReserva({ ...reserva, profesional: 'Sin preferencia' });
                    setPaso(4);
                  }}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>Sin preferencia</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>Cualquier profesional disponible</div>
                </button>

                {sector.profesionales.map((prof, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setReserva({ ...reserva, profesional: prof });
                      setPaso(4);
                    }}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: sector.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '600'
                    }}>
                      {prof.charAt(0)}
                    </div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{prof}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Paso 4: Datos de contacto */}
          {paso === 4 && !confirmado && (
            <div>
              <button
                onClick={() => setPaso(3)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: sector.color,
                  cursor: 'pointer',
                  marginBottom: '16px',
                  fontSize: '14px'
                }}
              >
                ← Cambiar profesional
              </button>

              <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '16px' }}>
                Tus datos de contacto
              </h2>

              {/* Resumen de la reserva */}
              <div style={{
                backgroundColor: '#f1f5f9',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
                  Tu reserva:
                </div>
                <div style={{ fontWeight: '600', color: '#1e293b' }}>
                  {reserva.servicio?.nombre}
                </div>
                <div style={{ color: '#64748b', fontSize: '14px' }}>
                  {formatearFecha(reserva.fecha)} a las {reserva.hora} · {reserva.profesional}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#475569' }}>
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={reserva.nombre}
                    onChange={(e) => setReserva({ ...reserva, nombre: e.target.value })}
                    placeholder="Tu nombre"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '2px solid #e2e8f0',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#475569' }}>
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={reserva.telefono}
                    onChange={(e) => setReserva({ ...reserva, telefono: e.target.value })}
                    placeholder="612 345 678"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '2px solid #e2e8f0',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#475569' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={reserva.email}
                    onChange={(e) => setReserva({ ...reserva, email: e.target.value })}
                    placeholder="tu@email.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '2px solid #e2e8f0',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  onClick={handleConfirmar}
                  disabled={!reserva.nombre || !reserva.telefono}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: reserva.nombre && reserva.telefono ? sector.color : '#cbd5e1',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: reserva.nombre && reserva.telefono ? 'pointer' : 'not-allowed',
                    marginTop: '8px'
                  }}
                >
                  Confirmar reserva
                </button>
              </div>
            </div>
          )}

          {/* Paso 5: Confirmación */}
          {paso === 5 && confirmado && (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <h2 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '8px' }}>
                ¡Reserva confirmada!
              </h2>
              <p style={{ color: '#64748b', marginBottom: '32px' }}>
                Te hemos enviado un SMS de confirmación
              </p>

              <div style={{
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '16px',
                border: '2px solid #e2e8f0',
                textAlign: 'left',
                marginBottom: '24px'
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>SERVICIO</div>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>{reserva.servicio?.nombre}</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>FECHA Y HORA</div>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>
                    {formatearFecha(reserva.fecha)} a las {reserva.hora}
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>PROFESIONAL</div>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>{reserva.profesional}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>PRECIO</div>
                  <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '20px' }}>
                    {reserva.servicio?.precio}€
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#fef3c7',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '14px', color: '#92400e' }}>
                  📱 Recordatorio automático 24h antes por SMS
                </div>
              </div>

              <button
                onClick={resetear}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: `2px solid ${sector.color}`,
                  backgroundColor: 'white',
                  color: sector.color,
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Hacer otra reserva
              </button>
            </div>
          )}
        </div>
      )}

      {/* Vista Admin */}
      {vistaAdmin && (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{ margin: 0, color: '#1e293b', fontSize: '24px' }}>
                Panel de Administración
              </h1>
              <p style={{ color: '#64748b', margin: '4px 0 0' }}>
                {sector.nombre} · Hoy, {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: '2px solid #e2e8f0',
                backgroundColor: 'white',
                color: '#475569',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                + Nueva cita
              </button>
              <button style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: sector.color,
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                Exportar
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}>
            {[
              { label: 'Citas hoy', valor: '6', icono: '📅' },
              { label: 'Pendientes', valor: '4', icono: '⏳' },
              { label: 'Completadas', valor: '2', icono: '✅' },
              { label: 'Facturado hoy', valor: '185€', icono: '💰' },
            ].map((stat, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icono}</div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>{stat.valor}</div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Lista de citas */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid #e2e8f0',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              Citas de hoy
            </div>

            {reservasEjemplo.map((cita, index) => (
              <div
                key={index}
                style={{
                  padding: '16px 24px',
                  borderBottom: index < reservasEjemplo.length - 1 ? '1px solid #f1f5f9' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    backgroundColor: index < 2 ? '#dcfce7' : '#f1f5f9',
                    color: index < 2 ? '#16a34a' : '#64748b',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    minWidth: '60px',
                    textAlign: 'center'
                  }}>
                    {cita.hora}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{cita.cliente}</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>{cita.servicio}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>{cita.telefono}</span>
                  <button style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: 'white',
                    color: '#64748b',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}>
                    WhatsApp
                  </button>
                  <button style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: index < 2 ? '#f1f5f9' : sector.color,
                    color: index < 2 ? '#64748b' : 'white',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}>
                    {index < 2 ? 'Completada' : 'Confirmar'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje de demo */}
          <div style={{
            marginTop: '32px',
            padding: '20px',
            backgroundColor: '#eff6ff',
            borderRadius: '12px',
            border: '1px solid #bfdbfe',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '16px', color: '#1e40af', fontWeight: '600', marginBottom: '8px' }}>
              🎯 Esto es una demo
            </div>
            <div style={{ fontSize: '14px', color: '#3b82f6' }}>
              El sistema real incluye: notificaciones SMS automáticas, integración con Google Calendar,
              historial de clientes, estadísticas avanzadas y mucho más.
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '24px',
        color: '#94a3b8',
        fontSize: '14px'
      }}>
        Demo creada por <strong style={{ color: '#64748b' }}>Agencia Dev</strong> ·
        <span style={{ color: sector.color }}> ¿Quieres uno así para tu negocio?</span>
      </div>
    </div>
  );
};

export default DemoReservas;
