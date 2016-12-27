import {Component, Input, ViewChild, Output, SimpleChanges} from '@angular/core';
import {SlotComponent} from './slot.component';
import {RackService} from './rack.service';
@Component({
    selector: 'single-rack',
    template: `
      <div class="rack">
         <div *ngFor="let s of rackService.slotList">
          <slot *ngIf="!s.shouldHideSlot"
            [equipmentObject]=s.object
            [slotid]=s.slotid
            [height]="s.object.e.height * 19.55"
            [equipmentActive]=s.equipmentActive
            (updateRack)="callUpdateService($event)"
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
    slotArray: any[] = [];
    rackWidth = 190;
    rackName = "rack";
    @Input() rackId: string;
    constructor(private rackService: RackService){}
    ngOnInit(){
      this.rackService.generateEmptyRack(this.rackId);
    }
    callUpdateService(e:any){
      let success = this.rackService.updateRack(this.rackId, e.id, e.eventObject.dragData, e.activeStatus);
      if(!success){
        //error
        console.log('error');
      }
    }
}
