from itsdangerous import URLSafeTimedSerializer

def create_time_serializer(secret):
    return URLSafeTimedSerializer(secret)
