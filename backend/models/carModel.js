const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

const Cars = mongoose.model('Cars', carSchema);

module.exports = Cars;
