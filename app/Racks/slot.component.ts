import {Component, Output, Input, EventEmitter, ApplicationRef} from '@angular/core';
import {RackComponent} from './rack.component';
import { EquipmentModalComponent } from '../EquipmentComponents/equipmentModal.component';
@Component({
    selector: 'slot',
    template: `
            <div class="slot" 
                dnd-droppable
                (onDropSuccess)="_updateSlotList($event)"
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
    @Output() updateSlotList = new EventEmitter();
    private _updateSlotList(e:any){
           if(this.equipmentActivated){
            //will delete old are you sure?
            //get user input
            this.showConfig = false;
        }
        this.equipmentActivated = true;
        this.height = e.dragData.e.height * 19.55;
        //event
        this.updateSlotList.emit({id: this.slotid, eventObject: e})
    }
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
}
