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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("../NativeOperations/saveAndReadProjects");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var RackService = (function () {
    function RackService(zone) {
        this.testNewData = [];
        this.rackList = {};
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
        this.emptySlot = {
            'config': {},
            'e': {
                'name': 'Empty',
                'imgUrl': '',
                'height': 1
            },
            'w': 190
        };
        this.getFiles(zone);
    }
    RackService.prototype.getFiles = function (z) {
        var _this = this;
        getAllFilesFromPath().done(function (d) {
            z.run(function () { return _this.files = d; });
        });
    };
    //add file to the correct directory
    RackService.prototype.findFile = function (name, directory, action, oldFileName) {
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
                    if (action !== undefined)
                        action(this.directoryToAdd, name, oldFileName);
                }
            }
        }
    };
    RackService.prototype.findFolder = function (name, directory, action) {
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
                    //do
                    if (action !== undefined)
                        action(this.directoryToAdd, name);
                }
                ;
            }
        }
    };
    RackService.prototype.addFileToDirectory = function (directory, name) {
        directory.files.push(name);
    };
    RackService.prototype.addFolderToDirectory = function (directory, name, projectFolder) {
        directory.folders.push({
            project: projectFolder ? true : false,
            name: name,
            showContents: false,
            files: [],
            folders: [],
            tags: []
        });
    };
    RackService.prototype.renameFileInRackList = function (oldDirectoryName, newDirectoryName, folder) {
        if (folder === undefined) {
            this.rackList[newDirectoryName] = this.clone(this.rackList[oldDirectoryName]);
            if (this.shitToDeleteBecauseReasons === undefined)
                this.shitToDeleteBecauseReasons = [oldDirectoryName];
            else
                this.shitToDeleteBecauseReasons.push(oldDirectoryName);
        }
        else {
            //TODO actually create the new item in the racklist, and then set up for deletion the old folders etc
            console.log('fix me mother fuker');
        }
    };
    RackService.prototype.clone = function (obj) {
        if (null == obj || "object" != typeof obj)
            return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = obj[attr];
        }
        return copy;
    };
    RackService.prototype.renameFile = function (directory, name, oldFileName) {
        directory.files = directory.files.map(function (x) { return x = x === oldFileName ? name : x; });
    };
    RackService.prototype.renameFolder = function (directory, name) {
        directory.name = name;
    };
    //Check to see if there are more folders in the found directory 
    RackService.prototype.recursiveIterate = function (directories, obj) {
        var numberOfExistingFiles = 0;
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
                    this.directoryToAdd.showContents = true;
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
        for (var i = 0; i < result.length; i++) {
            if (result[i].toLowerCase().includes('firefox')) {
                this.browsers = this.browsers.filter(function (a) { return a.name !== 'Firefox'; });
                this.browsers.push({
                    installed: true,
                    name: 'Firefox',
                    img: './app/EquipmentComponents/img/firefox-active.png'
                });
            }
            else if (result[i].toLowerCase().includes('chrome')) {
                this.browsers = this.browsers.filter(function (a) { return a.name !== 'Chrome'; });
                this.browsers.push({
                    installed: true,
                    name: 'Chrome',
                    img: './app/EquipmentComponents/img/chrome-active.png'
                });
            }
            else if (result[i].toLowerCase().includes('iexplore')) {
                this.browsers = this.browsers.filter(function (a) { return a.name !== 'IE'; });
                this.browsers.push({
                    installed: true,
                    name: 'IE',
                    img: './app/EquipmentComponents/img/ie-active.png'
                });
            }
        }
    };
    RackService.prototype.generateEmptyRack = function (directory) {
        var slotArray = [];
        var rackSize = 42;
        var rackWidth = 190;
        var shouldHideSlot = false;
        var rackCount = 1;
        for (var i = 0; i < rackSize; i++) {
            slotArray.push({
                'equipmentActive': false,
                'slotid': i,
                'shouldHideSlot': shouldHideSlot,
                'object': this.emptySlot,
            });
        }
        if (this.rackList[directory] === undefined) {
            this.rackList[directory] = [];
        }
        var rackID = 'rack-' + this.rackList[directory].length;
        this.rackList[directory].push({ id: rackID, slots: slotArray });
    };
    RackService.prototype.deleteSlot = function (directory, newRackId, oldRackId, newSlotId, oldSlotId, e) {
        if (this.checkSlotsForValid(directory, newRackId, newSlotId, e.height)) {
            this.rackList[directory][oldRackId.toString().split('-')[1]].slots[oldSlotId].equipmentActive = false;
            this.rackList[directory][oldRackId.toString().split('-')[1]].slots[oldSlotId].object = this.emptySlot;
            var slotsToUnconsume = e.height;
            while (slotsToUnconsume > 0) {
                this.rackList[directory][oldRackId.toString().split('-')[1]].slots[oldSlotId + slotsToUnconsume].shouldHideSlot = false;
                slotsToUnconsume--;
            }
        }
    };
    RackService.prototype.updateEquipmentConfigInRack = function (directory, rackId, slotId, config) {
        //this.rackList[directory][rackId.toString().split('-')[1]].slots[slotId].equipmentActive = activeStatus;
        console.log(this.rackList[directory][rackId.toString().split('-')[1]].slots[slotId]);
        console.log(slotId);
        this.rackList[directory][rackId.toString().split('-')[1]].slots[slotId].object.config = config;
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
                w: newSlotValue.w,
                id: newSlotValue.id
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
            if (this.rackList[directory][rackId.toString().split('-')[1]].slots[indexToConsume].equipmentActive ||
                this.rackList[directory][rackId.toString().split('-')[1]].slots[indexToConsume].shouldHideSlot) {
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
    RackService.prototype.resetStateForNewProject = function () {
        this.rackList = {};
        this.testNewData = [];
        this.projectName = undefined;
    };
    RackService.prototype.nameProject = function (name) {
        this.projectName = name;
    };
    RackService.prototype.save = function () {
        var _this = this;
        var saveState = {};
        saveState['data'] = {};
        saveState['data']['files'] = this.testNewData;
        saveState['data']['racks'] = this.clone(this.rackList);
        console.log(this.rackList, '[save state]:', saveState);
        saveProject(this.projectName, JSON.stringify(saveState));
        if (this.shitToDeleteBecauseReasons !== undefined) {
            this.shitToDeleteBecauseReasons.map(function (x) { delete _this.rackList[x]; });
            this.shitToDeleteBecauseReasons = [];
        }
        ;
    };
    RackService.prototype.open = function (name, z) {
        var _this = this;
        readProject(name).done(function (d) {
            console.log(d);
            z.run(function () {
                _this.projectName = name.replace('.txt', '');
                _this.rackList = d.data.racks;
                _this.testNewData = d.data.files;
            });
        });
    };
    return RackService;
}());
RackService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone])
], RackService);
exports.RackService = RackService;
//# sourceMappingURL=rack.service.js.map