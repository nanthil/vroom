import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class RackService{ 
    directoryToAdd: any;
    foldercount = 0;
    addFile(name:string, directory: string){
        name = 'working'
        var localname = name;    
        if(directory != ''){
            this.directoryToAdd = {};
            for(var d in this.testNewData){
                if(this.recursiveCheckForFolder(directory.split('/'), this.testNewData[d]) !== undefined){
                    for(var file in this.directoryToAdd.files){
                        //if so add the correct number to the end of the file
                        var highestNumber = 0;
                        //the highest number already appended to filename
                        var numberoffileswithname = parseInt(this.directoryToAdd.files[file].substring(localname.length, this.directoryToAdd.files[file].length));
                        if(this.directoryToAdd.files[file].includes(localname)){
                            
                            if (numberoffileswithname > highestNumber){
                                highestNumber = numberoffileswithname;
                            }
                            
                            name = localname + (highestNumber + 1);
                        }
                    }
                    this.directoryToAdd.files.push(name);
                }
            }
        }
    }
    
    addFolder(name: string, directory: string){
        name = 'working'
        var localname = name;
        if(directory != ''){
            this.directoryToAdd = {};

            //look in data object
            for(var d in this.testNewData){

                //recurse over list of directory names
                if(this.recursiveCheckForFolder(directory.split('/'), this.testNewData[d]) !== undefined){
                    //if object is found
                    //check to see if file name already exists
                    for(var folder in this.directoryToAdd.folders){
                        //if so add the correct number to the end of the file
                        var highestNumber = 0;
                        
                        //the highest number already appended to filename
                        var numberoffiles = parseInt(this.directoryToAdd.folders[folder].name.substring(localname.length, this.directoryToAdd.folders[folder].name.length));
                        if(this.directoryToAdd.folders[folder].name.includes(localname)){
                            
                            if (numberoffiles > highestNumber){
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
                };
            }
           
        }
    }
    recursiveIterate(directories: any, obj: any) : any{
        var numberOfExistingFiles = 0;
        if(obj.length === 1){
            return this.recursiveCheckForFolder(directories, obj[0]);
        }
       
        for(var folder in obj){
            if(obj[folder].name === directories[0]){
                return this.recursiveCheckForFolder(directories, obj[folder]);
            }
        }
    }
    recursiveCheckForFolder(directories:any, obj: any): any{
        for(var d in directories){
            if(obj.name === directories[d]){
                if(directories.length > 1){
                    directories.shift();
                    return this.recursiveIterate(directories, obj.folders);
                }
                else {
                    this.directoryToAdd = obj;
                    return obj;
                }
            }
        }
    }
    testNewData: any[] = [
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
            }]
      }
    ];

    thereIsADatacenter = false;
    currentSite= {
        site: -1,
        building: -1,
        datacenter: -1
    };
    siteList: any[] = [];
    rackList: any[] = [];
    slotList: any[];

    browsers = [
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
    ]


    getRacksByPath(directory:string){
        return this.rackList[directory];
    }
    updateBrowsers(result: any[]){
        //fix the result so that it is correct
        console.log(result);
        this.browsers = [];
        for(let i = 0; i < result.length; i++){
            if(result[i].toLowerCase().includes('firefox')){
                this.browsers.push({
                    installed: true,
                    name: 'Firefox',
                    img: './app/EquipmentComponents/img/firefox-active.png'
                });
            } else if(result[i].toLowerCase().includes('chrome')){
                this.browsers.push({ 
                    installed: true,
                    name: 'Chrome',
                    img: './app/EquipmentComponents/img/chrome-active.png'
                });
            } else if(result[i].toLowerCase().includes('iexplore')){
                this.browsers.push({ 
                    installed: true,
                    name: 'IE',
                    img: './app/EquipmentComponents/img/ie-active.png'
                });
            }
        }
        console.log(this.browsers);
    }
    
    generateEmptyRack(directory: string){
        console.log(directory);
        let slotArray: any[] = [];
        let rackSize = 42;
        let rackWidth = 190;
        let shouldHideSlot = false;
        let emptySlot = {
            'e': {
                'name': 'Empty',
                'imgUrl': './app/Racks/img/1274237_300x300.jpg',
                'height': 1
            },
            'w': 190
        }
        let rackCount = 1
        for(let i = 0; i < rackSize; i++){
                slotArray.push({
                'equipmentActive': false,
                'slotid': i, 
                'shouldHideSlot': shouldHideSlot,
                'object': emptySlot,
            });
        }
        if(this.rackList[directory] === undefined){
            this.rackList[directory] = [];
        }
        
        var rackID = 'rack' + this.rackList[directory].length;
        this.rackList[directory].push({id: rackID, slots: slotArray})
        // this.rackList[directory].push(slotArray);
        // console.log(this.currentSite);
        // this.siteList[this.currentSite.site]
        //     .buildings[this.currentSite.building]
        //     .datacenters[this.currentSite.datacenter]
        //     .rooms[room]
        //     .enclaves[enclave].racks[rackID] = slotArray;
        //     console.log('success');
    }
    updateRack(directory:string, rackId: number, slotId: number, newSlotValue: any, activeStatus: boolean){
        let success = false;
        if(newSlotValue.e.height > 1){
            //success = this.checkSlotsForValid(room, enclave, rackId, slotId, newSlotValue.e.height)
        } else if (newSlotValue.e.height === 1){
            success = true;
        }

        // if(success){
        //     this.siteList[this.currentSite.site]
        //         .buildings[this.currentSite.building]
        //         .datacenters[this.currentSite.datacenter]
        //         .rooms[room]
        //         .enclaves[enclave].racks[rackId][slotId].equipmentActive = activeStatus;



        //     this.siteList[this.currentSite.site]
        //         .buildings[this.currentSite.building]
        //         .datacenters[this.currentSite.datacenter]
        //         .rooms[room]
        //         .enclaves[enclave].racks[rackId][slotId].object = {
        //             e : newSlotValue.e,
        //             w : newSlotValue.w
        //         };
        //     // this.slotList[slotId].equipmentActive = activeStatus
        //     // this.slotList[slotId].object = {
        //     //     e : newSlotValue.e,
        //     //     w : newSlotValue.w
        //     // };
        //     this.consumeSlots(room, enclave, rackId, slotId, newSlotValue.e.height)
            
        // } 
        // return success;
       
    }
    checkSlotsForValid(room: number, enclave:number,rackId: number, startIndex: number, numberOfSlotsToConsume: number){
        let indexToConsume = startIndex + 1;
        numberOfSlotsToConsume = numberOfSlotsToConsume - 1;

        while(numberOfSlotsToConsume > 0){
            //this.slotList[indexToConsume]
            if(this.siteList[this.currentSite.site]
                .buildings[this.currentSite.building]
                .datacenters[this.currentSite.datacenter]
                .rooms[room]
                .enclaves[enclave].racks[rackId][indexToConsume].equipmentActive){
                //notify user
                return false;
            }
            indexToConsume++;
            numberOfSlotsToConsume--;
        }
        return true;

    }
    consumeSlots(room: number, enclave:number, rackId: number, startIndex: number, numberOfSlotsToConsume: number){
        //don't consume the current slot
        
        let indexToConsume = startIndex + 1;
        numberOfSlotsToConsume = numberOfSlotsToConsume - 1;

        while(numberOfSlotsToConsume > 0){
            this.siteList[this.currentSite.site]
                .buildings[this.currentSite.building]
                .datacenters[this.currentSite.datacenter]
                .rooms[room]
                .enclaves[enclave].racks[rackId][indexToConsume].shouldHideSlot = true;
            indexToConsume++;
            numberOfSlotsToConsume--;
        }

    }
    getSavedRack(args: any[]){
        return new Array;
    }
}