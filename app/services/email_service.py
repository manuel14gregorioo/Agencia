"""
Email Service - Envío de emails transaccionales
"""

from flask import current_app, render_template_string
from flask_mail import Message
from app import mail


def send_email(to, subject, html_body, text_body=None):
    """Envía un email"""
    try:
        msg = Message(
            subject=subject,
            recipients=[to] if isinstance(to, str) else to,
            html=html_body,
            body=text_body or html_body
        )
        mail.send(msg)
        return True
    except Exception as e:
        current_app.logger.error(f"Error sending email: {e}")
        return False


def send_lead_notification(lead):
    """Notifica al admin de un nuevo lead"""

    subject = f"Nuevo lead: {lead.nombre}"

    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #6366F1, #8B5CF6); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Nuevo Lead Recibido</h1>
        </div>

        <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
            <h2 style="color: #111827; margin-top: 0;">Datos de Contacto</h2>

            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Nombre:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">{lead.nombre}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                        <a href="mailto:{lead.email}" style="color: #6366F1;">{lead.email}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Telefono:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">{lead.telefono or 'No proporcionado'}</td>
                </tr>
            </table>

            <h3 style="color: #111827; margin-top: 25px;">Descripcion del Proyecto</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                <p style="margin: 0; line-height: 1.6; color: #374151;">{lead.proyecto}</p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:{lead.email}?subject=Re: Tu consulta en AgenciaDev"
                   style="display: inline-block; background: #6366F1; color: white; padding: 12px 30px;
                          text-decoration: none; border-radius: 8px; font-weight: bold;">
                    Responder al Lead
                </a>
            </div>
        </div>

        <div style="background: #111827; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                AgenciaDev - Panel de Administracion
            </p>
        </div>
    </body>
    </html>
    """

    admin_email = current_app.config.get('ADMIN_EMAIL', 'admin@agenciadev.es')
    return send_email(admin_email, subject, html_body)


def send_lead_confirmation(lead):
    """Envia confirmacion al lead"""

    subject = "Hemos recibido tu mensaje - AgenciaDev"

    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #6366F1, #8B5CF6); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">Gracias por contactarnos!</h1>
        </div>

        <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
            <p style="font-size: 18px; color: #111827;">Hola {lead.nombre.split()[0]},</p>

            <p style="color: #374151; line-height: 1.6;">
                Hemos recibido tu mensaje y lo estamos revisando.
                <strong>Te responderemos en menos de 24 horas</strong> (normalmente mucho antes).
            </p>

            <div style="background: #ecfdf5; border-left: 4px solid #10B981; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #065f46;">
                    <strong>Proximos pasos:</strong><br>
                    Revisaremos tu proyecto y te contactaremos para agendar una llamada
                    de 30 minutos donde entenderemos mejor tus necesidades.
                </p>
            </div>

            <p style="color: #374151; line-height: 1.6;">
                Mientras tanto, puedes preparar cualquier informacion adicional que creas relevante
                sobre tu negocio o el proyecto que tienes en mente.
            </p>

            <p style="color: #374151;">
                Un saludo,<br>
                <strong>El equipo de AgenciaDev</strong>
            </p>
        </div>

        <div style="background: #111827; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: #9ca3af; margin: 0 0 10px; font-size: 14px;">
                Tienes alguna pregunta urgente?
            </p>
            <a href="mailto:hola@agenciadev.es"
               style="color: #6366F1; text-decoration: none; font-size: 14px;">
                hola@agenciadev.es
            </a>
        </div>
    </body>
    </html>
    """

    return send_email(lead.email, subject, html_body)
