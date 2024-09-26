const fs = require("node:fs/promises");
const { log } = require("node:console");
const file ="../files/employee.json"
// try{
//     fs.readFile(file,(error,data)=>{
//         if(error)
//             throw new Error(error)
//      const jsonData = JSON.parse(data)
//      console.log(jsonData.employeeREcords)
//     })
// }
// catch(err){
//     console.log(err)
// }
// console.log("furhter")
async function readJSONData(){
    const jsondata=await  fs.readFile(file);
    //console.log(jsondata);
    const array=JSON.parse(jsondata).employeeREcords;
   // console.log(array);
    return array;
}

async function writeJSONData(){
    let array=await readJSONData();
    //console.log(array);
    const newemp={
        "id":789,
        "name":"seema",
        "salary":90000
    }
    array.push(newemp)
    const jsondata={
        "employeerecords":array
    }
    await fs.writeFile(file, JSON.stringify(jsondata)).catch(err=>console.log(err))
    console.log("DONE");
       
}
writeJSONData();