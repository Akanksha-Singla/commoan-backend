
// const EmployeeModel = require("../model/api/emplooyeeModel")
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://singlaakanksha92:3N2yyQiZi1aEVDcz@cluster0.rgxmtwz.mongodb.net/Training?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((message) => {console.log("message") 
    require("../model/api/employeeModel")
    })

  .catch((err) => console.log(err));
