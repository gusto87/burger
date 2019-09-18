var mysql =  require("mysql");
let connection;
// REad and set the environment

// define database connection
if (process.env.JAWSDB_URL){
    // Deployment to Heroku
    connection = mysql.createConnection(process.env.JAWSDB_URL)
}
else {
    // uses localhost database for local development.
    // dotenv passes MYSQL password into connection.js 
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "burgers"
});
};

connection.connect(function(err){
    // If error when connecting to the database, console log it
    if (err) {
        console.error("connection error:" + err.stack);
        return;
    }
    //If a database connection is created log the database thread #
    console.log("connection ID" + connection.threadId);
});
//export connection properties to be used in other files
module.exports = connection;