const { createPostServ } = require("../services/authService");

const createPost = async (req, res) => {
    try {
        const { userId, model, price, phoneNumber, images } = req.body;
        if (!model || !price || !phoneNumber || !images) {
            return res.status(400).json({
                success: false,
                message: 'Model, Price, PhoneNumber, and Images are required.'
            });
        }
        const newPost = await createPostServ({
            userId,
            model,
            price,
            phoneNumber,
            images
        })

        res.status(201).json({
            success: true,
            message: 'Post created successfully!',
            post: newPost,
        });

    } catch (error) {
        console.error('Error Posting post:', error);
        res.status(500).json({
            success: false,
            message: 'Error Posting post.',
            error: error.message,
        });
    }
}
module.exports = {
    createPost
};

