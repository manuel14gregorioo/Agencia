"""
Email Service - Envío de emails transaccionales
Soporta Flask-Mail (SMTP) y Resend (API)
"""

import os
import requests
from flask import current_app, render_template_string
from flask_mail import Message
from app import mail

# Resend API
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
RESEND_FROM_EMAIL = os.environ.get('RESEND_FROM_EMAIL', 'M.G.M Automations <hola@mgmautomations.es>')


def send_email_resend(to, subject, html_body):
    """Envía email usando Resend API"""
    if not RESEND_API_KEY:
        return False

    try:
        response = requests.post(
            'https://api.resend.com/emails',
            headers={
                'Authorization': f'Bearer {RESEND_API_KEY}',
                'Content-Type': 'application/json'
            },
            json={
                'from': RESEND_FROM_EMAIL,
                'to': [to] if isinstance(to, str) else to,
                'subject': subject,
                'html': html_body
            }
        )
        response.raise_for_status()
        current_app.logger.info(f"Email sent via Resend to {to}")
        return True
    except Exception as e:
        current_app.logger.error(f"Resend error: {e}")
        return False


def send_email_smtp(to, subject, html_body, text_body=None):
    """Envía email usando Flask-Mail (SMTP)"""
    try:
        msg = Message(
            subject=subject,
            recipients=[to] if isinstance(to, str) else to,
            html=html_body,
            body=text_body or html_body
        )
        mail.send(msg)
        current_app.logger.info(f"Email sent via SMTP to {to}")
        return True
    except Exception as e:
        current_app.logger.error(f"SMTP error: {e}")
        return False


def send_email(to, subject, html_body, text_body=None):
    """Envía un email (intenta Resend primero, luego SMTP)"""
    # Intentar Resend primero si está configurado
    if RESEND_API_KEY:
        if send_email_resend(to, subject, html_body):
            return True

    # Fallback a SMTP
    return send_email_smtp(to, subject, html_body, text_body)


def send_lead_notification(lead):
    """Notifica al admin de un nuevo lead"""

    subject = f"🔔 Nuevo lead: {lead.nombre}"

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
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Teléfono:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">{lead.telefono or 'No proporcionado'}</td>
                </tr>
            </table>

            <h3 style="color: #111827; margin-top: 25px;">Descripción del Proyecto</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                <p style="margin: 0; line-height: 1.6; color: #374151;">{lead.proyecto}</p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:{lead.email}?subject=Re: Tu consulta en M.G.M Automations"
                   style="display: inline-block; background: #6366F1; color: white; padding: 12px 30px;
                          text-decoration: none; border-radius: 8px; font-weight: bold;">
                    Responder al Lead
                </a>
            </div>
        </div>

        <div style="background: #111827; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                M.G.M Automations - Panel de Administración
            </p>
        </div>
    </body>
    </html>
    """

    # Enviar a hola@vocap.io como destino principal
    admin_email = current_app.config.get('ADMIN_EMAIL', 'hola@vocap.io')
    return send_email(admin_email, subject, html_body)


def send_lead_confirmation(lead):
    """Envía confirmación al lead"""

    subject = "Hemos recibido tu mensaje - M.G.M Automations"

    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #6366F1, #8B5CF6); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">¡Gracias por contactarnos!</h1>
        </div>

        <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
            <p style="font-size: 18px; color: #111827;">Hola {lead.nombre.split()[0]},</p>

            <p style="color: #374151; line-height: 1.6;">
                Hemos recibido tu mensaje y lo estamos revisando.
                <strong>Te responderemos en menos de 24 horas</strong> (normalmente mucho antes).
            </p>

            <div style="background: #ecfdf5; border-left: 4px solid #10B981; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #065f46;">
                    <strong>Próximos pasos:</strong><br>
                    Revisaremos tu proyecto y te contactaremos para agendar una llamada
                    de 30 minutos donde entenderemos mejor tus necesidades.
                </p>
            </div>

            <p style="color: #374151; line-height: 1.6;">
                Mientras tanto, puedes preparar cualquier información adicional que creas relevante
                sobre tu negocio o el proyecto que tienes en mente.
            </p>

            <p style="color: #374151;">
                Un saludo,<br>
                <strong>El equipo de M.G.M Automations</strong>
            </p>
        </div>

        <div style="background: #111827; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: #9ca3af; margin: 0 0 10px; font-size: 14px;">
                ¿Tienes alguna pregunta urgente?
            </p>
            <a href="mailto:hola@mgmautomations.es"
               style="color: #6366F1; text-decoration: none; font-size: 14px;">
                hola@mgmautomations.es
            </a>
        </div>
    </body>
    </html>
    """

    return send_email(lead.email, subject, html_body)
