import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Globe, ExternalLink, AlertTriangle, CheckCircle, Copy, ChevronDown, ChevronUp, Search, Shield, Server, RefreshCw } from 'lucide-react';
import { Link } from '../../App';

// Datos de las plataformas
const PLATFORMS = [
  {
    id: 'wordpress-com',
    name: 'WordPress.com',
    icon: '🔵',
    difficulty: 'Fácil',
    time: '5-10 min',
    description: 'Para dominios comprados directamente en WordPress.com (planes Personal, Premium, Business o eCommerce).',
    steps: [
      {
        title: 'Accede a tu panel de WordPress.com',
        detail: 'Inicia sesión en wordpress.com y ve a "Mi sitio" → "Actualizaciones" → "Dominios".',
      },
      {
        title: 'Selecciona tu dominio',
        detail: 'Haz clic en el dominio que quieres transferir. Verás la página de configuración del dominio.',
      },
      {
        title: 'Desactiva el bloqueo de transferencia',
        detail: 'Busca la opción "Bloqueo de transferencia" y desactívala. WordPress te pedirá confirmación.',
      },
      {
        title: 'Obtén el código de autorización (EPP/Auth Code)',
        detail: 'En la misma página del dominio, busca "Código de transferencia" o "Auth Code". Haz clic en "Solicitar código". Lo recibirás por email en unos minutos.',
      },
      {
        title: 'Envíanos el código',
        detail: 'Comparte el código de autorización con nosotros por email o WhatsApp. Con esto podremos iniciar la transferencia del dominio.',
      },
    ],
    warning: 'El dominio debe tener al menos 60 días desde su registro o última transferencia para poder transferirlo (política de ICANN).',
    tip: 'Si tu plan de WordPress.com incluía el dominio gratis el primer año, asegúrate de que no haya renovaciones pendientes antes de transferir.',
  },
  {
    id: 'wordpress-org',
    name: 'WordPress Autoalojado',
    icon: '⚙️',
    difficulty: 'Media',
    time: '10-15 min',
    description: 'Si tu web usa WordPress.org (autoalojado), el dominio está registrado en un proveedor externo (GoDaddy, Namecheap, IONOS, etc.). Identifica primero dónde compraste el dominio.',
    steps: [
      {
        title: 'Identifica tu registrador de dominio',
        detail: 'Busca en tu email confirmaciones de compra del dominio. Los más comunes son GoDaddy, Namecheap, IONOS, OVH o Arsys. Si no lo recuerdas, podemos averiguarlo nosotros con una consulta WHOIS.',
      },
      {
        title: 'Accede al panel de tu registrador',
        detail: 'Entra en la web del registrador donde compraste el dominio e inicia sesión.',
      },
      {
        title: 'Desbloquea el dominio',
        detail: 'Busca la opción de "Bloqueo de dominio", "Domain Lock" o "Transfer Lock" y desactívala.',
      },
      {
        title: 'Solicita el código de autorización',
        detail: 'Busca "Auth Code", "EPP Code" o "Código de transferencia". Cada registrador lo llama de forma diferente. Solicítalo y lo recibirás por email.',
      },
      {
        title: 'Envíanos el código',
        detail: 'Comparte el código con nosotros. Nos encargaremos de todo el proceso de transferencia.',
      },
    ],
    warning: 'No confundas el hosting (donde está alojada la web) con el registrador del dominio (donde compraste el nombre). Pueden ser empresas diferentes.',
    tip: 'Si no sabes dónde está registrado tu dominio, escríbenos y lo averiguamos gratis en 2 minutos.',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: '🛒',
    difficulty: 'Fácil',
    time: '5-10 min',
    description: 'Para dominios comprados directamente a través de Shopify (gestionados por Shopify/Tucows).',
    steps: [
      {
        title: 'Accede al admin de Shopify',
        detail: 'Inicia sesión en tu tienda Shopify y ve a "Configuración" → "Dominios".',
      },
      {
        title: 'Selecciona el dominio a transferir',
        detail: 'Haz clic en el dominio que quieres transferir. Aparecerá la configuración del dominio.',
      },
      {
        title: 'Haz clic en "Transferir dominio"',
        detail: 'Busca el enlace "Transfer domain" o "Transferir dominio desde Shopify". Shopify te guiará por el proceso.',
      },
      {
        title: 'Desbloquea y obtén el código',
        detail: 'Shopify desactivará el bloqueo automáticamente y te mostrará (o enviará por email) el código de autorización EPP.',
      },
      {
        title: 'Envíanos el código',
        detail: 'Comparte el código de autorización con nosotros para completar la transferencia.',
      },
    ],
    warning: 'Si tienes una suscripción activa de Shopify con el dominio incluido, verifica que no se cancele al transferir el dominio.',
    tip: 'Shopify usa Tucows como registrador. Si alguna vez necesitas contactar directamente con el registrador, es Tucows/OpenSRS.',
  },
  {
    id: 'wix',
    name: 'Wix',
    icon: '🎨',
    difficulty: 'Fácil',
    time: '5-10 min',
    description: 'Para dominios comprados a través de Wix (Wix actúa como revendedor de dominios).',
    steps: [
      {
        title: 'Accede a tu cuenta de Wix',
        detail: 'Inicia sesión en wix.com y ve al "Panel de control" de tu sitio.',
      },
      {
        title: 'Ve a la sección de dominios',
        detail: 'Navega a "Configuración" → "Dominios" o directamente a la sección "Dominios" desde el menú lateral.',
      },
      {
        title: 'Haz clic en "Transferir fuera de Wix"',
        detail: 'Junto a tu dominio, haz clic en los tres puntos (⋯) y selecciona "Transferir fuera de Wix" o "Transfer away from Wix".',
      },
      {
        title: 'Confirma y obtén el código',
        detail: 'Wix te pedirá confirmación. Una vez confirmado, recibirás el código de autorización (EPP) por email en los datos de contacto del dominio.',
      },
      {
        title: 'Envíanos el código',
        detail: 'Mándanos el código de autorización que recibiste por email.',
      },
    ],
    warning: 'Si tu dominio fue un regalo con tu plan Premium de Wix, asegúrate de que llevas al menos 60 días con él antes de intentar transferirlo.',
    tip: 'Si no encuentras la opción de transferencia, contacta con el soporte de Wix y pide explícitamente el "EPP/Auth Code" para transferencia saliente.',
  },
  {
    id: 'squarespace',
    name: 'Squarespace',
    icon: '⬛',
    difficulty: 'Fácil',
    time: '5-10 min',
    description: 'Para dominios registrados o transferidos a Squarespace (usa Tucows como registrador subyacente).',
    steps: [
      {
        title: 'Accede a tu panel de Squarespace',
        detail: 'Inicia sesión en squarespace.com y ve a "Configuración" → "Dominios".',
      },
      {
        title: 'Selecciona el dominio',
        detail: 'Haz clic en el dominio que quieres transferir para ver sus ajustes.',
      },
      {
        title: 'Prepara el dominio para transferencia',
        detail: 'Ve a "Avanzado" o "Transfer" y desactiva el bloqueo de transferencia ("Domain Lock").',
      },
      {
        title: 'Solicita el código de transferencia',
        detail: 'En la misma sección, haz clic en "Request Transfer" o "Solicitar transferencia". Recibirás el código de autorización por email.',
      },
      {
        title: 'Envíanos el código',
        detail: 'Comparte el código con nosotros y nos encargamos del resto.',
      },
    ],
    warning: 'Squarespace bloquea transferencias durante los primeros 60 días tras el registro. Si acabas de registrar el dominio, tendrás que esperar.',
    tip: 'Squarespace también permite simplemente cambiar los DNS sin transferir el dominio. Si tienes prisa, podemos usar esa opción mientras se completa la transferencia.',
  },
  {
    id: 'godaddy',
    name: 'GoDaddy',
    icon: '🟢',
    difficulty: 'Fácil',
    time: '5-10 min',
    description: 'GoDaddy es uno de los registradores más populares del mundo. El proceso de transferencia es directo.',
    steps: [
      {
        title: 'Accede a tu cuenta de GoDaddy',
        detail: 'Inicia sesión en godaddy.com y ve a "Mis productos" → "Dominios".',
      },
      {
        title: 'Selecciona el dominio',
        detail: 'Haz clic en "DNS" o "Administrar" junto al dominio que quieres transferir.',
      },
      {
        title: 'Desactiva el bloqueo',
        detail: 'En la configuración del dominio, busca "Domain Lock" o "Bloqueo de dominio" y desactívalo.',
      },
      {
        title: 'Obtén el código de autorización',
        detail: 'Busca "Authorization Code" o "Get Auth Code". GoDaddy te enviará el código al email asociado a tu cuenta.',
      },
      {
        title: 'Envíanos el código',
        detail: 'Reenvíanos el email con el código de autorización o copia y pégalo en un mensaje.',
      },
    ],
    warning: 'GoDaddy a veces ofrece "protección de privacidad" que oculta tus datos de contacto. Esto no impide la transferencia, pero asegúrate de que el email del dominio es correcto para recibir las confirmaciones.',
    tip: 'Si GoDaddy te muestra una alerta sobre la "pérdida de tiempo restante" del registro, no te preocupes: el tiempo se transfiere al nuevo registrador.',
  },
  {
    id: 'ionos',
    name: 'IONOS (1&1)',
    icon: '🔷',
    difficulty: 'Media',
    time: '10-15 min',
    description: 'Para dominios registrados en IONOS (anteriormente 1&1). Muy común entre negocios españoles.',
    steps: [
      {
        title: 'Accede a tu cuenta de IONOS',
        detail: 'Inicia sesión en ionos.es y ve a "Dominios y SSL" en el panel de control.',
      },
      {
        title: 'Selecciona el dominio',
        detail: 'Haz clic en el dominio que quieres transferir. Se abrirá su página de configuración.',
      },
      {
        title: 'Busca la opción de transferencia',
        detail: 'Ve a "Transferencia saliente" o "Transfer out". IONOS puede requerir que desactives la "protección de transferencia" primero.',
      },
      {
        title: 'Solicita el código Auth',
        detail: 'Haz clic en "Solicitar código de autorización". IONOS lo enviará al email del titular del dominio. Puede tardar hasta 24 horas.',
      },
      {
        title: 'Envíanos el código',
        detail: 'Una vez recibas el código por email, compártelo con nosotros.',
      },
    ],
    warning: 'IONOS es conocido por enviar el código de autorización con cierto retraso (hasta 24-48h). Ten paciencia y revisa también la carpeta de spam.',
    tip: 'Si tienes problemas para encontrar la opción, llama al soporte de IONOS (91 136 0000) y pide directamente el "código de transferencia" para tu dominio.',
  },
  {
    id: 'namecheap',
    name: 'Namecheap',
    icon: '🟠',
    difficulty: 'Fácil',
    time: '5 min',
    description: 'Namecheap facilita mucho las transferencias salientes. Proceso muy directo.',
    steps: [
      {
        title: 'Accede a tu cuenta de Namecheap',
        detail: 'Inicia sesión en namecheap.com y ve a "Domain List" en el panel lateral.',
      },
      {
        title: 'Haz clic en "Manage" junto al dominio',
        detail: 'Se abrirá la configuración completa del dominio.',
      },
      {
        title: 'Ve a la pestaña "Sharing & Transfer"',
        detail: 'Aquí encontrarás las opciones de transferencia. Desactiva "Domain Lock" si está activado.',
      },
      {
        title: 'Solicita el Auth Code',
        detail: 'Haz clic en "Auth Code" y luego en el botón para enviarlo. Lo recibirás inmediatamente por email.',
      },
      {
        title: 'Envíanos el código',
        detail: 'Copia el código y envíanoslo. Namecheap es de los más rápidos en este proceso.',
      },
    ],
    warning: null,
    tip: 'Namecheap tiene una interfaz muy clara. Si alguna vez necesitas cambiar solo los DNS sin transferir, puedes hacerlo desde "Advanced DNS" en la misma página.',
  },
];

// Alternativa rápida: cambio de DNS
const DNS_ALTERNATIVE = {
  title: 'Alternativa rápida: Cambio de DNS (sin transferir)',
  description: 'Si necesitas que tu web funcione cuanto antes o no quieres transferir el dominio, existe una opción más rápida: simplemente cambiar los registros DNS para que el dominio apunte a nuestro servidor.',
  steps: [
    'Accede al panel de gestión de tu dominio (en la plataforma donde lo compraste).',
    'Busca la sección "DNS", "Nameservers" o "Zona DNS".',
    'Te enviaremos los registros exactos que debes configurar (normalmente un registro A y/o CNAME).',
    'Introduce los registros que te proporcionemos.',
    'Los cambios se propagan en 24-48 horas (normalmente mucho menos).',
  ],
  pros: [
    'Funciona en horas, no en días',
    'No necesitas código de autorización',
    'El dominio sigue en tu registrador actual',
    'Compatible con todas las plataformas',
  ],
  cons: [
    'Tienes que seguir renovando el dominio en el registrador original',
    'Si cambias de registrador en el futuro, hay que repetir el proceso',
    'Menos control centralizado',
  ],
};

// Componente de tarjeta de plataforma expandible
const PlatformCard = ({ platform }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 overflow-hidden transition-all">
      {/* Header clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-cream-100 dark:hover:bg-noir-800 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{platform.icon}</span>
          <div>
            <h3 className="text-xl font-display font-bold text-noir-900 dark:text-cream-50">
              {platform.name}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className={`text-xs font-bold uppercase px-2 py-0.5 ${
                platform.difficulty === 'Fácil'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
              }`}>
                {platform.difficulty}
              </span>
              <span className="text-xs text-noir-500">{platform.time}</span>
            </div>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-noir-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-noir-500 flex-shrink-0" />
        )}
      </button>

      {/* Contenido expandible */}
      {isOpen && (
        <div className="px-6 pb-6 border-t-2 border-noir-100 dark:border-noir-800">
          <p className="text-noir-600 dark:text-noir-400 mt-4 mb-6">
            {platform.description}
          </p>

          {/* Pasos */}
          <div className="space-y-4 mb-6">
            {platform.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-lime-400 text-noir-900 font-bold flex items-center justify-center text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-noir-900 dark:text-cream-50">
                    {step.title}
                  </h4>
                  <p className="text-sm text-noir-600 dark:text-noir-400 mt-1">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Warning */}
          {platform.warning && (
            <div className="flex gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>Importante:</strong> {platform.warning}
              </p>
            </div>
          )}

          {/* Tip */}
          {platform.tip && (
            <div className="flex gap-3 p-4 bg-lime-50 dark:bg-lime-900/20 border-2 border-lime-300 dark:border-lime-700">
              <CheckCircle className="w-5 h-5 text-lime-600 dark:text-lime-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-lime-800 dark:text-lime-300">
                <strong>Consejo:</strong> {platform.tip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const DomainGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlatforms = PLATFORMS.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-noir-950">
      {/* Header */}
      <header className="bg-noir-900 dark:bg-noir-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-lime-400 border-3 border-lime-400 flex items-center justify-center">
              <Globe className="w-7 h-7 text-noir-900" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-cream-50">
                Transferencia de Dominio
              </h1>
              <p className="text-noir-400 mt-1">Manual para clientes</p>
            </div>
          </div>
          <p className="text-lg text-noir-300 max-w-2xl">
            Sigue los pasos de tu plataforma para desbloquear tu dominio y obtener el
            código de transferencia. Nosotros nos encargamos del resto.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* Introducción */}
        <section className="mb-12 p-8 border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900">
          <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
            ¿Qué necesitamos de ti?
          </h2>
          <p className="text-noir-600 dark:text-noir-400 mb-6">
            Para poder trabajar con tu dominio y configurar tu nueva web, solo necesitamos <strong className="text-noir-900 dark:text-cream-50">una de estas dos cosas</strong>:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 border-3 border-lime-400 bg-lime-50 dark:bg-lime-900/20">
              <div className="flex items-center gap-3 mb-3">
                <RefreshCw className="w-6 h-6 text-lime-600 dark:text-lime-400" />
                <h3 className="font-display font-bold text-noir-900 dark:text-cream-50">
                  Opción A: Transferencia
                </h3>
              </div>
              <p className="text-sm text-noir-600 dark:text-noir-400">
                Nos proporcionas el <strong className="text-noir-900 dark:text-cream-50">código de autorización (EPP/Auth Code)</strong> y trasladamos el dominio a nuestro registrador. Tienes control total y lo gestionamos todo por ti.
              </p>
            </div>
            <div className="p-6 border-3 border-noir-200 dark:border-noir-700 bg-cream-50 dark:bg-noir-800">
              <div className="flex items-center gap-3 mb-3">
                <Server className="w-6 h-6 text-lime-600 dark:text-lime-400" />
                <h3 className="font-display font-bold text-noir-900 dark:text-cream-50">
                  Opción B: Cambio de DNS
                </h3>
              </div>
              <p className="text-sm text-noir-600 dark:text-noir-400">
                Simplemente cambias unos registros DNS en tu panel actual para que el dominio apunte a nuestro servidor. <strong className="text-noir-900 dark:text-cream-50">Más rápido</strong>, sin necesidad de transferir.
              </p>
            </div>
          </div>
        </section>

        {/* Buscador */}
        <section className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-noir-400" />
            <input
              type="text"
              placeholder="Buscar tu plataforma (WordPress, Shopify, Wix...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 text-noir-900 dark:text-cream-50 font-medium placeholder:text-noir-400 focus:border-lime-400 focus:outline-none transition-colors"
            />
          </div>
        </section>

        {/* Plataformas */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-6">
            Guía por plataforma
          </h2>
          <div className="space-y-4">
            {filteredPlatforms.length > 0 ? (
              filteredPlatforms.map((platform) => (
                <PlatformCard key={platform.id} platform={platform} />
              ))
            ) : (
              <div className="p-8 border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 text-center">
                <p className="text-noir-600 dark:text-noir-400 mb-2">
                  No encontramos esa plataforma en la guía.
                </p>
                <p className="text-sm text-noir-500">
                  No te preocupes, escríbenos y te ayudamos con el proceso sea cual sea tu proveedor.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Alternativa DNS */}
        <section className="mb-16">
          <div className="p-8 border-3 border-lime-400 bg-white dark:bg-noir-900">
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-6 h-6 text-lime-600 dark:text-lime-400" />
              <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50">
                {DNS_ALTERNATIVE.title}
              </h2>
            </div>
            <p className="text-noir-600 dark:text-noir-400 mb-6">
              {DNS_ALTERNATIVE.description}
            </p>

            {/* Pasos DNS */}
            <div className="space-y-3 mb-6">
              {DNS_ALTERNATIVE.steps.map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 bg-noir-900 dark:bg-lime-400 text-lime-400 dark:text-noir-900 font-bold flex items-center justify-center text-xs">
                    {idx + 1}
                  </div>
                  <p className="text-noir-600 dark:text-noir-400 text-sm pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* Pros y Cons */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-noir-900 dark:text-cream-50 mb-2">Ventajas</h4>
                <ul className="space-y-1">
                  {DNS_ALTERNATIVE.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-noir-600 dark:text-noir-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-noir-900 dark:text-cream-50 mb-2">Inconvenientes</h4>
                <ul className="space-y-1">
                  {DNS_ALTERNATIVE.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-noir-600 dark:text-noir-400">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-6">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: '¿Qué es un código de autorización (EPP/Auth Code)?',
                a: 'Es una contraseña única que protege tu dominio contra transferencias no autorizadas. Cada dominio tiene uno. Lo necesitamos para poder iniciar la transferencia a nuestro registrador. Puedes obtenerlo desde el panel de tu proveedor actual.',
              },
              {
                q: '¿Perderé mi email si transfiero el dominio?',
                a: 'No. La transferencia del dominio no afecta a tu servicio de email. Si tu email está vinculado al hosting actual (ej: tu@tudominio.com en el hosting de IONOS), te ayudaremos a migrar el email también sin perder ningún mensaje.',
              },
              {
                q: '¿Mi web dejará de funcionar durante la transferencia?',
                a: 'No. Planificamos la transferencia para que no haya interrupción. Primero configuramos todo en el nuevo servidor, luego cambiamos los DNS, y finalmente completamos la transferencia. El proceso es transparente para los visitantes de tu web.',
              },
              {
                q: '¿Cuánto tarda una transferencia de dominio?',
                a: 'El cambio de DNS tarda entre 1-24 horas. La transferencia formal del dominio tarda entre 5-7 días (es un proceso regulado por ICANN). Pero tu web ya estará funcionando con el cambio de DNS mucho antes.',
              },
              {
                q: '¿Tiene algún coste transferir el dominio?',
                a: 'La transferencia en sí suele incluir 1 año de renovación del dominio (entre 10-15€ según la extensión). Nosotros nos encargamos de este coste como parte de nuestro servicio.',
              },
              {
                q: '¿Puedo volver a transferir mi dominio si cambio de opinión?',
                a: 'Sí, siempre. El dominio es tuyo y puedes transferirlo a cualquier registrador en cualquier momento (tras los primeros 60 días después de cada transferencia, por política de ICANN).',
              },
              {
                q: '¿Y si no sé dónde está registrado mi dominio?',
                a: 'No te preocupes. Podemos averiguarlo en segundos con una consulta WHOIS. Solo dinos tu dominio y te decimos exactamente dónde está registrado y qué pasos seguir.',
              },
            ].map((item, idx) => (
              <details key={idx} className="border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 group">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-cream-100 dark:hover:bg-noir-800 transition-colors list-none">
                  <span className="font-bold text-noir-900 dark:text-cream-50 pr-4">
                    {item.q}
                  </span>
                  <ChevronDown className="w-5 h-5 text-noir-500 flex-shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 border-t-2 border-noir-100 dark:border-noir-800">
                  <p className="text-noir-600 dark:text-noir-400 mt-4 text-sm">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 border-3 border-lime-400 bg-lime-50 dark:bg-lime-900/20">
          <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
            ¿Necesitas ayuda con el proceso?
          </h2>
          <p className="text-noir-600 dark:text-noir-400 mb-6">
            Si tienes dudas o prefieres que lo hagamos nosotros, escríbenos. Te guiamos paso a paso por videollamada o lo gestionamos directamente si nos das acceso.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/#contacto"
              className="inline-flex items-center gap-2 bg-noir-900 text-lime-400 px-6 py-4 font-bold border-3 border-noir-900 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal transition-all"
            >
              Contactar
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/34600000000?text=Hola%2C%20necesito%20ayuda%20con%20la%20transferencia%20de%20mi%20dominio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white dark:bg-noir-800 text-noir-900 dark:text-cream-50 px-6 py-4 font-bold border-3 border-noir-200 dark:border-noir-700 hover:border-lime-400 transition-all"
            >
              WhatsApp
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-noir-900 py-8 px-4 text-center">
        <p className="text-noir-500 text-sm">
          &copy; {new Date().getFullYear()} M.G.M Automations. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default DomainGuide;
