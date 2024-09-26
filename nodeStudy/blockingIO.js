const fs = require('node:fs');

const filePath = './files/tendulkar.txt';
fs.exists(filePath,(exist)=>console.log(exist))
const content=fs.readFileSync('./files/tendulkar.txt','utf-8');
console.log(content);
console.log("further")

fs.writeFileSync(filePath,"sample data")

console.log("after write")

function readData(){
const content=fs.readFileSync('./files/tendulkar.txt','utf-8');
console.log(content);
return content
}
function writeData(content){
    fs.writeFileSync(filePath,content)

}

writeData("i am new contents")
console.log("writing completed");



const dataToAppend = 'This is the data to append.\n';

try {
  fs.appendFileSync(filePath, dataToAppend);
  console.log('Data successfully appended to file.');
} catch (err) {
  console.error('Error appending data to file:', err);
}

readData();