const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: {type: String, require: true},
    password: {type: String, require: true},
});

module.exports = mongoose.model('User', userSchema)