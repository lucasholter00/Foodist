const { query } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        expiryDate:{
            type: Date,
            required: true,
        }
    }
);


const recipeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        ingredients: {
            type: [String],
            required: true
        },
        description: {
            type: String,
        }
    }
);

const groceryListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    groceries: [String]

});



const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        groceryList: [groceryListSchema],
        recipe: [recipeSchema],
        food: [foodSchema]
    }
);

//Only export UserSchema, with the other schemas embedded due to being weak entities
const User = mongoose.model("User", UserSchema, 'users');
module.exports = User;
