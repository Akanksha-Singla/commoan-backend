const fs = require('node:fs')
try{
    fs.readFile('./files/tendulkar.txt','utf-8',(error,data)=>{
        if(error){
            throw new Error('error')

        }
        console.log(data)
        })
   
}

catch(err){
 console.log(err)       
}

console.log("further")

try{
    fs.writeFile('./files/tendulkar.txt','new content',(error)=>{
        if(error){
            throw new Error('error in writing a file')

        }
        console.log("write opnt done")
        })
   
}

catch(err){
 console.log(err)       
}

console.log("further operations")