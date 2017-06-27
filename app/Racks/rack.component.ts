import {Component, Input, ViewChild, Output, SimpleChanges} from '@angular/core';
import {SlotComponent} from './slot.component';
import {RackService} from './rack.service';
@Component({
    selector: 'single-rack',
    template: `
      <div class="rack">
         <div *ngFor="let s of slots">
          <slot *ngIf="!s.shouldHideSlot"
            [rackId]="rackId"
            [isNav]="false"
            [equipmentObject]=s.object
            [slotid]=s.slotid
            [height]="s.object.e.height * 19.55"
            [equipmentActive]=s.equipmentActive
            (updateRack)="callUpdateService($event)"
            (newConfig)="recieveNewConfig($event)"
          ></slot>
        </div>
      </div>`,
    styles: [
      `
        .rack {
          padding-top:28.5px;
          height: 875px;
          width: 266px;
          background-image: url("./app/Racks/img/42uRack.png"); 
        }
     `
    ]
})
export class RackComponent{
    slotArray: any[] = [];
    rackWidth = 190;
    rackName = "rack";
    @Input() rackId: number;
    @Input() directory:string;
    @Input() slots: any;
    recieveNewConfig(e:any){
        this.rackService.updateEquipmentConfigInRack(this.directory, this.rackId, e.slotid, e.e);
    }
    constructor(private rackService: RackService){}
    callUpdateService(e:any){
      
      if(e.delete) this.rackService.deleteSlot(this.directory, this.rackId, e.eventObject.dragData.relocateInRack.oldRackId, e.id, e.eventObject.dragData.relocateInRack.oldSlot, e.eventObject.dragData.e);
      
      else {
        
        let success = this.rackService.updateRack(this.directory, this.rackId, e.id, e.eventObject.dragData, e.activeStatus);
        if(!success){
          //error
          console.log('Failed to add new component to the rack. Please try again.');
        }
      }
    }
}
