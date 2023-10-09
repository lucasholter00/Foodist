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
        },
        leftexpiryDays: {
            type: Number,
            default: function() {
                // Calculate the difference in milliseconds between the expiryDate and now
                const timeDifference = this.expiryDate.getTime() - Date.now();

                // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
                const leftDays = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));

                return leftDays;
            }
        },
        reminder: {
            type: Boolean,
            default: function () {
                if(this.leftexpiryDays < 15) {
                    reminder = true
                }else {
                    reminder = false
                }
            }
        }
    }
);

const ingredientSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        quantity:{
            type: String
        },
        unit:{
            type: String
        }
    }
)


const recipeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        ingredients: [ingredientSchema],
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
