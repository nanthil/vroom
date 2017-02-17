import {Component, Output, Input, ApplicationRef, EventEmitter, NgZone} from '@angular/core';
import {RackComponent} from './rack.component';
import { EquipmentModalComponent } from '../EquipmentComponents/equipmentModal.component';
@Component({
    selector: 'slot',
    template: `
            <div class="slot" 
                dnd-droppable
                (onDropSuccess)="_updateRack($event)"
                [style.height.px]="height">
                <single-equipment 
                    [isNav]="isNav"
                    (click)="toggleConfig()"
                    [width]="equipmentObject.w"
                    [height]="equipmentObject.e.height * 19.55"
                    [equipment]="equipmentObject.e"
                    [isActive]="equipmentActive"
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
    //variables
    //id of slot
    @Input() slotid: number;
    //the object that contains data for the equipment component
    @Input() equipmentObject: any;
    //whether to toggle config for equipment or not
    @Input() equipmentActive: boolean;
    //event to trigger rack to update
    @Output() updateRack = new EventEmitter();
    @Input() height: number;
    @Input() isNav: boolean;
    showConfig = false;

    constructor(private rackComponent: RackComponent, private zone: NgZone){}

    //emits event from drop
    private _updateRack(e:any){
        if(this.equipmentActive){
            //TODO
            //will delete old are you sure?
            //get user input
            this.showConfig = false;
        }

        //this fixes an issue when ng2dnd runs outside of angular2's zone
        this.zone.run(() => {
            this.updateRack.emit({
                id: this.slotid, 
                eventObject: e,
                activeStatus: true
            });
    });
    }
    
    toggleConfig(){
        if(this.equipmentActive){
            
            this.showConfig = !this.showConfig;
        }
    }
}
