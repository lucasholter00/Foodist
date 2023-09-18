const express = require('express');
const User = require("../models/User");
const router = new express.Router({mergeParams: true});
const App = require("../app");

router.get('/', (req, res) =>{
    //Get all recipes for specific user
    const userName = {userName: req.params.username};

     User.findOne(userName)
        .then((user) => {
            if (!user){
                res.status(404).json({ message: 'User not found' });
            }else {
                const recipes = user.recipe; // Verify that 'recipe' is spelled correctly

                res.status(200).json(recipes);
            }
        })
        .catch((err) =>{
            console.error(err);
            res.status(500).json({message: 'Server error'})
    })


});

router.get('/:name', function(req, res){
    //Get recipe with specific name
    const userName = {userName: req.params.username};
    const recipeName = req.params.name;

    //find user by username
    User.findOne(userName)
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }else {
                const recipe = user.recipe.find((recipe) => recipe.name === recipeName);
                if (!recipe){
                    //find recipe by name
                    res.status(404).json({ message: 'Recipe not found' });
                }
                res.status(200).json(recipe);
            }
        }).catch((err)=>{
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    });
});

router.post('/', function(req, res){
    //Create new recipe for a specific user
    const userName = {userName: req.params.username};

    User.findOne(userName)
        .then((user) =>{
            if(!user){
                res.status(404).json({ message: 'User not found' });
            }else{
                // Create a new recipe based on the request body
                const newRecipe = {
                    name: req.body.name,
                    ingredients: req.body.ingredients,
                    description: req.body.description,
                };

                user.recipe.push(newRecipe);

                //save the recipe
                user.save()
                    .then(() => {
                        res.status(201).json({ message: 'Recipe added successfully' });
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({ message: 'Server error' });
                    });
            }

        }).catch((err)=>{
        console.error(err);
        res.status(500).json({ message: 'Server error' });
        });
});

router.put('/:name', function(req, res){
    //Replace recipe with specific name
    const userName = {userName: req.params.username};
    const recipeName = req.params.name; // Get the recipe name from the URL

    User.findOne(userName)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }else{
                const indexRecipe = user.recipe.findIndex((recipe)=> recipe.name ===recipeName);

                if (indexRecipe === -1) {
                    return res.status(404).json({ message: 'Recipe not found' });
                }
                // Update the recipe data with the new data from the request body
                user.recipe[indexRecipe] = {
                    name: req.body.name,
                    ingredients: req.body.ingredients,
                    description: req.body.description,
                };

                user.recipe.push(newRecipe);

                user.save()
                    .then(() => {
                        res.status(200).json({ message: 'Recipe replaced successfully' });
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({ message: 'Server error' });
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
});

router.patch('/:name', function(req, res){
    //Update recipe with specific name
    const userName = {userName: req.params.username};
    const recipeName = req.params.name; // Get the recipe name from the URL

    User.findOne(userName)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }else{
                const indexRecipe = user.recipe.findIndex((recipe)=> recipe.name ===recipeName);

                if (indexRecipe === -1) {
                    return res.status(404).json({ message: 'Recipe not found' });
                }
                // Update the recipe data with the new data from the request body
                user.recipe[indexRecipe] = {
                    name: req.body.name,
                    ingredients: req.body.ingredients,
                    description: req.body.description,
                };

                user.save()
                    .then(() => {
                        res.status(200).json({ message: 'Recipe replaced successfully' });
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({ message: 'Server error' });
                    });
            }
        }).catch((err)=>{
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    });
});

router.delete('/', function(req, res){
    //Delete all recipes for specific user
    const userName = {userName: req.params.username};
    User.findOne(userName)
        .then((user)=>{
            if (!user){
                res.status(404).message({message: 'User not found'});
            }else{
                //replace recipe list with empty list
                user.recipe = [];

                //save changes
                user.save()
                    .then(() => {
                        res.status(201).json({ message: 'Recipe deleted successfully' });
                    });
            }
        }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    });
});

router.delete('/:name', function(req, res){
    //Delete recipe with specific name
    const userName = {userName: req.params.username};
    const recipeName = req.params.name;

    User.findOne(userName)
        .then((user)=>{
            if (!user){
                res.status(404).message({message: 'User not found'});
            }else{
                //find index of recipe
                const indexRecipe = user.recipe.findIndex((recipe)=> recipe.name === recipeName);

                if (indexRecipe === -1) {
                    return res.status(404).json({ message: 'Recipe not found' });
                }
                //remove the recipe at index with the use of splice function
                user.recipe.splice(indexRecipe,1);

                //save changes
                user.save()
                    .then(() => {
                        res.status(200).json({ message: 'Recipe deleted successfully' });
                    });
            }

        }).catch((err)=>{
            console.log(err)
            res.status(500).json({ message: 'Server error' });
    });
});


module.exports = router;
