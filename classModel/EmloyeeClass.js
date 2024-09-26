class Employee {
     _id;
    // emp_name;
    // emp_salary;
    // emp_email;
    // emp_joiningDate;
    // emp_experience;
    // emp_deptCode;
    // emp_pic;
    empName;
    joiningDate;
    basicSalary;
    experience;
    emailId;
    deptCode;
    secreteCode;
    employeePic;
    

    // constructor(_id, emp_name, emp_salary, emp_email,emp_joiningDate,emp_joiningDate,emp_deptCode) {
    //     this._id = id;
    //     this.emp_name = emp_name;
    //     this.emp_email = emp_email;
    //     this.emp_salary = emp_salary;
    //     this.emp_joiningDate =emp_joiningDate;
    //     this.emp_experience=emp_experience;
    //     this.emp_deptCode =emp_deptCode;
    //     this.emp_pic = emp_pic;
    // }

    constructor( _id, 
         empName,
        joiningDate,
        basicSalary,
        experience,
        emailId,
        deptCode,
        secreteCode,employeePic){

            this._id=_id,
            this.empName =empName,
            this.joiningDate =joiningDate,
            this.basicSalary =basicSalary,
            this.experience =experience,
            this.emailId=emailId,
            this.deptCode =deptCode,
            this.secreteCode=secreteCode,
            this.employeePic=employeePic

    }
}

module.exports = Employee;