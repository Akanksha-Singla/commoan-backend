const fs = require("node:fs");
const { open } = require("node:fs/promises");

const fd = new File([], "./files/Mangeshkar.txt");
const contents = fs.readFileSync(fd.name);
console.log(contents.toString());

console.log("___________________");

async function readData() {
  const fo = await open("./files/Mangeshkar.txt");
  let array = new Buffer.alloc(50);
  fo.read(array, 0, 10, 0).then((object) =>
    console.log(object.buffer.toString())
  );
  // console.log(array.toString());
}
readData();
