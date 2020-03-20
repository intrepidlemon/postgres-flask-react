import os
import logging

class Config(object):
    DEVELOPMENT = True
    DEBUG = True
    PRINT_SQL = False
    SECRET = "example secret key"
    MAX_CONTENT_LENGTH = 128 * 1024 * 1024 # 128mb

    LOG_LEVEL = logging.DEBUG

    REGION = "us-east-1"
    S3_URL_EXPIRATION = 7 * 24 * 60 * 60 # 7 days
    S3_BUCKET = "" # TODO get s3 bucket
    S3_LOCATION = 'https://{}.s3.amazonaws.com/'.format(S3_BUCKET)

    RESET_SALT = "recovery-key"
    RESET_MAX_AGE = 24 * 60 * 60 # 24 hours
    CHUNK_SIZE = 64 * 1024 # for hex digest

    DB_HOSTNAME = os.environ.get("DB_HOSTNAME")
    DB_PORT = os.environ.get("DB_PORT")
    DB_NAME = os.environ.get("DB_NAME")
    DB_USERNAME = os.environ.get("DB_USERNAME")
    DB_PASSWORD = os.environ.get("DB_PASSWORD")
    DB_URL = "postgresql://{user}:{password}@{hostname}:{port}/{db}".format(
        user=DB_USERNAME,
        password=DB_PASSWORD,
        hostname=DB_HOSTNAME,
        port=DB_PORT,
        db=DB_NAME,
    )

    SENDER = "admin@intrepidlemon.com" # email "from" field
    URL = "http://localhost:3000"

class Production(Config):
    DEVELOPMENT = False
    DEBUG = False

    LOG_LEVEL = logging.ERROR

    SECRET = os.environ.get("FLASK_SECRET")
    S3_BUCKET = os.environ.get("BUCKET")
    S3_LOCATION = 'https://{}.s3.amazonaws.com/'.format(S3_BUCKET)

config = Config()

if os.environ.get("PRODUCTION"):
    config = Production()
