const express = require('express');
const router = new express.Router({ mergeParams: true });
const User = require("../models/User");

router.get('/', (req, res) => {
    //Get all food items in the database
    const userName = {userName: req.params.username}
    User.findOne(userName)
        .then((user) => {
            if (!user) {
                res.status(404).json({ success: false, msg: "User not found" });
            } else {
                res.status(200).json({ success: true, msg: "Food List", data: user.food });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })
});

router.get('/:name', (req, res) => {
    //Get food item with specific id
    const userName = {userName: req.params.username};

    User.findOne(userName)
        .then((userResult) => {
            if (!userResult) {
                res.status(404).json({ success: false, msg: "User not found" });
            } else {

                const foodItem = userResult.food.find((food) => food.name === req.params.name)

                if (!foodItem) {
                    res.status(404).json({ success: false, msg: "Food item not found" });
                }else {
                    res.status(200).json({success: true, msg: "Specific food found", data: foodItem});
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
    const user = {userName: req.params.username}
    User.findOne(user)
        .then((userResult) => {
            if (!userResult) {
                res.status(404).json({ success: false, msg: "User not found" });
            } else {

                var newFood = (req.body);
                userResult.food.push(newFood);
                userResult.save()
                    .then(()=>{
                    res.status(200).json({ success: true, msg: "New food item is stored.", data: userResult });
                });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        });
});

router.put('/:name', function (req, res) {
    //Replace food with specific name
    const user = {userName : req.params.username};
    const foodName =  req.params.name;

    User.findOne(user)
        .then((userResult) => {
            if (!userResult) {
                res.status(404).json({ success: false, msg: "PUT request: User not found" });
            } else {
                // Find the specific food in food list
                const foodIndex = userResult.food.findIndex((food)=> food.name === foodName);

                //  const indexRecipe = user.recipe.findIndex((recipe)=> recipe.name ===recipeName);
                if (foodIndex === -1) {
                    res.status(404).json({ success: false, msg: "PUT request: Food not found" });
                } else {
                    userResult.food[foodIndex] = {
                        name : req.body.name,
                        description : req.body.description,
                        expiryDate : req.body.expiryDate
                    }
                    userResult.save()
                    .then(()=> {
                        res.status(200).json({ success: true, msg: "PUT request: Food updated" });
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
    User.findOne(req.params.username)
        .then(result => {
            if (!result) {
                res.status(404).json({ success: false, msg: "User not found", data: result });
            } else {
                //need to add code to actually patch, not just return value
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
    User.findOne(req.params.username)
        .then((result) => {
            if (!result) {
                res.status(200).json({ success: false, msg: "User not found" });
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
