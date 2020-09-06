const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema)