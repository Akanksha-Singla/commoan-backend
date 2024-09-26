const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    // _id: Number,
    // emp_name:  { type: String, default: "neosoft" },
    // emp_email: String,
    // emp_salary: Number,
    // emp_joiningDate: Date,
    // emp_experience:Number,
    // emp_deptCode:String,
    // emp_pic:String,

    // empId: 2,
    _id:Number,
    empName :String,
    emailId:String,
    basicSalary:Number,
    joiningDate:Date,
    deptCode:String,
    experience:Number,
    secreteCode:Number,
    empPic:{
      data:Buffer,
      contentType:String
    }

    
    // confirmCode: '123'

  });
  
  const EmployeeModel= mongoose.model('Employee',empSchema);

  module.exports = EmployeeModel