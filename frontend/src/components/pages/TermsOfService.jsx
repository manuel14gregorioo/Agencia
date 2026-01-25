import React from 'react';
import { ArrowLeft, FileText, Mail } from 'lucide-react';

const TermsOfService = () => {
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
              <FileText className="w-7 h-7 text-noir-900" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-cream-50">Términos y Condiciones</h1>
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
              Al utilizar los servicios de M.G.M Automations, aceptas estos términos y condiciones.
              Por favor, léelos detenidamente antes de contratar nuestros servicios.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              1. Identificación
            </h2>
            <p className="text-noir-600 dark:text-noir-400">
              <strong className="text-noir-900 dark:text-cream-50">M.G.M Automations</strong> es una empresa de desarrollo web y automatizaciones
              con sede en Madrid, España. Contacto: hola@mgmautomations.es
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              2. Servicios Ofrecidos
            </h2>
            <p className="text-noir-600 dark:text-noir-400 mb-4">
              Ofrecemos los siguientes servicios de desarrollo:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-noir-600 dark:text-noir-400">
              <li><strong className="text-noir-900 dark:text-cream-50">Rediseño Web:</strong> Renovación visual de páginas web existentes</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Automatización:</strong> Chatbots, sistemas de reservas, integraciones</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Plataformas Web:</strong> Landing pages, dashboards, portales de cliente</li>
              <li><strong className="text-noir-900 dark:text-cream-50">SaaS Completo:</strong> Desarrollo de productos digitales completos</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              3. Proceso de Contratación
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-noir-600 dark:text-noir-400">
              <li><strong className="text-noir-900 dark:text-cream-50">Consulta inicial:</strong> Llamada gratuita de 30 minutos para entender tus necesidades</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Propuesta:</strong> En 48 horas recibirás un presupuesto detallado con precio fijo</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Aceptación:</strong> Firma del contrato y pago del 50% inicial</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Desarrollo:</strong> Ejecución del proyecto con actualizaciones cada 2-3 días</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Entrega:</strong> Pago del 50% restante y transferencia del proyecto</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              4. Precios y Pagos
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-noir-600 dark:text-noir-400">
              <li>Todos los precios son finales e incluyen IVA para particulares</li>
              <li>Para empresas, los precios se facturan sin IVA (reverse charge si procede)</li>
              <li><strong className="text-noir-900 dark:text-cream-50">Forma de pago:</strong> 50% al inicio, 50% a la entrega</li>
              <li>Métodos aceptados: transferencia bancaria, Bizum, Stripe</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              5. Revisiones y Modificaciones
            </h2>
            <p className="text-noir-600 dark:text-noir-400 mb-4">
              Cada proyecto incluye:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-noir-600 dark:text-noir-400">
              <li><strong className="text-noir-900 dark:text-cream-50">1 ronda de revisiones</strong> incluida sin coste adicional</li>
              <li>Las revisiones deben solicitarse en los 7 días posteriores a la entrega</li>
              <li>Cambios fuera del alcance acordado se presupuestarán por separado</li>
              <li>Soporte post-entrega: 1 mes incluido para bugs y ajustes menores</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              6. Propiedad Intelectual
            </h2>
            <p className="text-noir-600 dark:text-noir-400 mb-4">
              Una vez completado el pago:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-noir-600 dark:text-noir-400">
              <li>El cliente recibe la propiedad total del código desarrollado</li>
              <li>Se entrega el código fuente completo y documentado</li>
              <li>No hay dependencias ni licencias recurrentes con nosotros</li>
              <li>M.G.M Automations se reserva el derecho de usar el proyecto como referencia (portfolio)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              7. Confidencialidad
            </h2>
            <p className="text-noir-600 dark:text-noir-400">
              Nos comprometemos a mantener la confidencialidad de toda la información compartida durante el proyecto.
              No compartiremos datos sensibles de tu negocio con terceros sin tu consentimiento expreso.
              Si requieres un NDA específico, podemos firmarlo antes de comenzar.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              8. Cancelación
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-noir-600 dark:text-noir-400">
              <li>El cliente puede cancelar antes del inicio del desarrollo con reembolso del 100%</li>
              <li>Una vez iniciado el desarrollo, el pago inicial no es reembolsable</li>
              <li>En caso de cancelación, se entregará el trabajo realizado hasta la fecha</li>
              <li>M.G.M Automations puede cancelar con reembolso completo si el proyecto resulta inviable</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              9. Limitación de Responsabilidad
            </h2>
            <p className="text-noir-600 dark:text-noir-400">
              M.G.M Automations no será responsable de daños indirectos, pérdida de beneficios o datos.
              Nuestra responsabilidad máxima se limita al importe pagado por el cliente por el servicio contratado.
              No nos hacemos responsables de problemas causados por servicios de terceros (hosting, APIs, etc.).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              10. Ley Aplicable
            </h2>
            <p className="text-noir-600 dark:text-noir-400">
              Estos términos se rigen por la legislación española. Para cualquier controversia,
              las partes se someten a los Juzgados y Tribunales de Madrid, renunciando a cualquier otro fuero.
            </p>
          </section>

          <section className="p-8 border-3 border-lime-400 bg-lime-50 dark:bg-lime-900/20">
            <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
              ¿Tienes dudas?
            </h2>
            <p className="text-noir-600 dark:text-noir-400 mb-4">
              Si tienes cualquier pregunta sobre estos términos, estaremos encantados de ayudarte:
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

export default TermsOfService;
