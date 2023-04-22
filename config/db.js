//finished
const mysql = require('mysql2');

//connect to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Emerald132!',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);
module.exports = connection;