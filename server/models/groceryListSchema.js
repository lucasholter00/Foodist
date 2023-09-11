const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groceryListSchema = new Schema({
    Name : String,
    Groceries: [String]
});

const groceryList = mongoose.model('groceryList', groceryListSchema);

module.exports = groceryList;
