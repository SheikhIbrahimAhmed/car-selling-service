const { findSingleUserServ } = require("../services/authService");

const SECRET_KEY = "12qw"
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findSingleUserServ(email, password); if (!user) {
            return res.status(404).json({ error: "User not found or invalid password" });
        }
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            SECRET_KEY,
            { expiresIn: "7d" }
        );
        user.password = "";
        res.status(200).json({ message: "Login successful!", token, user });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    loginUser
}


