import React from 'react';
import { ArrowLeft, Cookie, Mail } from 'lucide-react';
import { Link } from '../../App';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-noir-950">
      {/* Header */}
      <header className="bg-noir-900 dark:bg-noir-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-lime-400 border-3 border-lime-400 flex items-center justify-center">
              <Cookie className="w-7 h-7 text-noir-900" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-cream-50">Política de Cookies</h1>
              <p className="text-noir-400">Última actualización: Enero 2025</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">

          <section className="mb-12 p-8 border-3 border-lime-400 bg-lime-50 dark:bg-lime-900/20">
            <p className="text-noir-700 dark:text-noir-300 text-lg">
              Esta web utiliza cookies propias y de terceros para mejorar tu experiencia de navegación.
              A continuación te explicamos qué son las cookies y cuáles utilizamos.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              1. ¿Qué son las Cookies?
            </h2>
            <p className="text-noir-600 dark:text-noir-400">
              Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador.
              Permiten recordar información sobre tu visita, como tu idioma preferido u otras opciones,
              lo que puede facilitar tu próxima visita y hacer que el sitio te resulte más útil.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              2. Tipos de Cookies que Utilizamos
            </h2>

            <div className="space-y-6">
              {/* Cookies Técnicas */}
              <div className="p-6 border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-lime-400 text-noir-900 text-xs font-bold uppercase">Necesarias</span>
                  <h3 className="text-xl font-display font-bold text-noir-900 dark:text-cream-50">Cookies Técnicas</h3>
                </div>
                <p className="text-noir-600 dark:text-noir-400 mb-4">
                  Son esenciales para el funcionamiento de la web. Sin ellas, el sitio no funcionaría correctamente.
                </p>
                <table className="w-full text-sm">
                  <thead className="bg-noir-100 dark:bg-noir-800">
                    <tr>
                      <th className="p-2 text-left text-noir-900 dark:text-cream-50">Nombre</th>
                      <th className="p-2 text-left text-noir-900 dark:text-cream-50">Propósito</th>
                      <th className="p-2 text-left text-noir-900 dark:text-cream-50">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-noir-600 dark:text-noir-400">
                    <tr className="border-b border-noir-200 dark:border-noir-700">
                      <td className="p-2 font-mono">theme</td>
                      <td className="p-2">Guardar preferencia de tema (claro/oscuro)</td>
                      <td className="p-2">1 año</td>
                    </tr>
                    <tr className="border-b border-noir-200 dark:border-noir-700">
                      <td className="p-2 font-mono">cookieConsent</td>
                      <td className="p-2">Recordar tu elección de cookies</td>
                      <td className="p-2">1 año</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Cookies Analíticas */}
              <div className="p-6 border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-coral-500 text-white text-xs font-bold uppercase">Opcionales</span>
                  <h3 className="text-xl font-display font-bold text-noir-900 dark:text-cream-50">Cookies Analíticas</h3>
                </div>
                <p className="text-noir-600 dark:text-noir-400 mb-4">
                  Nos permiten entender cómo interactúas con la web para mejorarla. Solo se activan con tu consentimiento.
                </p>
                <table className="w-full text-sm">
                  <thead className="bg-noir-100 dark:bg-noir-800">
                    <tr>
                      <th className="p-2 text-left text-noir-900 dark:text-cream-50">Nombre</th>
                      <th className="p-2 text-left text-noir-900 dark:text-cream-50">Propósito</th>
                      <th className="p-2 text-left text-noir-900 dark:text-cream-50">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-noir-600 dark:text-noir-400">
                    <tr className="border-b border-noir-200 dark:border-noir-700">
                      <td className="p-2 font-mono">_ga</td>
                      <td className="p-2">Google Analytics - distinguir usuarios</td>
                      <td className="p-2">2 años</td>
                    </tr>
                    <tr className="border-b border-noir-200 dark:border-noir-700">
                      <td className="p-2 font-mono">_ga_*</td>
                      <td className="p-2">Google Analytics - mantener estado de sesión</td>
                      <td className="p-2">2 años</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              3. ¿Cómo Gestionar las Cookies?
            </h2>
            <p className="text-noir-600 dark:text-noir-400 mb-4">
              Puedes gestionar las cookies de varias formas:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-noir-600 dark:text-noir-400">
              <li><strong className="text-noir-900 dark:text-cream-50">Banner de cookies:</strong> Al entrar en la web, puedes aceptar o rechazar las cookies opcionales</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Configuración del navegador:</strong> Puedes configurar tu navegador para bloquear o eliminar cookies</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Herramientas de terceros:</strong> Extensiones como "Cookie AutoDelete" permiten gestión avanzada</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              4. Configuración por Navegador
            </h2>
            <p className="text-noir-600 dark:text-noir-400 mb-4">
              Aquí tienes enlaces a la configuración de cookies de los navegadores más comunes:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias' },
                { name: 'Safari', url: 'https://support.apple.com/es-es/guide/safari/sfri11471/mac' },
                { name: 'Microsoft Edge', url: 'https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
              ].map((browser) => (
                <a
                  key={browser.name}
                  href={browser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border-2 border-noir-200 dark:border-noir-700 bg-cream-50 dark:bg-noir-800 hover:border-lime-400 transition-colors flex items-center justify-between group"
                >
                  <span className="font-semibold text-noir-900 dark:text-cream-50">{browser.name}</span>
                  <span className="text-lime-600 dark:text-lime-400 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              5. Consecuencias de Desactivar Cookies
            </h2>
            <p className="text-noir-600 dark:text-noir-400">
              Si decides bloquear las cookies técnicas, algunas funcionalidades de la web podrían no funcionar correctamente.
              Por ejemplo, no se recordará tu preferencia de tema oscuro/claro. Las cookies analíticas son completamente
              opcionales y no afectan al funcionamiento de la web.
            </p>
          </section>

          <section className="p-8 border-3 border-lime-400 bg-lime-50 dark:bg-lime-900/20">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              ¿Más preguntas?
            </h2>
            <p className="text-noir-600 dark:text-noir-400 mb-4">
              Si tienes cualquier duda sobre nuestra política de cookies:
            </p>
            <a
              href="mailto:hola@mgmautomations.es"
              className="inline-flex items-center gap-2 bg-noir-900 text-lime-400 px-6 py-3 font-bold border-3 border-noir-900 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all"
            >
              <Mail className="w-5 h-5" />
              hola@mgmautomations.es
            </a>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-noir-900 py-8 px-4 text-center">
        <p className="text-noir-500 text-sm">
          © {new Date().getFullYear()} M.G.M Automations. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default CookiePolicy;
