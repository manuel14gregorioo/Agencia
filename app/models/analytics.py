"""
Analytics Event Model
"""

from datetime import datetime
from app import db


class AnalyticsEvent(db.Model):
    """Modelo para eventos de analytics"""

    __tablename__ = 'analytics_events'

    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(100), nullable=False, index=True)
    event_data = db.Column(db.JSON, nullable=True)
    url = db.Column(db.String(500), nullable=True)
    referrer = db.Column(db.String(500), nullable=True)
    session_id = db.Column(db.String(100), nullable=True, index=True)
    ip_address = db.Column(db.String(45), nullable=True)
    user_agent = db.Column(db.String(500), nullable=True)
    utm_source = db.Column(db.String(100), nullable=True)
    utm_medium = db.Column(db.String(100), nullable=True)
    utm_campaign = db.Column(db.String(100), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, index=True)

    def to_dict(self):
        return {
            'id': self.id,
            'event_name': self.event_name,
            'event_data': self.event_data,
            'timestamp': self.timestamp.isoformat(),
        }


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
