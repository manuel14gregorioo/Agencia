"""
RefreshToken Model - Tokens de refresco para JWT
"""

from datetime import datetime, timedelta
import secrets

from app import db


class RefreshToken(db.Model):
    """Modelo para tokens de refresco JWT"""

    __tablename__ = 'refresh_tokens'

    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(255), unique=True, nullable=False, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)
    revoked = db.Column(db.Boolean, default=False)
    revoked_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Info del dispositivo/sesión
    user_agent = db.Column(db.String(500), nullable=True)
    ip_address = db.Column(db.String(45), nullable=True)

    user = db.relationship('User', backref=db.backref('refresh_tokens', lazy='dynamic'))

    @classmethod
    def create_token(cls, user_id, expires_days=7, user_agent=None, ip_address=None):
        """Crea un nuevo refresh token"""
        token = secrets.token_urlsafe(64)
        expires_at = datetime.utcnow() + timedelta(days=expires_days)

        refresh_token = cls(
            token=token,
            user_id=user_id,
            expires_at=expires_at,
            user_agent=user_agent[:500] if user_agent else None,
            ip_address=ip_address
        )
        db.session.add(refresh_token)
        db.session.commit()

        return refresh_token

    @classmethod
    def get_valid_token(cls, token):
        """Obtiene un token válido (no expirado y no revocado)"""
        return cls.query.filter(
            cls.token == token,
            cls.revoked == False,
            cls.expires_at > datetime.utcnow()
        ).first()

    @classmethod
    def revoke_all_user_tokens(cls, user_id):
        """Revoca todos los tokens de un usuario"""
        cls.query.filter(
            cls.user_id == user_id,
            cls.revoked == False
        ).update({
            'revoked': True,
            'revoked_at': datetime.utcnow()
        })
        db.session.commit()

    @classmethod
    def cleanup_expired_tokens(cls):
        """Elimina tokens expirados (ejecutar periódicamente)"""
        cls.query.filter(
            cls.expires_at < datetime.utcnow()
        ).delete()
        db.session.commit()

    def revoke(self):
        """Revoca este token"""
        self.revoked = True
        self.revoked_at = datetime.utcnow()
        db.session.commit()

    def is_valid(self):
        """Verifica si el token es válido"""
        return not self.revoked and self.expires_at > datetime.utcnow()

    def __repr__(self):
        return f'<RefreshToken user_id={self.user_id} revoked={self.revoked}>'
