const express = require('express');
const router = new express.Router();

router.get('/', function(req, res){
    //Get all grocery lists for specific user
});

router.get('/:name', function(req, res){
    //Get grocery list with specific name 
});

router.post('/', function(req, res){
    //Create new grocery list for specific user
});

router.put('/:name', function(req, res){
    //Replace grocery list with specific name
});

router.patch('/:name', function(req, res){
    //Update grocery list with specific name
});

router.delete('/', function(req, res){
    //Delete all grocery list for specific user
});

router.delete('/:name', function(req, res){
    //Delete grocery list with specific name
});


module.exports = router;
