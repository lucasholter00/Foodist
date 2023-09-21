const express = require('express');
const router = new express.Router();
const recipeRouter = require('./recipeRoutes');
const groceryListRouter = require('./groceryListRoutes');
const foodItemRoutes = require('./foodItemRoutes');
const User = require('../models/User');
const app = require('../app');
const mongoose = require('mongoose');

router.get('/', function(req, res){
    //Get all users
    res.send("User home page");
});

//This endpoint gets a user with specific username
router.get('/:username', (req, res) => {
    var filter = {userName: req.params.username};
    
    var user = User.findOne(filter)  
    .then((user) => {
        if(!user){
            //If user is not found, return appropriate status code and a message
            res.status(404).json({message: "User not found"});
        } 
        else{
            //If user is found, return status message and the user itself
            res.status(200).json(user);
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({message: "Server error"});
    });

    
});

//Creates new user
router.post('/', (req, res) => {
    
    var filter = {userName: req.body.userName};
    var existingUser = User.findOne(filter)
    .then((existingUser) => {
        //checks if existing user has the desired username
        if (existingUser){
            res.status(409).json({message: "Username already taken"});
        }
        //if noone has the desired username create a username
        else{
            var user = new User(req.body);
            user.save()
            .then(() => {
                res.status(201).json({message: "User created"});
            })
            .catch((error) =>{
                console.error(error);
                res.status(500).json({message: "Server error"});
            });

        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({message: "Server error"})
        });

});


router.patch('/:username', function(req, res){
    //Update a specific user
});

router.delete('/', function(req, res){
    //Delete all users
});

router.delete('/:username', function(req, res){
    //Delete user with specific username
});

router.use('/:username/recipes', recipeRouter);

router.use('/:username/grocery-lists', groceryListRouter);

router.use('/:username/food-items', foodItemRoutes);


module.exports = router;

