const express = require('express');
const router = express.Router();
const loginMiddleware = require('../middleware/loginMiddleware');
const { createPost } = require('../controllers/postController');
const { upload } = require('../middleware/multer');
const cloudinary = require('../cloudinary');


router.post('/create-post', loginMiddleware, createPost);


router.post('/upload-images', loginMiddleware, upload.array('images', 10), async (req, res) => {
    try {
        const files = req.files;
        console.log("req.files", req.files);

        const uploadPromises = files.map(file => {
            return cloudinary.uploader.upload(file.path, {
                resource_type: 'auto',
            });
        });

        const results = await Promise.all(uploadPromises);
        const imageUrls = results.map(result => result.secure_url);

        res.json({ message: 'Images uploaded successfully', imageUrls });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ message: "Error uploading images", error });
    }
});




module.exports = router;
