const express = require('express');
const router = new express.Router({ mergeParams: true });
const User = require("../../models/User");

router.get('/', (req, res) => {
    //Get all food items in the database
    const userName = { userName: req.params.username }
    User.findOne(userName)
        .then((user) => {
            if (!user) {
                res.status(404).json({ success: false, msg: "User not found" });
            } else {
                res.status(200).json({data: user.food });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.get('/:name', (req, res) => {
    //Get food item with specific id
    const userName = { userName: req.params.username };

    User.findOne(userName)
        .then((userResult) => {
            if (!userResult) {
                res.status(404).json({ success: false, msg: "User not found" });
            } else {

                const foodItem = userResult.food.find((food) => food.name === req.params.name)

                if (!foodItem) {
                    res.status(404).json({ success: false, msg: "Food item not found" });
                } else {
                    res.status(200).json({ success: true, msg: "Specific food found", data: foodItem });
                }
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.post('/', (req, res) => {
    //Create new food item
    const user = { userName: req.params.username }
    User.findOne(user)
        .then((userResult) => {
            if (!userResult) {
                res.status(404).json({ success: false, msg: "User not found" });
            } else {

                const newFood = (req.body);
                userResult.food.push(newFood);
                userResult.save()
                    .then(() => {
                        res.status(200).json({ success: true, msg: "POST request: New food item is stored.", data: userResult.food });
                    })
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        });
});

router.put('/:name', function (req, res) {
    //Replace food with specific name
    const user = { userName: req.params.username };
    const foodName = req.params.name;

    User.findOne(user) // Find user by user name
        .then((userResult) => {
            if (!userResult) {
                res.status(404).json({ success: false, msg: "PUT request: User not found" });
            } else {
                // Find the specific food index in food list
                const foodIndex = userResult.food.findIndex((food) => food.name === foodName);
                if (foodIndex === -1) {
                    res.status(404).json({ success: false, msg: "PUT request: Food not found" });
                } else {
                    userResult.food[foodIndex] = {
                        name: req.body.name,
                        description: req.body.description,
                        expiryDate: req.body.expiryDate
                    };
                    userResult.save()
                        .then(() => {
                            res.status(200).json({ success: true, msg: "PUT request: Food is replaced", data: req.body });
                        }).catch((err) => {
                            console.log(err.message);
                            res.status(500).json({ message: err.message })
                        })
                }
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })

});

router.patch('/:name', function (req, res) {
    //Update a specific food item
    const user = { userName: req.params.username };
    const foodName = req.params.name;
    User.findOne(user)
        .then(userResult => {
            if (!userResult) {
                res.status(404).json({ success: false, msg: "Patch: User not found"});
            } else {
                // Find the specific food index in food list
                const foodIndex = userResult.food.findIndex((food) => food.name === foodName);
                if (foodIndex === -1) {
                    res.status(404).json({ success: false, msg: "Patch request: Food not found" });
                } else {
                    userResult.food[foodIndex] = {
                        name: req.body.name || userResult.food[foodIndex].name,
                        description: req.body.description || userResult.food[foodIndex].description,
                        expiryDate: req.body.expiryDate || userResult.food[foodIndex].expiryDate
                    };
                    userResult.save()
                        .then(() => {
                            res.status(200).json({ success: true, msg: "Patch request: Food is updated", data: req.body });
                        }).catch((err) => {
                            console.log(err.message);
                            res.status(500).json({ message: err.message })
                        })
                }               

            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.delete('/', function (req, res) {
    //Delete all food items
    const user = { userName: req.params.username };
    User.findOne(user)
        .then((userResult) => {
            if (!userResult) {
                res.status(200).json({ success: false, msg: "User not found" });
            } else {

                userResult.food = [];
                userResult.save()
                        .then(() => {
                            res.status(200).json({ success: true, msg: "Food List is deleted"});
                        })
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.delete('/:name', (req, res) => {
    //Delete food item with specific id
    const user = { userName: req.params.username };
    const foodName = req.params.name;

    User.findOne(user) // Find user by user name
        .then((userResult) => {
            if (!userResult) {
                res.status(404).json({ success: false, msg: "Delete request: User not found" });
            } else {
                // Find the specific food index in food list
                const foodIndex = userResult.food.findIndex((food) => food.name === foodName);
                if (foodIndex === -1) {
                    res.status(404).json({ success: false, msg: "Delete request: Food not found" });
                } else {
                    userResult.food.splice(foodIndex, 1);
                    userResult.save()
                    .then(() => {
                        res.status(200).json({ success: true, msg: "Delete request: Food is deleted" });
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

module.exports = router;
