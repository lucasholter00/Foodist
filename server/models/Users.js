const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    Name: {
        type: String,
        required: true
    },
    Groceries: [String]

});

const userSchema = new Schema(
    {
        UserName: {
            type: String,
            required: true
        },
        Password: {
            type: String,
            required: true
        },
        GroceryList: [groceryListSchema],
        Recipes: [recipeSchema]
    }
)

const User = mongoose.model("User", userSchema);
module.exports = User;