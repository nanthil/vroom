
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