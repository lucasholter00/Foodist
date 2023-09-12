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
            required: false
        }
    }
);

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
        Recipes: {
            recipes: [recipeSchema]
        }
    }
)

const User = mongoose.model("User", userSchema);
module.exports = User;