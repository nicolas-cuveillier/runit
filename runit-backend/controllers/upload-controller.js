require('dotenv').config()
const s3 = require('../database/s3')
const crypto = require('crypto')
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

exports.uploadImage = async (req, res) => {
    const file = req.file;
    const { destination } = req.body;

    if (!destination || !["profil", "logo", "cover"].includes(destination)) {
        return res.status(400).send({ message: 'Invalid destination' })
    }

    try {
        const imageName = `${destination}/` + randomImageName()
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imageName,
            Body: file.buffer,
            ContentType: file.mimetype
        })
        await s3.send(command);

        res.status(200).send({ message: 'Image uploaded successfully', imageName: imageName });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send({ message: 'Error uploading image' });
    }
}

exports.retrieveImage = async (req, res) => {
    const filename = req.params.filename;
    const type = req.params.type;

    if (!filename || !["profil", "logo", "cover"].includes(type)) {
        return res.status(400).send({ message: 'Invalid parameters' })
    }

    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: type + '/' + filename
        })
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        
        res.status(200).send({ message: 'Image retrieved successfully', imageUrl: url });
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).send({ message: 'Error retrieving image' });
    }
}

exports.deleteImage = async (req, res) => {
    res.send('Delete image');
}