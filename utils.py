from itsdangerous import URLSafeTimedSerializer
import datetime

from config import config

def create_time_serializer(secret):
    return URLSafeTimedSerializer(secret)

def filetype(ext, filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() == ext

def hash_file(f):
    f.seek(0)
    sha = hashlib.sha256()
    buf = f.read(config.CHUNK_SIZE)
    while len(buf) > 8:
        sha.update(buf)
        buf = f.read(config.CHUNK_SIZE)
    return sha.hexdigest()

def remove_ext(filename):
    return filename.rsplit(".", 1)[0]

epoch = datetime.datetime.utcfromtimestamp(0)
def timestamp(dt):
    return int((dt - epoch).total_seconds() * 1000)
