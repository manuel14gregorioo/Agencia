"""
Lead Model - Leads/Contactos del formulario
"""

from datetime import datetime
from app import db


class Lead(db.Model):
    """Modelo para leads (contactos del formulario)"""

    __tablename__ = 'leads'

    # Estados posibles
    ESTADOS = [
        ('nuevo', 'Nuevo'),
        ('contactado', 'Contactado'),
        ('en_proceso', 'En Proceso'),
        ('propuesta', 'Propuesta Enviada'),
        ('ganado', 'Ganado'),
        ('perdido', 'Perdido'),
        ('descartado', 'Descartado'),
    ]

    # Fuentes de adquisición
    FUENTES = [
        ('landing', 'Landing Page'),
        ('referido', 'Referido'),
        ('linkedin', 'LinkedIn'),
        ('google', 'Google'),
        ('otro', 'Otro'),
    ]

    id = db.Column(db.Integer, primary_key=True)

    # Datos de contacto
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False, index=True)
    telefono = db.Column(db.String(20), nullable=True)

    # Proyecto
    proyecto = db.Column(db.Text, nullable=False)
    servicio_interes = db.Column(db.String(50), nullable=True)  # automatizacion, web, custom

    # Estado y seguimiento
    estado = db.Column(db.String(20), default='nuevo', index=True)
    fuente = db.Column(db.String(20), default='landing')
    prioridad = db.Column(db.Integer, default=0)  # 0=normal, 1=alta, 2=urgente

    # Notas internas
    notas = db.Column(db.Text, nullable=True)

    # Tracking
    ip_address = db.Column(db.String(45), nullable=True)
    user_agent = db.Column(db.String(500), nullable=True)
    referrer = db.Column(db.String(500), nullable=True)
    utm_source = db.Column(db.String(100), nullable=True)
    utm_medium = db.Column(db.String(100), nullable=True)
    utm_campaign = db.Column(db.String(100), nullable=True)

    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    contacted_at = db.Column(db.DateTime, nullable=True)

    # Relaciones
    assigned_to_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    assigned_to = db.relationship('User', backref='assigned_leads')

    @property
    def estado_display(self):
        """Retorna el nombre legible del estado"""
        for code, name in self.ESTADOS:
            if code == self.estado:
                return name
        return self.estado

    @property
    def dias_desde_creacion(self):
        """Días desde que se creó el lead"""
        return (datetime.utcnow() - self.created_at).days

    @property
    def requiere_seguimiento(self):
        """True si el lead necesita seguimiento (nuevo o más de 2 días sin contacto)"""
        if self.estado == 'nuevo':
            return True
        if self.estado in ['contactado', 'en_proceso'] and not self.contacted_at:
            return True
        if self.contacted_at:
            dias_sin_contacto = (datetime.utcnow() - self.contacted_at).days
            return dias_sin_contacto > 2
        return False

    def marcar_contactado(self):
        """Marca el lead como contactado"""
        self.estado = 'contactado'
        self.contacted_at = datetime.utcnow()
        db.session.commit()

    def to_dict(self, include_tracking=False):
        """Serializa el lead"""
        data = {
            'id': self.id,
            'nombre': self.nombre,
            'email': self.email,
            'telefono': self.telefono,
            'proyecto': self.proyecto,
            'servicio_interes': self.servicio_interes,
            'estado': self.estado,
            'estado_display': self.estado_display,
            'fuente': self.fuente,
            'prioridad': self.prioridad,
            'notas': self.notas,
            'dias_desde_creacion': self.dias_desde_creacion,
            'requiere_seguimiento': self.requiere_seguimiento,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'contacted_at': self.contacted_at.isoformat() if self.contacted_at else None,
            'assigned_to': self.assigned_to.nombre if self.assigned_to else None,
        }

        if include_tracking:
            data.update({
                'ip_address': self.ip_address,
                'user_agent': self.user_agent,
                'referrer': self.referrer,
                'utm_source': self.utm_source,
                'utm_medium': self.utm_medium,
                'utm_campaign': self.utm_campaign,
            })

        return data

    def __repr__(self):
        return f'<Lead {self.nombre} - {self.email}>'
