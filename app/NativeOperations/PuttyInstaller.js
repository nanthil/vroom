//32 bit installer
//https://the.earth.li/~sgtatham/putty/latest/w32/putty-0.69-installer.msi
//64 bit
//https://the.earth.li/~sgtatham/putty/latest/w64/putty-64bit-0.69-installer.msi


var http = require('http');
var fs = require('fs');

var file = fs.createWriteStream("file.jpg");
var request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
  response.pipe(file);
});