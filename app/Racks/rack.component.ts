import {Component, Output} from '@angular/core';
import {SlotComponent} from './slot.component';

@Component({
    selector: 'single-rack',
    template: `
      <div class="rack">
         <div *ngFor="let s of slotArray">
          <slot></slot>
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
   
    rackWidth = 235;
    rackName = "rack";
    // <div *ngFor="let element of range(6); let i=index">
    //   elements[i].name
    // </div>
    rackCount = 1

    constructor(){
      for(let i = 0; i < this.rackSize; i++){
        this.slotArray.push({});
      }
      this.rackName = this.rackName + this.rackCount;
    }
}
