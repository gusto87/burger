var express = require("express")

var router = express.Router()

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger")

// GET route to burgers from the database
router.get("/", function(req, res){
    burger.all(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log(data)
        // console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Post route to create/add a burger.
router.post("/api/burgers", function(req, res){
    console.log (req.body.burger_name)
    console.log('burger object within post', burger)

    burger.create([
        "burger_name", "devoured"
    ],[
        req.body.burger_name, req.body.devoured
    ], function(result) {
        // Send back the ID of the new quote
        res.json({id: result.insertId})
    });
});

// Put route to update burger devoured state.
router.put("/api/burgers/:id", function(req, res){
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result){
        if (result.changedRows == 0){
            // If no rows were changed, then the ID mustn't exist
            return res.status(404).end();
        } else {
            res.status(200).end();
            }
        });
    
    });

    // Export routes for server to use
    module.exports = router;
