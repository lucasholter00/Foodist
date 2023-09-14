const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: [String],
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
    Name: {
        type: String,
        required: true
    },
    Groceries: [String]

});



const UserSchema = new Schema(
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
        Recipe: [recipeSchema],
        Food: [foodSchema]
    }
)

//Only export UserSchema, with the other schemas embedded due to being weak entities
const User = mongoose.model("User", UserSchema);
module.exports = User;