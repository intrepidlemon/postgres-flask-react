import bcrypt
from datetime import datetime

from database import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)
    email = db.Column(db.String())
    complete_email = db.Column(db.String())
    email_confirmed = db.Column(db.Boolean, default=False)

    _password = db.Column(db.Binary(60))

    def __init__(self, email, password, complete_email):
        self.email = email
        self.complete_email = complete_email
        self.set_password(password)

    def check_password(self, password):
        password = password.encode('utf-8')
        return bcrypt.checkpw(password, self._password)

    def set_password(self, password):
        password = password.encode('utf-8')
        self._password = bcrypt.hashpw(password, bcrypt.gensalt())

    # flask-login properties
    @property
    def is_active(self):
        return True

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

    @property
    def dict(self):
        return {
            "id": self.id,
            "email": self.complete_email,
            "email_confirmed": self.email_confirmed,
        }
