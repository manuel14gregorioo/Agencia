"""
Analytics Event Model
"""

from datetime import datetime
from app import db


class AnalyticsEvent(db.Model):
    """Modelo para eventos de analytics"""

    __tablename__ = 'analytics_events'

    id = db.Column(db.Integer, primary_key=True)

    # Evento
    event_name = db.Column(db.String(100), nullable=False, index=True)
    event_data = db.Column(db.JSON, nullable=True)

    # Contexto
    url = db.Column(db.String(500), nullable=True)
    referrer = db.Column(db.String(500), nullable=True)

    # Tracking
    session_id = db.Column(db.String(100), nullable=True, index=True)
    ip_address = db.Column(db.String(45), nullable=True)
    user_agent = db.Column(db.String(500), nullable=True)

    # UTM
    utm_source = db.Column(db.String(100), nullable=True)
    utm_medium = db.Column(db.String(100), nullable=True)
    utm_campaign = db.Column(db.String(100), nullable=True)

    # Timestamps
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, index=True)

    def to_dict(self):
        return {
            'id': self.id,
            'event_name': self.event_name,
            'event_data': self.event_data,
            'url': self.url,
            'timestamp': self.timestamp.isoformat(),
        }

    def __repr__(self):
        return f'<AnalyticsEvent {self.event_name}>'


class PageView(db.Model):
    """Modelo para tracking de page views"""

    __tablename__ = 'page_views'

    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(500), nullable=False, index=True)
    referrer = db.Column(db.String(500), nullable=True)
    session_id = db.Column(db.String(100), nullable=True)
    ip_address = db.Column(db.String(45), nullable=True)
    user_agent = db.Column(db.String(500), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, index=True)

    def __repr__(self):
        return f'<PageView {self.path}>'
