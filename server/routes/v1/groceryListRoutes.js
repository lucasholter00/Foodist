const express = require('express');
const User = require("../../models/User");
const router = new express.Router({mergeParams: true});
const App = require("../../app");

router.get('/', function(req, res){
    //Get all grocery lists for specific user
    var filter = {userName: req.params.username};
    
    User.findOne(filter)
    .then((user) => {
        if(!user){
            res.status(404).json({message: 'User not found'});
        }
        else{
            const groceryLists = user.groceryList;
            res.status(200).json(groceryLists);
        }

    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    });
});

router.get('/:id', function(req, res){
    //Get grocery list with specific name 
    var filter = {userName: req.params.username};
    var groceryId = req.params.id;

    User.findOne(filter)
    .then((user) => {
        if(!user){
            res.status(404).json({message: 'User not found'});
        }
        else{
            const groceryList = user.groceryList.find((groceryList) => groceryList.id === groceryId); 
            
            if(!groceryList){
                res.status(404).json({message: 'Grocery list not found'});
            }
            else{
                res.status(200).json(groceryList);
            }
        }

    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    });
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
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    });
    
});

router.put('/:id', function(req, res){
    //Replace grocery list with specific name
    var filter = {userName: req.params.username}
    const groceryId = req.params.id;

    User.findOne(filter)
    .then((user) => {
        if(!user){
            res.status(404).json({message: 'User not found'});
        }
        else{
            var list = user.groceryList.find((list) => list.id === groceryId);
            
            if(!list){
                res.status(404).json({message: 'Grocary list not found'});
            }
            else{
                list.name = req.body.name;
                list.groceries = req.body.groceries;

                user.save()
                .then(() => res.status(200).json({message: 'Grocery list replaced'}));
            }
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    });
});

router.patch('/:id', function(req, res){
    //Update grocery list with specific name
    var filter = {userName: req.params.username};
    var groceryId = req.params.id;

    User.findOne(filter)
    .then((user) => {
        if (!user){
            res.status(404).json({message: 'User not found'});
        }
        else{
            var list = user.groceryList.find((list) => list.id === groceryId);
            
            if(!list){
                res.status(404).json({message: 'Grocery list not found'});
            }
            else{
                list.name = req.body.name || list.name;
                list.groceries = req.body.groceries || list.groceries;
                user.save()
                .then(() => {
                    res.status(200).json({message: 'Grocery list updated'});
                })
            }
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    });
});

router.delete('/', function(req, res){
    //Delete all grocery list for specific user
    var filter = {userName: req.params.username};

    User.findOne(filter)
    .then((user) => {
        if(!user){
            res.status(404).json({message: 'User not found'});
        }
        else{
            user.groceryList = [];

            user.save()
            .then(() => {
                res.status(200).json({message: 'Grocery lists deleted'});
            });
        }
    
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    });


});

router.delete('/:id', function(req, res){
    //Delete grocery list with specific name
    var filter = {userName: req.params.username};
    var groceryId = req.params.id;

    User.findOne(filter)
    .then((user) => {
        if(!user){
            res.status(404).json({message: 'User not found'});
        }
        else{
            var list = user.groceryList.find((groceryList) => groceryList.id === groceryId);
            if(!list){
                res.status(404).json({message: 'Grocery list not found'});
            }
            else{
                user.groceryList.pull(list); 
                user.save()
                .then(() => {
                    res.status(200).json({message: 'Grocery list deleted'});
                });
            }
            
        }

    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    });

});


module.exports = router;
