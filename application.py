from flask import Flask, request, jsonify
from flask_login import LoginManager, login_required, current_user, login_user, logout_user
from flask_migrate import Migrate

from config import config
from utils import create_time_serializer
from mail import mail
from log import log

# Create app
app = Flask(__name__)
app.config['DEBUG'] = config.DEBUG
app.config['SECRET_KEY'] = config.SECRET
app.config["MAX_CONTENT_LENGTH"] = config.MAX_CONTENT_LENGTH
app.config["SQLALCHEMY_DATABASE_URI"] = config.DB_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SQLALCHEMY_ECHO'] = config.PRINT_SQL

from models import User
from database import db

migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)

## USER MANAGEMENT ##

@app.route('/register', methods=["POST"])
def register():
    credentials = request.get_json()
    # email validation
    complete_email = credentials.get("email", "")
    email = complete_email.lower()
    if "@" not in email:
        return "invalid email", 400
    password = credentials.get("password", "")
    if len(password) <= 6:
        return "password: >5 characters", 400
    # make sure email not already taken
    if User.query.filter_by(email=email).first() is not None:
        return "email already registered", 401
    user = User(email, password, complete_email)
    db.session.add(user)
    db.session.commit()
    # log in the user
    login_user(user, remember=True)
    return jsonify(current_user.dict)

@app.route('/api/login', methods=["POST"])
def login():
    credentials = request.get_json()
    email = credentials.get("email", "").lower()
    if not email:
        return "no email", 400
    # password validation
    password = credentials.get("password", "")
    if not password:
        return "no password", 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return "error", 404
    if not user.check_password(password):
        return "unauthorized", 401
    login_user(user, remember=True)
    return jsonify(current_user.dict)

@app.route('/api/logout', methods=["POST"])
@login_required
def logout():
    logout_user()
    return "success"

@app.route('/api/user')
@login_required
def user():
    return jsonify(current_user.dict)

ts = create_time_serializer(app.config["SECRET_KEY"])
@app.route('/api/reset-password', methods=["POST"])
def reset_password_request():
    json = request.get_json()
    email = json.get("email")
    user = User.query.filter_by(email=email).first()
    if user is None:
        return "no user found", 404
    token = ts.dumps(email, salt=config.RESET_SALT)
    url = "{}/reset-password/{}".format(config.URL, token)
    error = mail(
        config.SENDER,
        email,
        "backref: password reset",
        "reset your password here: {}".format(url),
        )
    if error != None:
        log.error(error)
        return "unable to send reset email", 500
    return "success"

@app.route('/api/reset-password/<token>', methods=["POST"])
def reset_password(token):
    try:
        email = ts.loads(token, salt=config.RESET_SALT, max_age=config.RESET_MAX_AGE)
    except:
        return "invalid token", 400
    user = User.query.filter_by(email=email).first()
    if user is None:
        return "no user found", 404
    json = request.get_json()
    password = json.get("password")
    if len(password) <= 6:
        return "password: >5 characters", 400
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return "success"

@app.route('/')
@login_required
def protected():
    return render('my secrets')

@login_manager.unauthorized_handler
def unauthorized():
    return "unauthorized", 401

if __name__ == '__main__':
    app.run()
