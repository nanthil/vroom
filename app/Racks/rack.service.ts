import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
//TODO:
//data format
//[0] project
// -> folders
//      -> folders
//      -> files
//          -> enclaves
//              -> equipment
//                  -> config
//[1]active files


//TODO: for active files
//when a file or folder is renamed,
//figure out the path to the file
//look to see if that is in the active files
//rename that file or folder

@Injectable()
export class RackService{ 
    //this is used as a global for a recursive result that is difficult to catch
    directoryToAdd: any;

    //add file to the correct directory
    findFile(name:string, directory: string, action: any, oldFileName: any){
        var localname = name;
        
        if(directory != ''){
            //this is a hack workaround javascript recursive implementation returning 'undefined'
            this.directoryToAdd = {};
            for(var d in this.testNewData){
                //another hack
                //if this one specific returned result !== undefined, allow logic to continue
                if(this.recursiveCheckForFolder(directory.split('/'), this.testNewData[d]) !== undefined){
                    //preventing duplicates
                    for(var file in this.directoryToAdd.files){
                        var highestNumber = 0;

                        //select additional characters not in specified name
                        //for example: if name === file and file already exists, append, creating file1, file2, file3 etc
                        var numberoffileswithname = parseInt(this.directoryToAdd.files[file].substring(localname.length, this.directoryToAdd.files[file].length));
                        if(this.directoryToAdd.files[file].includes(localname)){
                            
                            if (numberoffileswithname > highestNumber){
                                highestNumber = numberoffileswithname;
                            }
                            
                            name = localname + (highestNumber + 1);
                        }

                    }
                    if(action !== undefined) action(this.directoryToAdd, name, oldFileName);
                }
            }
        }
    }
    
    findFolder(name: string, directory: string, action: any){
        var localname = name;

        //TODO: FIX 
        //CURRENTLY DOES NOT CHECK FOR DUPLICATES IN THE HOME directory
        //HOME DIRECTORY SHOULD ONLY CONTAIN 1 FOLDER "PROJECTNAME"
        if(directory === 'home'){
            this.testNewData.push({
                name: name,
                files: [],
                folders: []
            });
        }
        if(directory != ''){
            this.directoryToAdd = {};

            //look in data object
            for(var d in this.testNewData){

                //recurse over list of directory names
                if(this.recursiveCheckForFolder(directory.split('/'), this.testNewData[d]) !== undefined){
                    //if object is found
                    //check to see if file name already exists
                    for(var folder in this.directoryToAdd.folders){
                        var highestNumber = 0;
                        
                        var numberoffiles = parseInt(this.directoryToAdd.folders[folder].name.substring(localname.length, this.directoryToAdd.folders[folder].name.length));
                        if(this.directoryToAdd.folders[folder].name.includes(localname)){
                            
                            if (numberoffiles > highestNumber){
                                highestNumber = numberoffiles;
                            }
                            
                            name = localname + (highestNumber + 1);
                        }
                    }
                    //do
                   if(action !== undefined) action(this.directoryToAdd, name);
                };
            }
        }
    }
    addFileToDirectory(directory: any, name:string){
        
        directory.files.push(name);
    }
    addFolderToDirectory(directory: any, name: string){
         directory.folders.push({
                        name: name,
                        showContents: false,
                        files: [],
                        folders: [],
                        tags: []
                    });
    }
    renameFile(directory:any, name:string, oldFileName:any){
        directory.files = directory.files.map((x:any) => x = x === oldFileName ? name : x);
    }
    renameFolder(directory:any, name:string){
        directory.name = name;
    }

    //Check to see if there are more folders in the found directory 
    recursiveIterate(directories: any, obj: any) : any{
        var numberOfExistingFiles = 0;
        for(var folder in obj){
            if(obj[folder].name === directories[0]){
                return this.recursiveCheckForFolder(directories, obj[folder]);
            }
        }
    }

    //look for folder name
    recursiveCheckForFolder(directories:any, obj: any): any{
        for(var d in directories){
            //found foldername
            if(obj.name === directories[d]){
                //if there are more directories to check for
                if(directories.length > 1){
                    //pop off the one we already found
                    directories.shift();
                    //check to see if there are more folders in this directory
                    return this.recursiveIterate(directories, obj.folders);
                }
                //there are no more directories in directory.split('/')
                else {
                    this.directoryToAdd = obj;
                    this.directoryToAdd.showContents = true;
                    //return the object we want
                    return obj;
                }
            }
        }
    }
    testNewData: any[] = [];

    thereIsADatacenter = false;
    currentSite= {
        site: -1,
        building: -1,
        datacenter: -1
    };
    rackList: any[] = []

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
                'imgUrl': '',
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
        
        var rackID = 'rack-' + this.rackList[directory].length;
        this.rackList[directory].push({id: rackID, slots: slotArray});
    }
    
    updateRack(directory:string, rackId: number, slotId: number, newSlotValue: any, activeStatus: boolean){
        let success = false;
        if(newSlotValue.e.height > 1){
            success = this.checkSlotsForValid(directory, rackId, slotId, newSlotValue.e.height)
        } else if (newSlotValue.e.height === 1){
            success = true;
        }

        if(success){
            //'rack-0', 'rack-10', 'rack-12' etc, split on '-'
            //the first index [rack, 0] is the index of this.racklist[directory]
            this.rackList[directory][rackId.toString().split('-')[1]].slots[slotId].equipmentActive = activeStatus;
            this.rackList[directory][rackId.toString().split('-')[1]].slots[slotId].object = {
                    e : newSlotValue.e,
                    w : newSlotValue.w
                };
            this.consumeSlots(directory, rackId, slotId, newSlotValue.e.height)
        } 
        return success;
       
    }

    checkSlotsForValid(directory: string, rackId: number, startIndex: number, numberOfSlotsToConsume: number){
        let indexToConsume = startIndex + 1;
        numberOfSlotsToConsume = numberOfSlotsToConsume - 1;

        while(numberOfSlotsToConsume > 0){
            //check to see if slot is occupied and active already
            if(this.rackList[directory][rackId.toString().split('-')[1]].slots[indexToConsume].equipmentActive){
                //if so, don't add, slot is occupied and configured
                return false;
            }
            indexToConsume++;
            numberOfSlotsToConsume--;
        }
        return true;

    }
    consumeSlots(directory: string, rackId: number, startIndex: number, numberOfSlotsToConsume: number){
        //don't consume the current slot
        
        let indexToConsume = startIndex + 1;
        numberOfSlotsToConsume = numberOfSlotsToConsume - 1;

        while(numberOfSlotsToConsume > 0){
            this.rackList[directory][rackId.toString().split('-')[1]].slots[indexToConsume].shouldHideSlot = true;
            indexToConsume++;
            numberOfSlotsToConsume--;
        }
    }

    getSavedRack(args: any[]){
        return new Array;
    }
}