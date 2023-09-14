const express = require('express');
const router = new express.Router({ mergeParams: true });
const Food = require("../models/User");

router.get('/', (req, res) => {
    //Get all get all food items in the database
    Food.find()
        .then((result) => {
            if (result === null) {
                res.status(404).json({ success: false, msg: "Foods not found", data: result });
            } else {
                res.status(200).json({ success: true, msg: "Food List", data: result });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.get('/:id', (req, res) => {
    //Get food item with specific id
    const id = req.param.id;
    Food.findById(id)
        .then(result => {
            if (result === null) {
                res.status(404).json({ success: false, msg: "Food not found", data: result });
            } else {
                res.status(200).json({ success: true, msg: "Food by ID", data: result });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.post('/add-food', (req, res) => {
    //Create new food item
    var food = new Food(req.body);

    food.save()
        .then((result) => {
            res.status(200).json({ success: true, msg: "Food details", data: food });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })

});

router.put('/:id', function (req, res) {
    //Replace food with specific id
    const id = req.params.id;

    Food.findOneAndReplace(id)
        .then(result => {
            if (!result) {
                res.status(404).json({ success: false, msg: "Food not found", data: result });
            } else {
                res.status(200).json({ success: true, msg: "Food replaced", data: result });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.patch('/:id', function (req, res) {
    //Update a specific food item
    const id = req.params.id;

    Food.findByIdAndUpdate(id)
        .then(result => {
            if (!result) {
                res.status(404).json({ success: false, msg: "Food not found", data: result });
            } else {
                res.status(200).json({ success: true, msg: "Food Updated", data: result });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.delete('/', function (req, res) {
    //Delete all food items
   
});

router.delete('/:id', (req, res) => {
    //Delete food item with specific id
    const id = req.params.id;

    Food.findByIdAndDelete(id)
        .then(result => {
            if (result === null) {
                res.status(404).json({ success: false, msg: "Food not found", data: result });
            } else {
                res.status(200).json({ success: true, msg: "Food deleted", data: result });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })

});

module.exports = router;
