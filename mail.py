import boto3
from botocore.exceptions import ClientError
from config import config

CHARSET = "UTF-8"

client = boto3.client('ses', config.REGION)

def prepare_message(subject, body):
    return {
        'Body': {
            'Html': {
                'Charset': CHARSET,
                'Data': body,
            },
            'Text': {
                'Charset': CHARSET,
                'Data': body,
            },
        },
        'Subject': {
            'Charset': CHARSET,
            'Data': subject,
        },
    }

def mail(sender, recipient, subject, body):
    try:
        response = client.send_email(
            Destination={ 'ToAddresses': [recipient] },
            Message=prepare_message(subject, body),
            Source=sender,
        )
    except ClientError as e:
        return e.response['Error']['Message']
