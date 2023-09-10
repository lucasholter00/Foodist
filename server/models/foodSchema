const mongoose = require("mongoose");
const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    expiryDate:{
      type: Date,
      required: true,
    }
  }
);

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;