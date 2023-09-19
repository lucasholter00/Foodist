const express = require('express');
const router = new express.Router({ mergeParams: true });
const User = require("../models/User");

router.get('/', (req, res) => {
    //Get all get all food items in the database
    const user = req.param.userName
    User.findOne(user)
        .then((result) => {
            if (!result) {
                res.status(404).json({ success: false, msg: "User not found" });
            } else {
                res.status(200).json({ success: true, msg: "Food List", data: result.food });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.get('/:name', (req, res) => {
    //Get food item with specific id
    const user = req.param.userName;
    User.findOne(user)
        .then(result => {
            if (!result) {
                res.status(404).json({ success: false, msg: "User not found" });
            } else {
                const food_item = result.food.find((food) => food.name === req.params.name)
                if (!food_item) {
                    res.status(404).json({ success: false, msg: "Food item not found" });
                }
                res.status(200).json({ success: true, msg: "Specific food found", data: food_item });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.post('/', (req, res) => {
    //Create new food item
    const user = req.param.userName
    User.findOne(user)
        .then((result) => {
            if (!result) {
                res.status(404).json({ success: false, msg: "Food not found", data: result });
            } else {
                var newFood = (req.body);
                result.food.push(newFood);
                result.save();
                res.status(200).json({ success: true, msg: "New food item is stored.", data: food });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.put('/:name', function (req, res) {
    //Replace food with specific name
    const userName = req.param.userName;
    const foodName = req.param.name;
    User.findOne(userName)
        .then(user => {
            if (!user) {
                res.status(404).json({ success: false, msg: "User not found"});
            } else {
                // 
                const foodIndex = user.food.findIndex((food) => food.name === foodName)
                if (foodIndex === -1) {
                    res.status(404).json({ success: false, msg: "Food not found"});
                } else {
                    user.food[foodIndex] = {
                        name: req.body.name,
                        description: req.body.description,
                        expiryDate: req.body.expiryDate
                    };
                    res.status(200).json({ success: true, msg: "Food replaced", data: food_item });
                }
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

    Food.findByIdAndUpdate(id.body)
        .then(result => {
            if (!result) {
                res.status(200).json({ success: false, msg: "Food not found", data: result });
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
    Food.find()
        .then((result) => {
            if (!result) {
                res.status(200).json({ success: false, msg: "Foods not found" });
            } else {
                result.body.delete();
                res.status(200).json({ success: true, msg: "Food List deleted" });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.delete('/:id', (req, res) => {
    //Delete food item with specific id
    const id = req.params.id;

    Food.findByIdAndDelete(id)
        .then(result => {
            if (result === null) {
                res.status(200).json({ success: false, msg: "Food not found", data: result });
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
