import json

def get_userid(event):
    return event['requestContext']['identity']['cognitoAuthenticationProvider'].split(':')[-1]

def formatted_error(error, statusCode=400):
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": True
    }
    return {
        "statusCode": statusCode,
        "headers": headers,
        "body": json.dumps({"error": error})
    }

# This is a workaround for: http://bugs.python.org/issue16535
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return int(obj)
        return super(DecimalEncoder, self).default(obj)
