const express = require('express');
const router = new express.Router();
const recipeRouter = require('./recipeRoutes');
const groceryListRouter = require('./groceryListRoutes');
const foodItemRoutes = require('./foodItemRoutes');

router.get('/', function(req, res){
    //Get all users
});

router.get('/:username', function(req, res){
    //Get user with specific username
});

router.post('/', function(req, res){
    //Create new user
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
