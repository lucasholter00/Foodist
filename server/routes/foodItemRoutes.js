const express = require('express');
const router = new express.Router();

router.get('/', function(req, res){
    //Get all get all food items in the database
});

router.get('/:id', function(req, res){
    //Get food item with specific id
});

router.post('/', function(req, res){
    //Create new food item
});

router.put('/:id', function(req, res){
    //Replace food with specific id
});

router.patch('/:id', function(req, res){
    //Update a specific food item
});

router.delete('/', function(req, res){
    //Delete all food items
});

router.delete('/:username', function(req, res){
    //Delete user with specific username
});

module.exports = router;
