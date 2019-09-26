var connection = require("./connection.js");

// Helper function for SQL syntax
//Loops through and creates  an array of question marks and makes it a string.
function printQuestionMarks(num){
    var arr = [];


for (var i = 0; i < num; i++){
    arr.push("?");
}

return arr.toString()
}

// Helper function to convert key/value as a string int arr
function objToSql(ob){
    var arr = [];

    //loops through the keys and pushes the key & values as a string in arr
    for(var key in ob){
        var value = ob[key];
        //checks for skipping hidden properties
        if (Object.hasOwnProperty.call(ob, key)){
            // if string with spaces, add quotations
            if (typeof value === "string" && value.indexOf(" ") >= 0){
                value = "'" + value + "'";
            }
            // ex: {name: 'Lana Del Grey'} => ["name= 'Lana Del Grey'"]
            // ex: {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translates array of strings to a single comma seperated string 
    return arr.toString();
}

var orm = {

    all: function(tableInput, cb){
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, results){
            if (err){
                throw err
            };
            cb(results);
        });
    },
    //select all function/query
     create: function(table, cols, vals, cb) {
        var queryString = `INSERT INTO ${table}`;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") "

        console.log(queryString);

        connection.query(queryString,vals, function(err, result){
            if (err){
                throw err;
            }
            cb(result);
        });
    },

    //Update function/query.
    // An example of objColVals would be {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE "  + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;   

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if(err) {
                throw err;
            }

            cb(result);
        })
    },

    //Delete function and/or query
    delete: function(table, conditon, cb) {
        var queryString = "DELETE FROM" + table;
        queryString += "WHERE";
        queryString += conditon;

        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }

            cb(result);
        })
    }
};

// Export the orm object 
module.exports = orm;