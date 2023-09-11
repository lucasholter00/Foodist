//route module

const express = require("express");
const router = express.Router();

// Home page route
router.get("/", function (req, res) {
  res.send("Home page");
});

// About page route
router.get("/about", function (req, res) {
  res.send("About this web");
});

// Grocery page
router.get("/food", function (req, res) {
    res.send("List the food items");
  });

// Receipe katalog page
router.get("/receipe-katalog", function (req, res) {
    res.send("List of recepies");
  });

// Receipe detail page
router.get("/receipe", function (req, res) {
  res.send("Recepie instractions");
});

// Shopping list
router.get("/grocery", function (req, res) {
    res.send("Make a list for grocery shopping");
  });

// Catch all non-error handler for api (i.e., 404 Not Found)
router.use('/api/*', function (req, res) {
  res.status(404).json({ 'message': 'Not Found' });
});

module.exports = router;