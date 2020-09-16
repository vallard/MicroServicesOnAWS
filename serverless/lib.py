import json


def get_file_length(filepointer):
    filepointer.seek(0, 2) # go to the end of the file pointer
    file_length = filepointer.tell() # get the length of the file
    filepointer.seek(0, 0) # set the file pointer back to the beginning
    return file_length

#def cognitoId(event):
#    return event['requestContext']['identity']['cognitoIdentityId']

def get_userid(event):
    return event['requestContext']['identity']['cognitoIdentityId']
    #return event['requestContext']['identity']['cognitoAuthenticationProvider'].split(':')[-1]

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


