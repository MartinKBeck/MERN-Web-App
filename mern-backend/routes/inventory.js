const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Inventory = require('../models/inventory');

// Handle incoming GET requests to view all possible items
router.get('/', (req, res, next) => {
    Inventory.find(function(err, inventory) {
        if (err) {
            res.status(500).send('Error pulling Inventory')
            console.log(err);
        }
        else {
            res.json(inventory)
        }
    })
})

// Handle incoming GET requests to view all user items
router.get('/:userId', (req, res, next) => {
    Inventory.find({user:req.params.userId}, function(err, inventory) {
        if (err) {
            res.status(500).send('Error pulling Inventory')
        }
        else {
            res.json(inventory)
        }
    })
})

// Handle incoming specified GET requests to view single item
router.get('/item/:invId', (req, res, next) => {
    Inventory.findById(req.params.invId)
    .exec()
    .then(inventory => {
        if(!inventory) {
            return res.status(404).json({
                message: 'Item not found'
            })
        }
        res.status(200).json({
            inventory: inventory
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
})

// Handle incoming POST requests to create items
router.post('/', (req, res, next) => {
    let inventory = new Inventory({user: req.body.user, description: req.body.description, quantity: req.body.quantity})
    inventory.save()
        .then(inventory => {
            res.status(201).json({'message': 'Item added to inventory.'})
        })
        .catch(err => {
            res.status(400).send('Adding new item failed');
        });
});

// Handle incoming DELETE requests to remove items
router.delete('/:invId', (req, res, next) => {
    Inventory.findByIdAndDelete(req.params.invId)
    .exec()
    .then(inventory => {
        if(!inventory) {
            return res.status(400).json({
                message: 'Item does not exist'
            })
        }
        else {
            res.status(200).json({
                message: 'Item deleted'
            })
        }     
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});


module.exports = router;