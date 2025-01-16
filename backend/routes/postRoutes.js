const express = require('express');
const router = express.Router();
const loginMiddleware = require('../middleware/loginMiddleware');
const { createPost } = require('../controllers/postController');
const { upload } = require('../middleware/multer');


router.post('/create-post', loginMiddleware, createPost);
router.post("/upload-images", loginMiddleware, upload.array("images", 10), (req, res) => {
    try {
        const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
        res.status(200).json({ imageUrls });
    } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ message: "Failed to upload images" });
    }
});

module.exports = router;
