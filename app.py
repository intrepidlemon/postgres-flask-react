from flask import Flask
from flask_security import Security, login_required, \
     SQLAlchemySessionUserDatastore
from flask_migrate import Migrate

from config import config

# Create app
app = Flask(__name__)
app.config['DEBUG'] = config.DEBUG
app.config['SECRET_KEY'] = config.SECRET
app.config["MAX_CONTENT_LENGTH"] = config.MAX_CONTENT_LENGTH
app.config["SQLALCHEMY_DATABASE_URI"] = config.DB_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SQLALCHEMY_ECHO'] = config.PRINT_SQL

from models import User, Role
from database import db

migrate = Migrate(app, db)

user_datastore = SQLAlchemySessionUserDatastore(db.session,
                                                User, Role)
security = Security(app, user_datastore)

@app.route('/')
@login_required
def home():
    return render('Here you go!')

if __name__ == '__main__':
    app.run()


