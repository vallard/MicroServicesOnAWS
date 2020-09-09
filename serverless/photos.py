import json, os, time, base64
from datetime import datetime, timedelta
import boto3, uuid
from lib import formatted_error, get_userid, DecimalEncoder, get_file_length
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')
s3 = boto3.resource('s3')

headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": True
}

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
        result = table.get_item(Key={'id': userId})
        #result = table.query(
        #        KeyConditionExpression=Key('id').eq(userId)
        #        )
    except Exception as e: 
        return formatted_error("Table Query Error: "+ str(e))

    if 'Item' not in result:
        result['Item'] = {'photos': []}
        
    response = {
        "statusCode" : 200,
        "headers": headers,
        "body": json.dumps(result['Item'], cls=DecimalEncoder)
            }
    return response

def upload(event, context):
    """
    Upload photo 
    - get user cognito information out of context, then upload. 
    """
    data = json.loads(event['body'])
    if 'name' not in data:
        return formatted_error("Photo name should be sent with request: 'name'")
    
    userId = ""
    table = ""
    try:
       userId = get_userid(event)
    except Exception as e:
        return formatted_error("Could not get user id from request: "+ str(e))
    try: 
        table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
        try: 
            response = table.get_item(Key={'id': userId})
        except ClientError as e: 
            msg = e.response['Error']['Message']
            print(msg)
            return formatted_error(msg)
        else: 
            print('response: ', response)
            if 'Item' in response:
                # Update the photos item with the new photos 
                # insert the new photo, write over the old if it has hte same name.
                current_photos = response['Item']['photos']
                photos = [x for x in current_photos if x['name'] != data['name']]
                photos.append({
                    'name': data['name'],
                    'date': datetime.now().isoformat()
                })
                response = table.update_item(
                    Key={
                        'id': userId,
                    },
                    UpdateExpression="set photos=:p", 
                    ExpressionAttributeValues={
                        ':p': photos
                    },
                    ReturnValues="UPDATED_NEW"
                )
            else: 
                # Insert a new photo and item. 
                response = table.put_item(
                    Item={
                        'id': userId,
                        'photos': [{
                                'id': str(uuid.uuid4()),
                                'name': data['name'],
                                'date': datetime.now().isoformat()
                        }]
                    }
                )
                print("response: ", response)
    except Exception as e: 
        return formatted_error("Error with response: "+ str(e))

    q = table.get_item(Key={'id': userId} )
    response = {
        "statusCode" : 200,
        "headers": headers,
        "body": json.dumps(q['Item'], cls=DecimalEncoder)
    }
    return response


def delete(event, context):
    """
    Delete images
    """
    qp = event['queryStringParameters']
    if 'id' not in qp:
        return formatted_error("Photo name should be sent with request: 'name'")
    photoId = qp['id'] 
    userId = ""
    table = ""
    try:
       userId = get_userid(event)
    except Exception as e:
        return formatted_error("Could not get user id from request: "+ str(e))

    try: 
        table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
        response = table.get_item(Key={'id': userId})
    except ClientError as e: 
        msg = e.response['Error']['Message']
        #print(msg)
        return formatted_error(msg)

    if 'Item' not in response:
        return formatted_error(f"No entry for {userId} in the table.")
    current_photos = response['Item']['photos']
    # remove the photo. 
    photos = [x for x in current_photos if x['id'] != photoId]
    # update the data
    response = table.update_item(
        Key={
            'id': userId,
        },
        UpdateExpression="set photos=:p", 
        ExpressionAttributeValues={
            ':p': photos
        },
        ReturnValues="UPDATED_NEW"
    )
    q = table.get_item(Key={'id': userId} )
    response = {
        "statusCode" : 200,
        "headers": headers,
        "body": json.dumps(q['Item'], cls=DecimalEncoder)
    }
    return response
