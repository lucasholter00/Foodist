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
});

router.get('/:username', (req, res) => {
    //Get user with specific username
    var filter = {userName: req.params.username};
    
    var user = User.findOne(filter)  
    .then((user) => {
        if(!user){
            res.status(404).json({message: "User not found"});
        } 
        else{
            res.status(200).json(user);
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({message: "Server error"});
    });

    
});

router.post('/', (req, res) => {
    //Create new user
    

    var user = new User(req.body);
    user.save()
    .then(() => {
        res.status(201).json({message: "User created"});
    })
    .catch((error) =>{
        console.error(error);
        res.status(500).json({message: "Server error"});
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
