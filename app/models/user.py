"""
User Model - Administradores del sistema
"""

from datetime import datetime
from flask_login import UserMixin
import bcrypt

from app import db


class User(UserMixin, db.Model):
    """Modelo para usuarios administradores"""

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    last_login = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def set_password(self, password):
        """Hash y guarda la contraseña"""
        self.password_hash = bcrypt.hashpw(
            password.encode('utf-8'),
            bcrypt.gensalt()
        ).decode('utf-8')

    def check_password(self, password):
        """Verifica la contraseña"""
        return bcrypt.checkpw(
            password.encode('utf-8'),
            self.password_hash.encode('utf-8')
        )

    def update_last_login(self):
        """Actualiza la fecha del último login"""
        self.last_login = datetime.utcnow()
        db.session.commit()

    def to_dict(self):
        """Serializa el usuario (sin datos sensibles)"""
        return {
            'id': self.id,
            'email': self.email,
            'nombre': self.nombre,
            'is_admin': self.is_admin,
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'created_at': self.created_at.isoformat()
        }

    def __repr__(self):
        return f'<User {self.email}>'
