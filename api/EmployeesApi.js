const EmployeeModel = require("../model/api/employeeModel");

async function getAllEmployees() {
  return await EmployeeModel.find();
}

async function getAllEmployees2() {
  try {
    const employees = await EmployeeModel.find();
    console.log("Raw employee data:", employees); // Debugging

    return employees.map((employee) => {
      console.log("Processing employee:", employee); // Debugging

      if (employee.empPic && employee.empPic.data) {
        const base64Data = employee.empPic.data.toString("base64");
        console.log("Base64 image data:", base64Data); // Debugging

        return {
          ...employee.toObject(),
          empPic: `data:${employee.empPic.contentType};base64,${base64Data}`,
        };
      } else {
        console.warn("No empPic data found for employee:", employee); // Debugging
        return employee;
      }
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error; // Ensure to propagate errors
  }
}

async function getEmplyeeById(id) {
  return await EmployeeModel.findById(id);
}

async function deleteEmplyeeById(id) {
  return await EmployeeModel.deleteOne({ _id: id });
}

const employee = {
  _id: 112,
  emp_name: "rahul",
  emp_email: "roma@gmail.com",
  emp_salary: 79000,
};

async function updateEmployee(employee) {
  console.log("Employee", employee);
  return await EmployeeModel.updateOne(
    { _id: employee._id },
    employee
    // {
    //     emp_name:employee.emp_name,
    //     emp_email:employee.emp_email,
    //     emp_salary:employee.emp_salary
    // }
  );
}

//find one and update

const employee2 = {
  //by sending id seperate
  _id: 112,
  emp_name: "ravinder",
  emp_email: "roma@gmail.com",
  emp_salary: 79000,
};
async function updateEmployee2(id, employee) {
  console.log("id", id, "data", employee);
  const filter = { _id: id };
  const updates = employee;
  return await EmployeeModel.updateOne(filter, updates);
}

const newEmp = {
  _id: 113,
  emp_name: "ramesh",
  emp_email: "ramesh@gmail.com",
  emp_salary: 79000,
};
async function addEmployee(employee) {
  try {
    const employeeDoc = new EmployeeModel(employee);

    return await employeeDoc.save();
  } catch {
    console.log("Duplicated key error");
  }
}

async function getEmployeeByNameLike(empName) {
 
  const trimmedName = empName.trim();


  console.log("Search Name:", trimmedName);
  const regexPattern = new RegExp(trimmedName, 'i'); //case insesi
  console.log("Regex Pattern:", regexPattern);
  try {
    const employees = await EmployeeModel.find({
      empName: { $regex: regexPattern}
    });
    console.log("Employees with similar names:", employees);
    return employees;
  } catch (error) {
    console.error("Error finding employees by name like:", error);
    throw error;
  }
}


async function uploadEmployeePic(_id, empPic) {
  const filter = { _id: _id };

  const updates = { empPic: empPic };
  return await EmployeeModel.updateOne(filter, updates);
}

module.exports = {
  uploadEmployeePic,
  getAllEmployees,
  getAllEmployees2,
  getEmplyeeById,
  deleteEmplyeeById,
  addEmployee,
  updateEmployee,
  updateEmployee2,
  getEmployeeByNameLike
};
