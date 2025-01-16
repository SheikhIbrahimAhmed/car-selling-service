const User = require("../models/userModel");
const Cars = require("../models/carModel");

const createPostServ = async (obj) => {
    try {
        return await Cars.create(obj);
    } catch (err) {
        console.log("err", err);
    }
}
const findSingleUserServ = async (email, password) => {
    try {
        return await User.findOne({ email, password });
    } catch (err) {
        console.log("Error in findSingleUserServ:", err);
    }
};

module.exports = {
    findSingleUserServ,
    createPostServ
}