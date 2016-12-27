import {Component, ViewChild, Output, SimpleChanges} from '@angular/core';
import {SlotComponent} from './slot.component';
import {RackService} from './rack.service';

@Component({
    selector: 'single-rack',
    template: `
      <div class="rack">
         <div *ngFor="let s of rackService.slotList">
          <slot *ngIf="!s.shouldHideSlot"
            [equipmentObject]=s.object
            (updateSlotList)="updateRackSlotList($event)"
            [slotid]=s.slotid
          ></slot>
        </div>
        <all-equipment [width]="rackWidth"></all-equipment>
      </div>`,
    styles: [
      `
        .rack {
          padding-top:28.5px;
          height: 875px;
          width: 266px;
          margin: 10px;
          background-image: url("./app/Racks/img/42uRack.png"); 
        }
     `
    ]
})
export class RackComponent{
  
    constructor(private rackService: RackService){}
    rackid = '1';
    shouldHideSlot = false;
    rackWidth = 190;
    rackName = "rack";
    updateRackSlotList(event:any){
      let newObject = {
        equipment: event.eventObject.dragData.e, 
        width: event.eventObject.dragData.w
      }
      this.rackService.updateRack(this.rackid, event.id, newObject)
      console.log(this.rackService.slotList);
    }
    ngOnInit(){
      this.rackService.generateEmptyRack(this.rackid);
    }
}
