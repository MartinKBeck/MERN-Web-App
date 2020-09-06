const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
});

module.exports = mongoose.model('Inventory', inventorySchema)