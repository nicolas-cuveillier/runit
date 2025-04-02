require('dotenv').config()

const { S3Client } = require('@aws-sdk/client-s3')

// Define S3 bucjet variables
const bucket = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    },
    region: region
})

module.exports = s3;