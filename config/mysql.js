// var mysql = require('mysql2/promise');
// var connection ;
// async function makeConnection(){
//      connection = await mysql.createConnection({
//         host: 'localhost',       // Use 'localhost' since your MySQL server is on the same machine
//         user: 'root',            // MySQL username
//         password: 'new_password', // MySQL password for the 'root' user
//         database: 'online_learning_platform_admin' 
//          // Name of your database  // use sql mini project database here
//       }); 

//     connection.connect().then((success)=>{
//         console.log("connected sql....");
        
//     }).catch((err)=>console.log(err));
// }

// makeConnection();

// module.exports=makeConnection;


const mysql = require('mysql2/promise');

let connection;

async function makeConnection() {
    if (!connection) {
        connection = await mysql.createConnection({
        host: 'localhost',       // Use 'localhost' since your MySQL server is on the same machine
        user: 'root',            // MySQL username
        password: 'new_password', // MySQL password for the 'root' user
        database: 'online_learning_platform_admin' 
         // Name of your database  // use sql mini project database here
        });
        console.log("MySQL database connected");
    }
    return connection;
}

module.exports = makeConnection;