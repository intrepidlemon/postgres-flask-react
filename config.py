import os

class Config(object):
    DEBUG = True
    PRINT_SQL = False
    MAX_CONTENT_LENGTH = 128 * 1024 * 1024 # 128mb
    SECRET = "example secret key"

    REGION = "us-east-1"
    S3_URL_EXPIRATION = 30 * 24 * 60 * 60 # 30 days
    S3_BUCKET = "example-bucket"

    DB_NAME = "example"
    DB_URL = "postgresql:///{name}".format(
            name=DB_NAME,
        )

class Production(Config):
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

config = Config()
