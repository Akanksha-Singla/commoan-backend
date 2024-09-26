const api = require("./api/EmployeesApi");
const {
  getAllEmployees,
  getAllEmployees2,
  getEmplyeeById,
  deleteEmplyeeById,
  addEmployee,
  updateEmployee,
  updateEmployee2
} = api;
const multer = require('multer')

const memoryStorage = multer.memoryStorage();

const path = require('path')
const fs=require('fs')
const cors = require('cors')
// const {middle1,middle2} = require("./middlewares")
// const bodyParser = require("body-parser");

const express = require("express");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())
app.listen(5000, () => console.log("application server started..."));

require("./config/mongodb");
//define directory for uploads
const UPLOAD_DIR=path.join(__dirname,'uploads');
//ensure the dir exists
if(!fs.existsSync(UPLOAD_DIR)){
    fs.mkdirSync(UPLOAD_DIR)
}
//CONFIGURE MULTER FOR FILE UPLOADS
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR) // Use the UPLOAD_DIR
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
app.get("/", function (request, response) {
  console.log(request);
  response.send("WELCOME TO FIRST NODE PROJECT WITH EXPRESS...........");
});

app.get("/employees/getall", async function (request, response) {
  const data = await getAllEmployees2();
  response.send(data);
});

app.get("/employees/get/:empId", async function (request, response) {
  const data = await getEmplyeeById(request.params.empId);
  response.send(data);
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


const upload = multer({ storage: memoryStorage });

// app.post("/employees/fileadd",upload.single("empPic"), async function(request, response){

//     console.log("pic:", request.file);

//     empPic=request.file;

// });





app.post("/employees/add",upload.single('empPic'),async function (request, response) {
 console.log("body",request.body);
 console.log("image",request.file);
  const employee={
    ...request.body,
    empPic: request.file ? {
        data: request.file.buffer,
        contentType: request.file.mimetype
      } : null
  }
  const data = await addEmployee(employee);
  console.log("data with img",data);
  response.send(data);


});

app.post("/employees/update", async function (request, response) {
  console.log("body",request.body);
  const updatedData= request.body;
  const { _id, ...employee } = request.body;
  console.log(_id);
  console.log(employee);

  //if we are sending a single object
  // const data = await updateEmployee(updatedData);
  //if we are sending id and data seperatly we use updateEmployee2 as we are sending id n data seperatly

  const data = await updateEmployee2(_id, employee);
  console.log("data to be sent",data)
  response.send(data);
});
