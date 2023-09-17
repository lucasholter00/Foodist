const express = require('express');
const router = new express.Router({mergeParams: true});

router.get('/', function(req, res){
    //Get all recipes for specific user 
});

router.get('/:name', function(req, res){
    //Get recipe with specific name 
});

router.post('/', function(req, res){
    //Create new recipe for a specific user
});

router.put('/:name', function(req, res){
    //Replace recipe with specific name
});

router.patch('/:name', function(req, res){
    //Update recipe with specific name
});

router.delete('/', function(req, res){
    //Delete all recipes for specific user
});

router.delete('/:name', function(req, res){
    //Delete recipe with specific name
});


module.exports = router;
