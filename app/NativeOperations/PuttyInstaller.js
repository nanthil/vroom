//32 bit installer
//https://the.earth.li/~sgtatham/putty/latest/w32/putty-0.69-installer.msi
//64 bit
//https://the.earth.li/~sgtatham/putty/latest/w64/putty-64bit-0.69-installer.msi


var https = require('https');
var fs = require('fs');

// var file = fs.createWriteStream("./putty-installer.msi");
// var request = https.get("https://the.earth.li/~sgtatham/putty/latest/w32/putty-0.69-installer.msi", function(response) {
  
//   response.pipe(file);
// });
var fs = require('fs');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

// App variables
var file_url = 'https://the.earth.li/~sgtatham/putty/latest/w32/putty-0.69-installer.msi';

var downloadPutty = function(file_url) {
    var download = 'start C:\\Users\\karkat\\git\\vroom\\app\\NativeOperations\\test.bat';
    var child = exec(download, function(err, stdout, stderr) {
        if (err) throw err;
    });
};
downloadPutty(file_url);
