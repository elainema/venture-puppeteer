var fs = require("fs");
var bitmap = fs.readFileSync("./app.png");
let base64str = Buffer.from(bitmap, 'binary').toString('base64'); // base64编码
console.log(base64str);