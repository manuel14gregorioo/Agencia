import React from 'react';
import { ArrowLeft, Shield, Mail, MapPin } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-noir-950">
      {/* Header */}
      <header className="bg-noir-900 dark:bg-noir-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <a
            href="#/"
            className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </a>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-lime-400 border-3 border-lime-400 flex items-center justify-center">
              <Shield className="w-7 h-7 text-noir-900" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-cream-50">Política de Privacidad</h1>
              <p className="text-noir-400">Última actualización: Enero 2025</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">

          <section className="mb-12 p-8 border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              1. Responsable del Tratamiento
            </h2>
            <div className="space-y-2 text-noir-600 dark:text-noir-400">
              <p><strong className="text-noir-900 dark:text-cream-50">Identidad:</strong> M.G.M Automations</p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-lime-500" />
                <strong className="text-noir-900 dark:text-cream-50">Email:</strong> hola@mgmautomations.es
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-lime-500" />
                <strong className="text-noir-900 dark:text-cream-50">Ubicación:</strong> Madrid, España
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              2. Datos que Recopilamos
            </h2>
            <p className="text-noir-600 dark:text-noir-400 mb-4">
              Recopilamos los siguientes datos personales cuando utilizas nuestros servicios:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-noir-600 dark:text-noir-400">
              <li><strong className="text-noir-900 dark:text-cream-50">Datos de contacto:</strong> nombre, email, teléfono (opcional)</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Datos del proyecto:</strong> descripción de tu proyecto o necesidades</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Datos de navegación:</strong> cookies técnicas y analíticas (con tu consentimiento)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              3. Finalidad del Tratamiento
            </h2>
            <p className="text-noir-600 dark:text-noir-400 mb-4">
              Utilizamos tus datos para:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-noir-600 dark:text-noir-400">
              <li>Responder a tus consultas y solicitudes de presupuesto</li>
              <li>Gestionar la relación comercial y prestación de servicios</li>
              <li>Enviarte información sobre nuestros servicios (solo si lo autorizas)</li>
              <li>Mejorar nuestra web mediante análisis de uso agregado</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              4. Base Legal
            </h2>
            <p className="text-noir-600 dark:text-noir-400">
              El tratamiento de tus datos se basa en:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-noir-600 dark:text-noir-400 mt-4">
              <li><strong className="text-noir-900 dark:text-cream-50">Consentimiento:</strong> para el envío de comunicaciones comerciales</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Ejecución contractual:</strong> para la prestación de nuestros servicios</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Interés legítimo:</strong> para mejorar nuestros servicios</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              5. Conservación de Datos
            </h2>
            <p className="text-noir-600 dark:text-noir-400">
              Conservamos tus datos durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos.
              Los datos de contacto se conservan mientras no solicites su supresión. Los datos de clientes se conservan
              durante la relación comercial y los plazos legales aplicables (generalmente 5 años para obligaciones fiscales).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              6. Tus Derechos
            </h2>
            <p className="text-noir-600 dark:text-noir-400 mb-4">
              Tienes derecho a:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Acceso', desc: 'Conocer qué datos tenemos sobre ti' },
                { title: 'Rectificación', desc: 'Corregir datos inexactos' },
                { title: 'Supresión', desc: 'Solicitar la eliminación de tus datos' },
                { title: 'Oposición', desc: 'Oponerte al tratamiento de tus datos' },
                { title: 'Portabilidad', desc: 'Recibir tus datos en formato estructurado' },
                { title: 'Limitación', desc: 'Limitar el tratamiento en ciertos casos' },
              ].map((right) => (
                <div key={right.title} className="p-4 border-2 border-noir-200 dark:border-noir-700 bg-cream-50 dark:bg-noir-800">
                  <h4 className="font-bold text-noir-900 dark:text-cream-50">{right.title}</h4>
                  <p className="text-sm text-noir-600 dark:text-noir-400">{right.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-noir-600 dark:text-noir-400 mt-4">
              Para ejercer estos derechos, contacta con nosotros en <a href="mailto:hola@mgmautomations.es" className="text-lime-600 dark:text-lime-400 hover:underline">hola@mgmautomations.es</a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              7. Seguridad
            </h2>
            <p className="text-noir-600 dark:text-noir-400">
              Implementamos medidas técnicas y organizativas para proteger tus datos personales contra
              acceso no autorizado, pérdida o destrucción. Utilizamos conexiones cifradas (HTTPS) y
              almacenamos los datos en servidores seguros.
            </p>
          </section>

          <section className="p-8 border-3 border-lime-400 bg-lime-50 dark:bg-lime-900/20">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              8. Contacto
            </h2>
            <p className="text-noir-600 dark:text-noir-400">
              Si tienes dudas sobre esta política de privacidad o sobre el tratamiento de tus datos,
              puedes contactarnos en:
            </p>
            <p className="mt-4">
              <a
                href="mailto:hola@mgmautomations.es"
                className="inline-flex items-center gap-2 bg-noir-900 text-lime-400 px-6 py-3 font-bold border-3 border-noir-900 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all"
              >
                <Mail className="w-5 h-5" />
                hola@mgmautomations.es
              </a>
            </p>
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

export default PrivacyPolicy;
