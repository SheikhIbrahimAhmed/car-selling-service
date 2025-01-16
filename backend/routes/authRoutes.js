const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');
const loginMiddleware = require('../middleware/loginMiddleware');


router.get("/validate-token", loginMiddleware, (req, res) => {
    return res.status(200).json({ message: "Token is valid" });
});
router.post('/login', loginUser);

module.exports = router;
