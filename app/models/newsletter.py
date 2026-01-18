"""
Newsletter Subscriber Model
"""

from datetime import datetime
from app import db


class NewsletterSubscriber(db.Model):
    """Modelo para suscriptores del newsletter"""

    __tablename__ = 'newsletter_subscribers'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    nombre = db.Column(db.String(100), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    confirmed = db.Column(db.Boolean, default=False)
    confirmation_token = db.Column(db.String(100), nullable=True)
    frequency = db.Column(db.String(20), default='weekly')
    source = db.Column(db.String(50), default='landing')
    ip_address = db.Column(db.String(45), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    confirmed_at = db.Column(db.DateTime, nullable=True)
    unsubscribed_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
        }

    def __repr__(self):
        return f'<NewsletterSubscriber {self.email}>'
