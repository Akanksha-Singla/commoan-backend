const api = require("./api/EmployeesApi");
const {
  getAllEmployees,
  getEmplyeeById,
  deleteEmplyeeById,
  addEmployee,
  updateEmployee,
  updateEmployee2,
  uploadEmployeePic,
  getEmployeeByNameLike

} = api;
const multer = require('multer')
const cors = require('cors')
// const {middle1,middle2} = require("./middlewares")
// const bodyParser = require("body-parser");

const express = require("express");

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())
app.listen(5000, () => console.log("application server started..."));

require("./config/mongodb");


app.get("/", function (request, response) {
  console.log(request);
  response.send("WELCOME TO FIRST NODE PROJECT WITH EXPRESS...........");
});

app.get("/employees/getall", async function (request, response) {
  const data = await getAllEmployees();
  response.send(data);
});


app.get("/employees/get/:empId", async function (request, response) {
  const data = await getEmplyeeById(request.params.empId);
  response.send(data);
});

// Server-side
app.get("/employees/getByName/:empName", async function (request, response) {
  try {
    const { empName } = request.params; // Extract empName correctly
    console.log("request.params:", empName);

     const data = await getEmployeeByNameLike(empName); // Call the function with correct name
    response.send(data);
  } catch (error) {
    console.error("Error fetching employee:", error);
    // response.status(500).send("Error fetching employee");
  }
});


app.delete("/employees/delete/:empId", async function (request, response) {
  const data = await deleteEmplyeeById(request.params.empId);
  response.send(data);
});

// app.use(function(req,res,next){
//     console.log("middle ware"); this is custom middle ware we can put them in seprate file and then export from there and pass in functionn
//     next();
// })
//app.use(middle1)
// const parser=bodyParser.urlencoded({extended:true})
//use of builtin middle ware
// app.use(bodyParser.urlencoded({ extended: true }));


const upload = multer();

app.post("/employees/fileadd",upload.single("empPic"), async function(request, response){

    console.log("pic:", request.file);

    empPic=request.file;

});





app.post("/employees/add",async function (request, response) {
  console.log(request.body);
  // console.log(request.file);
  const data = await addEmployee(request.body);
  // console.log("data",data);
  response.send(data);
});

app.put("/employees/update/:id", async function (request, response) {
  console.log("body",request.body);
  const updatedData= request.body;
  const { _id, ...employee } = request.body
  console.log(_id);
  console.log(employee);
  //if we are sending a single object
  // const data = await updateEmployee(updatedData);

  //if we are sending id and data seperatly we use updateEmployee2 as we are sending id n data seperatly
  const data=await updateEmployee2(request.params.id ,employee);
  console.log("data to be sent",data)
  response.send(data);
});


// app.put("/employees/upload/:id",upload.single(),aync function(req,res){
//   console.log()
// })
app.put("/employees/upload/:_id", upload.single('empPic'), async function(request, response){
  // console.log("in file upload");
  // console.log(request.params._id);
  // console.log(request.file);
  // console.log(request.file)
const data=await uploadEmployeePic(request.params._id,request.file.buffer);
console.log(data)
  response.send(data);
 
});