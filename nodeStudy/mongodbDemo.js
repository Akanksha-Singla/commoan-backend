const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://singlaakanksha92:3N2yyQiZi1aEVDcz@cluster0.rgxmtwz.mongodb.net/Training?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((message) => {console.log("message") 
    // addEmployee(newEmp);
    getAllEmployees()
    //  getEmplyeeById(111);
    //  deleteEmplyeeById(111);
    //  updateEmployee(employee);
     updateEmployee2(112,employee)
  })

  .catch((err) => console.log(err));

const empSchema = new mongoose.Schema({
  _id: Number,
  emp_name:  { type: String, default: "neosoft" },
  emp_email: String,
  emp_salary: Number,
});

const EmployeeModel= mongoose.model('Employee',empSchema);


async function getAllEmployees(){
  const res =  await EmployeeModel.find()
     console.log("res",res);
}

async function getEmplyeeById(id){
    const res =  await EmployeeModel.findById(id)
       console.log("res",res);
  }


  async function deleteEmplyeeById(id){
    const res =  await EmployeeModel.deleteOne({_id:id})
       console.log("res",res);
  }

  const employee = {
    _id:112,
    emp_name:"rahul",
    emp_email:"roma@gmail.com",
    emp_salary:79000
  }

  async function updateEmployee(employee){
    const res =  await EmployeeModel.updateOne({_id:employee._id},employee
        // {
        //     emp_name:employee.emp_name,
        //     emp_email:employee.emp_email,
        //     emp_salary:employee.emp_salary
        // }
    )
       console.log("res",res);
  }

  //find one and update

const employee2 =  {
   //by sending id seperate
   _id:112,
    emp_name:"ravinder",
    emp_email:"roma@gmail.com",
    emp_salary:79000
  }

  async function updateEmployee2(id,employee){
    const filter ={_id:id};
    const updates =employee2;
    const res = await EmployeeModel.updateOne(filter,updates)
      console.log(res)
  }

  const newEmp={
    _id:113,
    emp_name:"ramesh",
    emp_email:"ramesh@gmail.com",
    emp_salary:79000

  }
  async function addEmployee(employee){
    const employeeDoc = new EmployeeModel(employee);
    const res = await employeeDoc.save();
    console.log("insterted",res)
  }