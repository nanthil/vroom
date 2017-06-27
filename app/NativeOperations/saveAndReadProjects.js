
let path = 'app/SaveData/Projects/'


function saveProject(name, jsonData) {
    fs.writeFile(path + name + '.txt', jsonData, function(err) {
        console.log(JSON.parse(jsonData))
        if(err) {
            return err;
        }
    });
}

let readProject = (projectName, callback) => {
    var deferred = new $.Deferred();
    var result;
    fs.readFile(path + projectName, 'utf8', function(err, data){
        if(err) throw err;
        else {
            result = data;
            deferred.resolve(JSON.parse(result));
        }
    });
    return deferred.promise();
}
var getAllFilesFromPath = () => {
    //var get = 'start C:\\Users\\karkat\\git\\vroom\\app\\NativeOperations\\getfiles.bat';
    // var child = exec(get, function(err, stdout, stderr) {
    //     console.log('ding');
    //     if (err) throw err;
    //     console.log(stdout);
    // });
    
    var deferred = new $.Deferred();
    let result = []
    fs.readdir('app/SaveData/Projects/', (err, files) => {
        result = files;
        console.log(files);
        deferred.resolve(result);
    })
    console.log(result);
    return deferred.promise();
}