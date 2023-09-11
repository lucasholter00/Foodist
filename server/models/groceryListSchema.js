const mongose = require('mongose');

const Schema = mongose.Schema;

const groceryListSchema = new Schema({
    Name : String,
    Groceries: [String]
});

const groceryList = mongose.model('groceryList', groceryListSchema);

module.exports = groceryList;
