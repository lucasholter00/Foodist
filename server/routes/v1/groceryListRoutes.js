const express = require('express');
const User = require("../../models/User");
const router = new express.Router({mergeParams: true});
const App = require("../../app");

router.get('/', function(req, res){
    //Get all grocery lists for specific user
});

router.get('/:name', function(req, res){
    //Get grocery list with specific name 
});

router.post('/', function(req, res){
    //Create new grocery list for specific user
    var filter = {userName: req.params.username};
    User.findOne(filter)
    .then((user) => {
        if(!user){
            res.status(404).json({message: 'User not found'});
        }
        else{
            const newGroceryList = req.body;
            user.groceryList.push(newGroceryList);
            user.save()
            .then(() => {
                res.status(201).json({message: 'Grocery list created'});
            })
        }
     });
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
