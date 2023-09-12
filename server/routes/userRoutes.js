const express = require('express');
const router = new express.Router();
const recipeRouter = require('recipeRouter');
const groceryListRouter = require('groceryListRouter')

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

router.use('/:id/recipes', recipeRouter);
router.use('/:id/grocery-lists', groceryListRouter)


module.exports = router;
