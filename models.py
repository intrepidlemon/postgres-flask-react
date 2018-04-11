import bcrypt
from datetime import datetime
import random

from database import db
from utils import timestamp, hash_file
from s3 import generate_url
from config import config

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)
    email = db.Column(db.String())
    complete_email = db.Column(db.String())
    email_confirmed = db.Column(db.Boolean, default=False)

    _password = db.Column(db.Binary(60))

    images = db.relationship('Image', backref='user', lazy=True)

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

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    ref = db.Column(db.String())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
            nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)
    output = db.Column(db.Float)

    def __init__(self, name, f, user):
        self.name = name
        self.user = user
        self.ref = hash_file(f)

        self.output = Image.analyze(f)

    @property
    def url(self):
        return generate_url(
            config.S3_BUCKET,
            self.ref,
            config.S3_URL_EXPIRATION,
        )

    @property
    def dict(self):
        return {
            "id": self.id,
            "ref": self.ref,
            "name": self.name,
            "url": self.url,
            "created_on": timestamp(self.created_on),
        }

    @staticmethod
    def analyze(f):
        """
            Given a file object, analyze and return value
        """
        return random.uniform(0, 12)
