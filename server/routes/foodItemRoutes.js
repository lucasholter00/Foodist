const express = require('express');
const router = new express.Router({mergeParams: true});
const Food = require("../models/User");

router.get('/', function(req, res){
    //Get all get all food items in the database
    try {
        var result = Food.find();
        then((result) => {
        res.send(result);
   } )
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
   
});

router.get('/:id', function(req, res){
    //Get food item with specific id
});

router.post('/add-food', (req, res)=>{
    //Create new food item
    var food = new Food(req.body);

        food.save()
        .then((result)=>{
            res.status(200).send({ success: true, msg: "Food details", data: food_item});
        })
        .catch((err)=>{
            console.log(error.message);
        res.status(500).json({message: error.message})
        })       

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
