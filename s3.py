import boto3

from config import config

# be sure to provide credentials through environment variables
# or through one of the methods here: http://boto3.readthedocs.io/en/latest/guide/configuration.html#credentials
s3 = boto3.client("s3")

def upload_file(f,
        filename,
        bucket_name,
        acl="authenticated-read",
        content_type="image/png"
        ):
    f.seek(0)
    s3.upload_fileobj(
	f,
	bucket_name,
	filename,
	ExtraArgs={
	    "ACL": acl,
	    "ContentType": content_type
	}
    )
    return "{}{}".format(config.S3_LOCATION, filename)

def generate_url(bucket_name, key, expires):
    return s3.generate_presigned_url(
        ClientMethod='get_object',
        Params={
            'Bucket': bucket_name,
            'Key': key,
        },
        ExpiresIn=expires,
    )
