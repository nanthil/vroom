import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class RackService{ 
    data: any;
    slotList: any[];
    
    generateEmptyRack(rackID: string){
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
                'slotid': i, 
                'shouldHideSlot': shouldHideSlot,
                'object': emptySlot
            });
        }
        this.slotList = slotArray;
    }
    updateRack(rackId: string, slotId: number, newSlotValue: any){
        console.log(newSlotValue);
        this.slotList[slotId].object.e = newSlotValue.equipment;
        this.slotList[slotId].object.w = newSlotValue.width;
    }
    getSavedRack(args: any[]){
        return new Array;
    }
}