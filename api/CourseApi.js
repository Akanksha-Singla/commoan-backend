const makeConnection = require('../config/mysql');

async function getAllCourses(){
    // find all records from collection
    var connection = await makeConnection();
    const [result,metadata]= await connection.query('SELECT * from Courses');
    return result;
}
async function getAllCourses2() {
  try {
    const connection = await makeConnection();
    const [courses] = await connection.query('SELECT * FROM Courses');
    // console.log('Raw course data:', courses); // Debugging

    return courses.map(course => {
      // console.log('Processing course:', course); // Debugging

      // Assuming `img` field contains the image data in binary format
      if (course.img) {
        // Convert binary data to base64
        const base64Data = Buffer.from(course.img, 'binary').toString('base64');
        // console.log('Base64 image data:', base64Data); // Debugging

        return {
          ...course,
          img: `data:image/jpeg;base64,${base64Data}` // Adjust MIME type if needed
        };
      } else {
        // console.warn('No image data found for course:', course); // Debugging
        return course;
      }
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error; // Ensure to propagate errors
  }
}


async function getCourseById(id){
    var connection = await makeConnection();
    const [result,metadata]=await connection.query(`SELECT * from Courses where CourseID=${id}`);
    return result;
}
async function getCourseById2(id) {
  try {
    const connection = await makeConnection();
    const [results] = await connection.query('SELECT * FROM Courses WHERE CourseID = ?', [id]);
    const course = results[0]; // Assuming there's only one result for the given CourseID

    if (course && course.img) {
      // Convert binary data to base64
      const base64Data = Buffer.from(course.img, 'binary').toString('base64');
      course.img = `data:image/jpeg;base64,${base64Data}`; // Adjust MIME type if needed
    } else if (course) {
      console.warn('No image data found for course:', course);
    }

    return course;
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    throw error; // Ensure to propagate errors
  }
}


async function deleteCourseById(id){
  console.log("id to be deleted",id)
    var connection = await makeConnection();
    const [result,metadata]=await connection.query(`delete from Courses where CourseID=${id}`);
    return result;
}
// async function updateCourse(couseId, course){
//     var connection = await makeConnection();
//     const response=await connection.query(`update Courses 
//                                     set CourseName=${course.CourseName},
//                                         Description=${course.Description},
//                                         Price=${course.Price} ,
//                                         where emp_id=${couseId}`);
   
//     return response; 
// }

// 
const updateCourse = async (courseId, course) => {
  try {
    const connection = await makeConnection();
    const sanitizedCourse = sanitizeInput(course);

    // Prepare the SQL statement
    let sql = `UPDATE Courses 
               SET CourseName = ?, 
                   Description = ?, 
                   InstructorID = ?, 
                   Price = ?, 
                   Discount = ?, 
                   Duration = ?`;
    
    const params = [
      sanitizedCourse.CourseName,
      sanitizedCourse.Description,
      sanitizedCourse.InstructorID,
      sanitizedCourse.Price,
      sanitizedCourse.Discount,
      sanitizedCourse.Duration
    ];

    // Only add the image update if there's new data
    if (sanitizedCourse.img) {
      sql += ', img = ?';
      params.push(sanitizedCourse.img);
    }

    sql += ' WHERE CourseID = ?';
    params.push(courseId);

    const [result] = await connection.execute(sql, params);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

  // Sanitization function
function sanitizeInput(course) {
  for (const key in course) {
    if (course[key] === undefined) {
      course[key] = null; // Replace undefined with null or a default value
    }
  }
  return course;
}
  const addCourse = async (course) => {
    try {
      const pool = await makeConnection();
      const sanitizedCourse = sanitizeInput(course);
      const sql = `INSERT INTO Courses (CourseID, CourseName, Description, InstructorID, Price, Discount, Duration,img) 
                   VALUES (?, ?, ?, ?, ?, ?, ?,?)`;
      const params = [
      sanitizedCourse.CourseID,
      sanitizedCourse.CourseName,
      sanitizedCourse.Description,
      sanitizedCourse.InstructorID,
      sanitizedCourse.Price,
      sanitizedCourse.Discount,
      sanitizedCourse.Duration,
      sanitizedCourse.img // Handle as binary data if necessary
      ];
      const [result] = await pool.execute(sql, params);
      return result;
    } catch (error) {
      console.error(error);
      throw error; // Handle this appropriately in your API route
    }
  };
  // SELECT * FROM Employee WHERE name LIKE '%peter%';

  const searchByName = async (name) => {
    try {
      const connection = await makeConnection();
      const query = `SELECT * FROM Courses WHERE CourseName LIKE ?`; // Use parameterized query
      const [results] = await connection.query(query, [`%${name}%`]); // Pass the parameter with wildcards
  
      // If there are courses found with images, convert each image to base64
      const courses = results.map(course => {
        if (course.img) {
          const base64Data = Buffer.from(course.img, 'binary').toString('base64');
          course.img = `data:image/jpeg;base64,${base64Data}`; // Adjust MIME type if needed
        }
        return course;
      });
  
      return courses; // Return all matching courses
    } catch (error) {
      console.error('Error fetching courses by name:', error);
      throw error; // Ensure to propagate errors
    }
  };
  

// async function addEmployee(employee){
//     const connection=await connection();
//     const response=await connection.query(`insert into employees
//          values(${employee.empId}, ${employee.empName}, ${employee.empSalary}, ${employee.empEmail})`);
//     connection.release();
//     return response;
// }
module.exports= {getAllCourses,getAllCourses2,getCourseById,getCourseById2,deleteCourseById,updateCourse,addCourse,searchByName}