const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
});

module.exports = mongoose.model('Inventory', inventorySchema)