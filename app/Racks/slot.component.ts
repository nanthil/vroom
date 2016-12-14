import {Component, Output, Input, ApplicationRef} from '@angular/core';
import {RackComponent} from './rack.component';
import { EquipmentModalComponent } from '../EquipmentComponents/equipmentModal.component';
@Component({
    selector: 'slot',
    template: `
            <div class="slot img-thumbnail" 
            dnd-droppable
            (onDropSuccess)="setValueOfSlot($event)">
            <single-equipment 
                (click)="toggleConfig()"
                [width]="width"
                [equipment]="equip"
                [isActive]="equipmentActivated"
                [showConfig]="showConfig"
            >
            </single-equipment>

            </div>
            `,
      
    styles: [
      `
        .slot {
          background-color: blue;
          width: 200px;
          height: 50px;
          margin: 10px;
          display: list-item;
        }
     `
    ]
})
export class SlotComponent{
    @Input() slotid: number;
    @Input() equipmentObject: any;
    equip: Object;
    width: number;
    equipmentActivated = false;
    showConfig = false;
    constructor(private rackComponent: RackComponent){

    }
    ngOnInit(){
        this.equip = this.equipmentObject.e
        this.width = this.equipmentObject.w
    }

    toggleConfig(){
        if(this.equipmentActivated){
            this.showConfig = !this.showConfig
        }
    }
    
    setValueOfSlot(e:any){
        if(this.equipmentActivated){
            //will delete old are you sure?
            //get user input
            this.showConfig = false;
        }
        this.equipmentActivated = true;
        this.equip = e.dragData.e
        this.width = e.dragData.w
    }
}
