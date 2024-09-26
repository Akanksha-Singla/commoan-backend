var mysql = require('mysql2/promise');

// const connection = mysql.createConnection({
//     host: 'localhost',       // Use 'localhost' since your MySQL server is on the same machine
//     user: 'root',            // MySQL username
//     password: 'new_password', // MySQL password for the 'root' user
//     database: 'online_learning_platform_admin'  // Name of your database
//   });

// connection.connect((err, ...args)=>{
//     console.log(err);
//     console.log(args);
// })

var connection ;
async function makeConnection(){
     connection = await mysql.createConnection({
        host: 'localhost',       // Use 'localhost' since your MySQL server is on the same machine
        user: 'root',            // MySQL username
        password: 'new_password', // MySQL password for the 'root' user
        database: 'online_learning_platform_admin' 
         // Name of your database  // use sql mini project database here
      }); 

    connection.connect().then((success)=>{
        console.log("connected....");
        getAllEmployees();
        getCourseById(2);
        // addCourses(newCourse)
        // deleteCourseById(2);
    }).catch((err)=>console.log(err));
}
makeConnection();

async function getAllEmployees(){
    // find all records from collection
    const [result,metadata]=await connection.query('SELECT * from Courses');
    console.log(result);
     console.log("_____________"); 
}

async function getCourseById(id){
    const [result,metadata]=await connection.query(`SELECT * from Courses where CourseID=${id}`);
    console.log(result);
     console.log("_____________"); 
}

async function deleteCourseById(id){
    const [result,metadata]=await connection.query(`delete from Courses where CourseID=${id}`);
    console.log(result);
     console.log("_____________"); 
}

const newCourse = {
    CourseID: 3,
    CourseName: 'Advanced Java',
    Description: 'Advanced concepts in Python programming',
    InstructorID: 2,
    Price: '200.00',
    Discount: '15.00',
    Duration: '8 weeks',
    CreatedAt: "2024-08-05T05:38:54.000Z",
    UpdatedAt: "2024-08-05T05:38:54.000Z"
  }

//   async function addCourses(course){
//      const response = await connection.query(`insert into Courses values(${course.CourseID},
//         ${course.CourseName},${course.Description},${course.InstructorID},
//         ${course.price},${course.Discount},${course.Duration},
//         ${course.CreatedAt},${course.UpdatedAt}`)

//     console.log(response)
//   }