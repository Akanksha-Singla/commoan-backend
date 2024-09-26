const fs = require("node:fs/promises");
const filePath = "./files/tendulkar.txt";


async function readFile() {
  const data = await fs.readFile(filePath, "utf-8");
  console.log(data);
}

fs.readFile(filePath, "utf-8")
  .then((data) => console.log("data:",data))
  .catch((err) => console.log(err));



const dataToAppend = 'This is the data to append.\n';

fs.appendFile(filePath, dataToAppend, (err) => {
  if (err) {
    console.error('Error appending data to file:', err);
  } else {
    console.log('Data successfully appended to file.');
  }
});

readFile();

