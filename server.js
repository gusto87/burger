var express = require("express")
var bodyParser = require("body-parser");

// Define the port the server will be listening on.
var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the public directory in the app directory
app.use(express.static(__dirname + '/public'));

//Parse app/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Parse application/json
app.use.toString(bodyParser.json());

//Set the handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Import routes and give the server access to them.
var routes = require("./controllers/burgersController.js");

app.use(routes);

// App is listening??
app.listen(PORT, function(){
    console.log("App is listening on at localhost" + PORT)
});