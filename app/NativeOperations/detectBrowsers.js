
//custom code is found in node_modules/winreg/lib
//line 495
// if(items[i].includes('HKEY_LOCAL_MACHINE')){
//           result.push(items[i].replace(/^.*[\\\/]/, ''));
//         }
//place this code in the for loop and comment out other code
//this is the only way to extract the browsers we wish to see from the registry
function detectBrowsers(){
    var foundBrowsers = [];
    var deferred = new $.Deferred();
    regKey = new registry({                                       
        hive: registry.HKLM,                                        // open registry hive HKEY_LOCAL_MACHINE
        key:  '\\SOFTWARE\\WOW6432Node\\Clients\\StartMenuInternet' // key containing browsers
    })

    // list browsers
    regKey.values(function (err, items /* array of RegistryItem */) {
        if (err){
            console.log('ERROR: '+err);
        }
        else {
            foundBrowsers = items;
            deferred.resolve(foundBrowsers);
        }
    });
    return deferred.promise();
}