const multer = require('multer');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/upload-controller');

// Set up multer middleware to be able to retrieve multipart form data
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 }})

router.post('/image', upload.single('image'), controller.uploadImage);
router.get('/image/:type/:filename', controller.retrieveImage);
router.delete('/image/:filename', controller.deleteImage);

module.exports = router;