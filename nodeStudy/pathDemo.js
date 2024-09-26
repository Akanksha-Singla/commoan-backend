//import path 

const path = require('node:path');

// const baseName =path.extname('file://home/neosoft/Desktop/webBasics/Html/HTML5.html')
// console.log(baseName)


let filePathObject ={
    dir:"file://home/neosoft/Desktop/webBasics/Html",
    base:"HTML5.html"
}
let file = path.format(filePathObject)
console.log(file);

const jn=  path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'
console.log(jn)

const seperate = 'foo/bar/baz'.split(path.sep);
console.log(seperate)

// Returns: ['foo', 'bar', 'baz']
// const jn2= path.join('foo', {}, 'bar');
// console.log(jn2)
// Throws 'TypeError: Path must be a string. Received {}'