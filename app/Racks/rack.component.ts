import {Component, ViewChild, Output} from '@angular/core';
import {SlotComponent} from './slot.component';

@Component({
    selector: 'single-rack',
    template: `
      <div class="rack">
         <div *ngFor="let s of slotArray">
          <slot
            [equipmentObject]=s.object
            [slotid]=s.slotid
            [hidden]=s.shouldHideSlot
          ></slot>
        </div>
        <all-equipment [width]="rackWidth"></all-equipment>
      </div>`,
    styles: [
      `
        .rack {
          height: 875px;
          width: 100%;
          margin: 10px;
          background-image: url("./app/Racks/img/42uRack.png"); 
        }
     `
    ]
})
export class RackComponent{
    slotArray: any[] = [];
    rackSize = 42;
    rackWidth = 190;
    shouldHideSlot = false;
    emptySlot = {
        'e': {
        'name': 'Empty',
        'imgUrl': './app/Racks/img/1274237_300x300.jpg',
        'height': 1
        },
        'w': 190
      }
   
    rackName = "rack";
    // <div *ngFor="let element of range(6); let i=index">
    //   elements[i].name
    // </div>
    rackCount = 1

    constructor(){
      for(let i = 0; i < this.rackSize; i++){
        this.slotArray.push({
          'slotid': i, 
          'shouldHideSlot': this.shouldHideSlot,
          'object': this.emptySlot
        });
      }
      this.rackName = this.rackName + this.rackCount;
    }
    hideSlot(slotId:number){
      this.slotArray[slotId].shouldHideSlot = true;
    }
}
