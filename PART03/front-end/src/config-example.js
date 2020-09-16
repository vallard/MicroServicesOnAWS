const cognitoSettings = {
  REGION: "us-west-2",
  USER_POOL_ID: "YOUR_POOL",
  APP_CLIENT_ID: "YOUR_APP_CLIENT_ID",
  IDENTITY_POOL_ID: "IDENTITY_POOL_ID",
}

const dev = {
  cognito: cognitoSettings,
  apiGateway: {
    REGION: "us-west-2",
    URL: "YOUR_DEV_API_GATEWAY"
  },
  s3: {
    BUCKET: "DEV_PHOTO_S3_BUCKET",
    REGION: "us-west-2",
  }
}

const prod =  {
  cognito: cognitoSettings,
  apiGateway: {
    REGION: "us-west-2",
    URL: "PROD_API_GATEWAY",
  },
  s3: {
    BUCKET: "PROD_PHOTO_S3_BUCKET",
    REGION: "us-west-2",
  }
}

export const APINAME="photos"

export default process.env.NODE_ENV === "development" ? dev : prod;
