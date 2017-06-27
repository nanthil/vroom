//32 bit installer
//https://the.earth.li/~sgtatham/putty/latest/w32/putty-0.69-installer.msi
//64 bit
//https://the.earth.li/~sgtatham/putty/latest/w64/putty-64bit-0.69-installer.msi

var exec = require('child_process').exec;
var downloadPutty = () => {
    var download = 'start C:\\Users\\karkat\\git\\vroom\\app\\NativeOperations\\test.bat';
    var child = exec(download, function(err, stdout, stderr) {
        if (err) throw err;
    });
};
downloadPutty();
