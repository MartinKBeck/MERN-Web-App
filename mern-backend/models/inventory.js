const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', require: true},
    description: {type: String, require: true},
    quantity: {type: Number, require: true},
});

module.exports = mongoose.model('Inventory', inventorySchema)