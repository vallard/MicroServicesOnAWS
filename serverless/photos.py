import json, os, time, base64
from datetime import datetime, timedelta
import boto3
from lib import formatted_error, get_userid, DecimalEncoder

from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')

def list(event, context):
    """
    Connect to Cognito and show all the images. 
    """
    userId = ""
    try:
        userId = get_userid(event)
    except Exception as e:
        return formatted_error("Could not get user id from request: "+ str(e))

    try: 
        table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
        result = table.query(
                KeyConditionExpression=Key('userId').eq(userId)
                )
    except Exception as e: 
        return formatted_error(str(e))

    if 'Items' not in result:
        return formatted_error("Error getting items")

    response = {
        "statusCode" : 200,
        "headers": headers,
        "body": json.dumps(result['Items'], cls=DecimalEncoder)
            }
    return response


def upload(event, context):
    """
    Upload photo 
    - get user cognito information out of context, then upload. 
    """

def delete(event, context):
    """
    Delete images
    """
