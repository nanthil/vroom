import {Component, Output, Input, ApplicationRef} from '@angular/core';
import {RackComponent} from './rack.component';
import { EquipmentModalComponent } from '../EquipmentComponents/equipmentModal.component';
@Component({
    selector: 'slot',
    template: `
            <div class="slot" 
                dnd-droppable
                (onDropSuccess)="setValueOfSlot($event)"
                [style.height.px]="height">
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
            margin-left: 34.3px;
            background-color: blue;
            width: 200px;
        }
     `
    ]
})
export class SlotComponent{
    @Input() slotid: number;
    @Input() equipmentObject: any;
    equip: any;
    width: number;
    height: number;
    equipmentActivated = false;
    showConfig = false;
    constructor(private rackComponent: RackComponent){

    }
    ngOnInit(){
        this.equip = this.equipmentObject.e;
        this.width = this.equipmentObject.w;
        this.height = 19.55;
    }
    toggleConfig(){
        if(this.equipmentActivated){
            this.showConfig = !this.showConfig;
        }
    }
    consumeRackSlots(){
        let slotsToConsume = this.equip.height;
        let indexToConsume = this.slotid + 1;
        while(slotsToConsume > 0){
            console.log(slotsToConsume);
            indexToConsume++;
            slotsToConsume = slotsToConsume - 1;
        }
    }
    setValueOfSlot(e:any){
        if(this.equipmentActivated){
            //will delete old are you sure?
            //get user input
            this.showConfig = false;
        }
        this.equipmentActivated = true;
        this.equip = e.dragData.e;
        this.width = e.dragData.w;
        this.height = e.dragData.e.height * 19.55;
        this.consumeRackSlots();
    }
}
