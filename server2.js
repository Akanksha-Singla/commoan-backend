const api= require('./api/CourseApi');
const {getAllCourses,getAllCourses2,getCourseById,getCourseById2,deleteCourseById,updateCourse,addCourse,searchByName}=api;
const bodyParser=require("body-parser");

const express=require("express");

const cors = require('cors')
const multer = require('multer')
const upload = multer();


const app=express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())


app.listen(3000, ()=>console.log("application server started..."))

require("./config/mysql");

app.get("/", function(request, response){
    console.log(request);
    response.send("WELCOME TO FIRST NODE PROJECT WITH SQL...........");
});

app.get('/courses/getall', async function(request, response){
    const data=await getAllCourses2();
    response.send(data);
});
app.get("/courses/get/:courseId", async function(request, response){
    // console.log("request.params.courseId :backend",request.params.courseId)
    const data=await getCourseById2(request.params.courseId);
    response.send(data);
});
app.get("/course/getName/:courseName", async function(request, response){
    // console.log("request.params.courseId :backend",request.params.courseId)
    const data=await searchByName(request.params.courseName);
    response.send(data);
});

app.delete("/courses/delete/:courseId", async function(request, response){
    console.log(request.params)
    const data=await deleteCourseById(request.params.courseId);
    console.log("data to be deleted",data)
    response.send(data);
});


// const parser=bodyParser.urlencoded({extended:true})

app.post("/course/add",upload.single('img'), async function(request, response){
    console.log("added body",request.body);
    console.log("file",request.file);
    // Add the file buffer to the course data
    
  request.body.img = request.file ? request.file.buffer : null;
    const data=await addCourse(request.body);
    console.log(data);
    response.send(data);
});



app.put("/course/update/:id", upload.single('img'),async function(request, response){
    // console.log(request.body); 
    // console.log(request.file);
   request.body.img = request.file ? request.file.buffer : null;
    const {CourseID, ...course}=request.body;
    // console.log("cid",CourseID);
    // console.log("course",course);
    // console.log(request.params)
    const data=await updateCourse(request.params.id,course);
    response.send(data);
});

// app.put("/course/update/:id", upload.single('img'), async function(request, response) {
//     try {
//         console.log(request.body); 
//         console.log(request.file);
        
//         // If an image is uploaded, convert it to base64
//         if (request.file) {
//             request.body.img = request.file.buffer.toString('base64'); // Convert the buffer to base64
//         } else {
//             quest.body.img = null;
//         }

//         const courseId = request.params.id;
//         const { CourseID, ...course } = request.body;

//         console.log("cid", CourseID);
//         console.log("course", course);
//         console.log(request.params);

//         const data = await updateCourse(courseId, course);
//         response.send(data);
//     } catch (error) {
//         console.error(error);
//         response.status(500).send({ message: 'Error updating course', error });
//     }
// });


