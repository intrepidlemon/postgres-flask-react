import os
import logging

class Config(object):
    DEBUG = True
    PRINT_SQL = False
    SECRET = "example secret key"
    MAX_CONTENT_LENGTH = 128 * 1024 * 1024 # 128mb

    LOG_LEVEL = logging.DEBUG

    REGION = "us-east-1"
    S3_URL_EXPIRATION = 7 * 24 * 60 * 60 # 7 days
    S3_BUCKET = "example-bucket"

    RESET_SALT = "recovery-key"
    RESET_MAX_AGE = 24 * 60 * 60 # 24 hours

    DB_NAME = "example"
    DB_URL = "postgresql:///{name}".format(
            name=DB_NAME,
        )

    SENDER = "admin@intrepidlemon.com" # email "from" field
    URL = "http://localhost:3000"

class Production(Config):
    DEBUG = False

    DB_HOSTNAME = os.environ.get("RDS_HOSTNAME")
    DB_PORT = os.environ.get("RDS_PORT")
    DB_NAME = os.environ.get("RDS_DB_NAME")
    DB_USERNAME = os.environ.get("RDS_USERNAME")
    DB_PASSWORD = os.environ.get("RDS_PASSWORD")
    DB_URL = "postgresql://{user}:{password}@{hostname}:{port}/{db}".format(
        user=DB_USERNAME,
        password=DB_PASSWORD,
        hostname=DB_HOSTNAME,
        port=DB_PORT,
        db=DB_NAME,
    )

    LOG_LEVEL = logging.ERROR

config = Config()
