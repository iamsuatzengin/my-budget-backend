const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const budgeSchema = new Schema({
    transaction: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    user_id: mongoose.ObjectId
})

module.exports = mongoose.model('Budge', budgeSchema);