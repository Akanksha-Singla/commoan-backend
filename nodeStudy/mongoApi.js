const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://singlaakanksha92:3N2yyQiZi1aEVDcz@cluster0.rgxmtwz.mongodb.net/Training?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((message) => {console.log("message") 
    // getAllEmployees()
    findEmployee();
    
  })

  .catch((err) => console.log(err));

const empSchema = new mongoose.Schema({
  _id: Number,
  emp_name:  { type: String, default: "neosoft" },
  emp_email: String,
  emp_salary: Number,
});

const EmployeeModel= mongoose.model('Employee',empSchema);

// async function getAllEmployees(){
//   const res =  await EmployeeModel.find()
//      console.log("res",res);
// }

async function findEmployee(name){
    const res =  await EmployeeModel.findOne({emp_name : "ravinder"})
       console.log("res",res);
  }



   