"""
Lead Model - Leads/Contactos del formulario
"""

from datetime import datetime
from app import db


class Lead(db.Model):
    """Modelo para leads (contactos del formulario)"""

    __tablename__ = 'leads'

    ESTADOS = [
        ('nuevo', 'Nuevo'),
        ('contactado', 'Contactado'),
        ('en_proceso', 'En Proceso'),
        ('propuesta', 'Propuesta Enviada'),
        ('ganado', 'Ganado'),
        ('perdido', 'Perdido'),
        ('descartado', 'Descartado'),
    ]

    FUENTES = [
        ('landing', 'Landing Page'),
        ('referido', 'Referido'),
        ('linkedin', 'LinkedIn'),
        ('google', 'Google'),
        ('otro', 'Otro'),
    ]

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False, index=True)
    telefono = db.Column(db.String(20), nullable=True)
    proyecto = db.Column(db.Text, nullable=False)
    servicio_interes = db.Column(db.String(50), nullable=True)
    estado = db.Column(db.String(20), default='nuevo', index=True)
    fuente = db.Column(db.String(20), default='landing')
    prioridad = db.Column(db.Integer, default=0)
    notas = db.Column(db.Text, nullable=True)
    ip_address = db.Column(db.String(45), nullable=True)
    user_agent = db.Column(db.String(500), nullable=True)
    referrer = db.Column(db.String(500), nullable=True)
    utm_source = db.Column(db.String(100), nullable=True)
    utm_medium = db.Column(db.String(100), nullable=True)
    utm_campaign = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    contacted_at = db.Column(db.DateTime, nullable=True)
    assigned_to_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    assigned_to = db.relationship('User', backref='assigned_leads')

    @property
    def estado_display(self):
        for code, name in self.ESTADOS:
            if code == self.estado:
                return name
        return self.estado

    @property
    def dias_desde_creacion(self):
        return (datetime.utcnow() - self.created_at).days

    def to_dict(self, include_tracking=False):
        data = {
            'id': self.id,
            'nombre': self.nombre,
            'email': self.email,
            'telefono': self.telefono,
            'proyecto': self.proyecto,
            'estado': self.estado,
            'estado_display': self.estado_display,
            'created_at': self.created_at.isoformat(),
        }
        return data

    def __repr__(self):
        return f'<Lead {self.nombre} - {self.email}>'
