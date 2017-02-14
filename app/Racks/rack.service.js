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
        this.foldercount = 0;
        this.testNewData = [
            {
                name: 'sites',
                showContents: false,
                files: ['file1', 'file2', 'file3'],
                folders: [
                    {
                        name: 'folder1',
                        showContents: false,
                        files: ['file1', 'file2'],
                        folders: [{
                                name: 'folder1-1',
                                showContents: false,
                                files: ['file1', 'file2', 'file3'],
                                folders: []
                            },
                            {
                                name: 'folder1-2',
                                showContents: false,
                                files: ['file1', 'file2', 'file3'],
                                folders: []
                            }]
                    }, {
                        name: 'folder2',
                        showContents: false,
                        files: ['file1', 'file2', 'file3', 'file4'],
                        folders: [{
                                showContents: false,
                                name: 'folder2-1',
                                files: ['file1', 'file2', 'file3'],
                                folders: []
                            }
                        ]
                    }
                ]
            }
        ];
        this.thereIsADatacenter = false;
        this.currentSite = {
            site: -1,
            building: -1,
            datacenter: -1
        };
        this.siteList = [];
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
    RackService.prototype.addFile = function (name, directory) {
        name = 'working';
        var localname = name;
        if (directory != '') {
            this.directoryToAdd = {};
            for (var d in this.testNewData) {
                if (this.recursiveCheckForFolder(directory.split('/'), this.testNewData[d]) !== undefined) {
                    for (var file in this.directoryToAdd.files) {
                        //if so add the correct number to the end of the file
                        var highestNumber = 0;
                        //the highest number already appended to filename
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
        name = 'working';
        var localname = name;
        if (directory != '') {
            this.directoryToAdd = {};
            //look in data object
            for (var d in this.testNewData) {
                //recurse over list of directory names
                if (this.recursiveCheckForFolder(directory.split('/'), this.testNewData[d]) !== undefined) {
                    //if object is found
                    //check to see if file name already exists
                    for (var folder in this.directoryToAdd.folders) {
                        //if so add the correct number to the end of the file
                        var highestNumber = 0;
                        //the highest number already appended to filename
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
    RackService.prototype.recursiveIterate = function (directories, obj) {
        var numberOfExistingFiles = 0;
        if (obj.length === 1) {
            return this.recursiveCheckForFolder(directories, obj[0]);
        }
        for (var folder in obj) {
            if (obj[folder].name === directories[0]) {
                return this.recursiveCheckForFolder(directories, obj[folder]);
            }
        }
    };
    RackService.prototype.recursiveCheckForFolder = function (directories, obj) {
        for (var d in directories) {
            if (obj.name === directories[d]) {
                if (directories.length > 1) {
                    directories.shift();
                    return this.recursiveIterate(directories, obj.folders);
                }
                else {
                    this.directoryToAdd = obj;
                    return obj;
                }
            }
        }
    };
    RackService.prototype.updateBrowsers = function (result) {
        //fix the result so that it is correct
        console.log(result);
        this.browsers = [];
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
    RackService.prototype.generateEmptyRack = function (room, enclave, rackID) {
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
        console.log(this.currentSite);
        this.siteList[this.currentSite.site]
            .buildings[this.currentSite.building]
            .datacenters[this.currentSite.datacenter]
            .rooms[room]
            .enclaves[enclave].racks[rackID] = slotArray;
        console.log('success');
    };
    RackService.prototype.updateRack = function (room, enclave, rackId, slotId, newSlotValue, activeStatus) {
        var success = false;
        if (newSlotValue.e.height > 1) {
            success = this.checkSlotsForValid(room, enclave, rackId, slotId, newSlotValue.e.height);
        }
        else if (newSlotValue.e.height === 1) {
            success = true;
        }
        if (success) {
            this.siteList[this.currentSite.site]
                .buildings[this.currentSite.building]
                .datacenters[this.currentSite.datacenter]
                .rooms[room]
                .enclaves[enclave].racks[rackId][slotId].equipmentActive = activeStatus;
            this.siteList[this.currentSite.site]
                .buildings[this.currentSite.building]
                .datacenters[this.currentSite.datacenter]
                .rooms[room]
                .enclaves[enclave].racks[rackId][slotId].object = {
                e: newSlotValue.e,
                w: newSlotValue.w
            };
            // this.slotList[slotId].equipmentActive = activeStatus
            // this.slotList[slotId].object = {
            //     e : newSlotValue.e,
            //     w : newSlotValue.w
            // };
            this.consumeSlots(room, enclave, rackId, slotId, newSlotValue.e.height);
        }
        return success;
    };
    RackService.prototype.checkSlotsForValid = function (room, enclave, rackId, startIndex, numberOfSlotsToConsume) {
        var indexToConsume = startIndex + 1;
        numberOfSlotsToConsume = numberOfSlotsToConsume - 1;
        while (numberOfSlotsToConsume > 0) {
            //this.slotList[indexToConsume]
            if (this.siteList[this.currentSite.site]
                .buildings[this.currentSite.building]
                .datacenters[this.currentSite.datacenter]
                .rooms[room]
                .enclaves[enclave].racks[rackId][indexToConsume].equipmentActive) {
                //notify user
                return false;
            }
            indexToConsume++;
            numberOfSlotsToConsume--;
        }
        return true;
    };
    RackService.prototype.consumeSlots = function (room, enclave, rackId, startIndex, numberOfSlotsToConsume) {
        //don't consume the current slot
        var indexToConsume = startIndex + 1;
        numberOfSlotsToConsume = numberOfSlotsToConsume - 1;
        while (numberOfSlotsToConsume > 0) {
            console.log('something');
            this.siteList[this.currentSite.site]
                .buildings[this.currentSite.building]
                .datacenters[this.currentSite.datacenter]
                .rooms[room]
                .enclaves[enclave].racks[rackId][indexToConsume].shouldHideSlot = true;
            indexToConsume++;
            numberOfSlotsToConsume--;
        }
    };
    RackService.prototype.getSavedRack = function (args) {
        return new Array;
    };
    RackService.prototype.addSite = function (value) {
        this.siteList.push({
            name: value,
            showBuildings: false,
            buildings: []
        });
    };
    RackService.prototype.addBldg = function (value, argsToAdd) {
        this.siteList[argsToAdd[0]].buildings.push({
            name: value,
            showDatacenters: false,
            datacenters: []
        });
    };
    RackService.prototype.addDatacenter = function (value, argsToAdd) {
        this.siteList[argsToAdd[0]].buildings[argsToAdd[1]].datacenters.push({
            name: value,
            rooms: []
        });
        console.log(this.siteList[argsToAdd[0]].buildings[argsToAdd[1]].datacenters);
    };
    return RackService;
}());
RackService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], RackService);
exports.RackService = RackService;
//# sourceMappingURL=rack.service.js.map