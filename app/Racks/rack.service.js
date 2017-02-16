"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var RackService = (function () {
    function RackService() {
        this.testNewData = [];
        this.thereIsADatacenter = false;
        this.currentSite = {
            site: -1,
            building: -1,
            datacenter: -1
        };
        this.rackList = [];
        this.browsers = [
            {
                installed: false,
                name: 'Firefox',
                img: './app/EquipmentComponents/img/firefox-active.png'
            },
            {
                installed: false,
                name: 'Chrome',
                img: './app/EquipmentComponents/img/chrome-active.png'
            },
            {
                installed: false,
                name: 'IE',
                img: './app/EquipmentComponents/img/ie-active.png'
            }
        ];
    }
    //add file to the correct directory
    RackService.prototype.addFile = function (name, directory) {
        var localname = name;
        if (directory != '') {
            //this is a hack workaround javascript recursive implementation returning 'undefined'
            this.directoryToAdd = {};
            for (var d in this.testNewData) {
                //another hack
                //if this one specific returned result !== undefined, allow logic to continue
                if (this.recursiveCheckForFolder(directory.split('/'), this.testNewData[d]) !== undefined) {
                    //preventing duplicates
                    for (var file in this.directoryToAdd.files) {
                        var highestNumber = 0;
                        //select additional characters not in specified name
                        //for example: if name === file and file already exists, append, creating file1, file2, file3 etc
                        var numberoffileswithname = parseInt(this.directoryToAdd.files[file].substring(localname.length, this.directoryToAdd.files[file].length));
                        if (this.directoryToAdd.files[file].includes(localname)) {
                            if (numberoffileswithname > highestNumber) {
                                highestNumber = numberoffileswithname;
                            }
                            name = localname + (highestNumber + 1);
                        }
                    }
                    this.directoryToAdd.files.push(name);
                }
            }
        }
    };
    RackService.prototype.addFolder = function (name, directory) {
        var localname = name;
        //TODO: FIX 
        //CURRENTLY DOES NOT CHECK FOR DUPLICATES IN THE HOME directory
        //HOME DIRECTORY SHOULD ONLY CONTAIN 1 FOLDER "PROJECTNAME"
        if (directory === 'home') {
            this.testNewData.push({
                name: name,
                files: [],
                folders: []
            });
        }
        if (directory != '') {
            this.directoryToAdd = {};
            //look in data object
            for (var d in this.testNewData) {
                //recurse over list of directory names
                if (this.recursiveCheckForFolder(directory.split('/'), this.testNewData[d]) !== undefined) {
                    //if object is found
                    //check to see if file name already exists
                    for (var folder in this.directoryToAdd.folders) {
                        var highestNumber = 0;
                        var numberoffiles = parseInt(this.directoryToAdd.folders[folder].name.substring(localname.length, this.directoryToAdd.folders[folder].name.length));
                        if (this.directoryToAdd.folders[folder].name.includes(localname)) {
                            if (numberoffiles > highestNumber) {
                                highestNumber = numberoffiles;
                            }
                            name = localname + (highestNumber + 1);
                        }
                    }
                    this.directoryToAdd.folders.push({
                        name: name,
                        files: [],
                        folders: []
                    });
                }
                ;
            }
        }
    };
    //Check to see if there are more folders in the found directory 
    RackService.prototype.recursiveIterate = function (directories, obj) {
        var numberOfExistingFiles = 0;
        //obj is a folder
        //if there is only 1 folder in this folder
        // if(obj.length === 1){
        //     //check for the name we want in directories[0]
        //     return this.recursiveCheckForFolder(directories, obj[0]);
        // }
        for (var folder in obj) {
            if (obj[folder].name === directories[0]) {
                return this.recursiveCheckForFolder(directories, obj[folder]);
            }
        }
    };
    //look for folder name
    RackService.prototype.recursiveCheckForFolder = function (directories, obj) {
        for (var d in directories) {
            //found foldername
            if (obj.name === directories[d]) {
                //if there are more directories to check for
                if (directories.length > 1) {
                    //pop off the one we already found
                    directories.shift();
                    //check to see if there are more folders in this directory
                    return this.recursiveIterate(directories, obj.folders);
                }
                else {
                    this.directoryToAdd = obj;
                    //return the object we want
                    return obj;
                }
            }
        }
    };
    RackService.prototype.getRacksByPath = function (directory) {
        return this.rackList[directory];
    };
    RackService.prototype.updateBrowsers = function (result) {
        //fix the result so that it is correct
        console.log(result);
        this.browsers = [];
        console.log(result);
        for (var i = 0; i < result.length; i++) {
            if (result[i].toLowerCase().includes('firefox')) {
                this.browsers.push({
                    installed: true,
                    name: 'Firefox',
                    img: './app/EquipmentComponents/img/firefox-active.png'
                });
            }
            else if (result[i].toLowerCase().includes('chrome')) {
                this.browsers.push({
                    installed: true,
                    name: 'Chrome',
                    img: './app/EquipmentComponents/img/chrome-active.png'
                });
            }
            else if (result[i].toLowerCase().includes('iexplore')) {
                this.browsers.push({
                    installed: true,
                    name: 'IE',
                    img: './app/EquipmentComponents/img/ie-active.png'
                });
            }
        }
        console.log(this.browsers);
    };
    RackService.prototype.generateEmptyRack = function (directory) {
        console.log(directory);
        var slotArray = [];
        var rackSize = 42;
        var rackWidth = 190;
        var shouldHideSlot = false;
        var emptySlot = {
            'e': {
                'name': 'Empty',
                'imgUrl': './app/Racks/img/1274237_300x300.jpg',
                'height': 1
            },
            'w': 190
        };
        var rackCount = 1;
        for (var i = 0; i < rackSize; i++) {
            slotArray.push({
                'equipmentActive': false,
                'slotid': i,
                'shouldHideSlot': shouldHideSlot,
                'object': emptySlot,
            });
        }
        if (this.rackList[directory] === undefined) {
            this.rackList[directory] = [];
        }
        var rackID = 'rack-' + this.rackList[directory].length;
        this.rackList[directory].push({ id: rackID, slots: slotArray });
    };
    RackService.prototype.updateRack = function (directory, rackId, slotId, newSlotValue, activeStatus) {
        var success = false;
        if (newSlotValue.e.height > 1) {
            success = this.checkSlotsForValid(directory, rackId, slotId, newSlotValue.e.height);
        }
        else if (newSlotValue.e.height === 1) {
            success = true;
        }
        if (success) {
            //'rack-0', 'rack-10', 'rack-12' etc, split on '-'
            //the first index [rack, 0] is the index of this.racklist[directory]
            this.rackList[directory][rackId.toString().split('-')[1]].slots[slotId].equipmentActive = activeStatus;
            this.rackList[directory][rackId.toString().split('-')[1]].slots[slotId].object = {
                e: newSlotValue.e,
                w: newSlotValue.w
            };
            this.consumeSlots(directory, rackId, slotId, newSlotValue.e.height);
        }
        return success;
    };
    RackService.prototype.checkSlotsForValid = function (directory, rackId, startIndex, numberOfSlotsToConsume) {
        var indexToConsume = startIndex + 1;
        numberOfSlotsToConsume = numberOfSlotsToConsume - 1;
        while (numberOfSlotsToConsume > 0) {
            //check to see if slot is occupied and active already
            if (this.rackList[directory][rackId.toString().split('-')[1]].slots[indexToConsume].equipmentActive) {
                //if so, don't add, slot is occupied and configured
                return false;
            }
            indexToConsume++;
            numberOfSlotsToConsume--;
        }
        return true;
    };
    RackService.prototype.consumeSlots = function (directory, rackId, startIndex, numberOfSlotsToConsume) {
        //don't consume the current slot
        var indexToConsume = startIndex + 1;
        numberOfSlotsToConsume = numberOfSlotsToConsume - 1;
        while (numberOfSlotsToConsume > 0) {
            this.rackList[directory][rackId.toString().split('-')[1]].slots[indexToConsume].shouldHideSlot = true;
            indexToConsume++;
            numberOfSlotsToConsume--;
        }
    };
    RackService.prototype.getSavedRack = function (args) {
        return new Array;
    };
    return RackService;
}());
RackService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], RackService);
exports.RackService = RackService;
//# sourceMappingURL=rack.service.js.map