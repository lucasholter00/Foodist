const express = require('express');
const router = new express.Router();
const recipeRouter = require('./recipeRoutes');
const groceryListRouter = require('./groceryListRoutes');
const foodItemRoutes = require('./foodItemRoutes');
const User = require('../../models/User');

//Get username of all users using field selection
router.get('/', function(req, res){

    User.find()
    .then((users) => {
        if(!users){
            res.status(404).json({message: 'No users found'});
        }
        else{
            var usernames = users.map((users) => users.userName);
            res.status(200).json({usernames});
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({message: "server error"});
    });
});

//This endpoint gets a user with specific username
router.get('/:username', (req, res) => {
    var filter = {userName: req.params.username};
    
    var user = User.findOne(filter)  
    .then((user) => {
        if(!user){
            //If user is not found, return appropriate status code and a message
            res.status(404).json({message: "User not found"});
        } 
        else{
            //If user is found, return status message and the user itself
            
            const links = {
                self: {
                    href: 'v1/users/' + req.params.username
                },
                groceryLists: {
                    href: 'v1/users/' + req.params.username + '/grocery-lists' 
                },
                foodItems: {
                    href: 'v1/users/' + req.params.username + '/food-items' 
                },
                recipes: {
                    href: 'v1/users/' + req.params.username + '/recipes' 
                }
            }

            res.status(200).json({user: user, links: links});
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({message: "server error"});
    });

    
});

//Creates new user
router.post('/', (req, res) => {
    
    var filter = {userName: req.body.userName};
    var existingUser = User.findOne(filter)
    .then((existingUser) => {
        //checks if existing user has the desired username
        if (existingUser){
            res.status(409).json({message: "Username already taken"});
        }
        //if noone has the desired username create a username
        else{
            var user = new User(req.body);
            user.save()
            .then(() => {
                res.status(201).json({message: "User created"});
            })
            .catch((error) =>{
                console.error(error);
                res.status(500).json({message: "Server error"});
            });

        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({message: "Server error"})
    });

});

router.post('/authentication', (req, res) => {
    var filter = {userName: req.body.userName};
    User.findOne(filter)
    .then((user) => {
        if(!user){
            res.status(404).json({message: "User not found"});
        }
        else if(user.password !== req.body.password){
            res.status(401).json({message: "Unauthorized"});
        }
        else{
            res.status(200).send();
        }
    })
    .catch((err) => {
        res.status(500).json({message: "Server error"})
    })
})


router.patch('/:username', (req, res) => {
    //Update a specific user
    var filter = {userName: req.params.username};

    var changeUser = User.findOne(filter)
    .then((changeUser) => {
        if(!changeUser){
            res.status(404).json({message: "User not found"});
        }
        //needs authentication
        else{
            changeUser.password = req.body.newPassword;
            changeUser.save()
            .then(() => {
                res.status(200).json({message: "Password update"});
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({message: "Server error"})
            });
        }
    })
});

router.delete('/:username', (req, res) => {
    //Delete user with specific username
    var filter = {userName: req.params.username};
    var deleteUser = User.findOne(filter)
    .then((deleteUser) => {
        if(!deleteUser){
            res.status(404).json({message: "User not found"}) 
        }
        //needs authentication
        else{
            deleteUser.deleteOne()
            .then(() => {
                    res.status(200).json({message: 'User deleted'});
                });
        }
    })
    .catch((error) => {
        console.error(error)
        res.status(500).json({message: "Server error"});
    });
});




router.use('/:username/recipes', recipeRouter);

router.use('/:username/grocery-lists', groceryListRouter);

router.use('/:username/food-items', foodItemRoutes);


//Example of method overriding, not to be used
router.post('/:username', (req, res) =>{
    if(req.query._method === 'DELETE'){
        var filter = {userName: req.params.username}; 
        
        User.findOne(filter)
        .then((user) => {
            if(!user){
                res.status(404).json({message: 'User not found'});    
            }

            else{
                user.deleteOne()
                .then(() => {
                    res.status(200).json({message: 'User deleted'});
                });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        });
    }
    else{
        res.status(400).json({message: 'Bad request'});
    }
});


module.exports = router;
