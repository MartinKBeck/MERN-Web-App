const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const jwtSecret = 'secret123';

// Handle incoming GET requests to view all items
router.get('/', (req, res, next) => {
    User.find(function(err, user) {
        if (err) {
            res.status(500).send('Error pulling users')
            console.log(err);
        }
        else {
            res.json(user)
        }
    })
})

// Handle incoming GET request to authorize user
router.post('/auth', (req,res,next) => {
    User.findOne({username:req.body.username, password:req.body.password})
    .exec()
    .then(user => {
        if(!user) {
            return res.status(401).json({errors: {form: 'Invalid Credentials'}});
        }
        else {
            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, jwtSecret);
            return res.status(200).json({
                token
            })
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
})

// Handle incoming specified GET requests to view single item
router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
    .exec()
    .then(user => {
        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        res.status(200).json({
            user: user
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
})

// Handle incoming POST requests to create User
router.post('/', (req, res, next) => {
    let user = new User({username: req.body.username, password: req.body.password, email: req.body.email})
    user.save()
        .then(user => {
            res.status(201).json({'message': 'User Created.'})
        })
        .catch(err => {
            res.status(400).send('User creation failed.');
        });
});

// Handle incoming DELETE requests to delete user
router.delete('/:userId', (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
    .exec()
    .then(user => {
        if(!user) {
            return res.status(400).json({
                message: 'User does not exist'
            })
        }
        else {
            res.status(200).json({
                message: 'User deleted'
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