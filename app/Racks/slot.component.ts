import {Component, Output, Input, ApplicationRef, EventEmitter, NgZone} from '@angular/core';
import {RackComponent} from './rack.component';
import { EquipmentModalComponent } from '../EquipmentComponents/equipmentModal.component';
@Component({
    selector: 'slot',
    template: `
            <div class="slot" 
                (mouseover)="changeStyle($event)" (mouseout)="changeStyle($event)"
                dnd-droppable
                (onDropSuccess)="_updateRack($event)"
                [style.height.px]="height"
                [ngClass]="{'slot-mouseover': !hover || equipmentActive}"
                [ngClass]="{'transparent': equipmentObject.e.name !== 'Empty'}"
                
                >
             
                    <single-equipment 
                        (newConfig)="recieveNewConfig($event)"
                        (mousedown)="relocate('mousedown')"
                        [moveActiveEquipmentToNewSlot]="moveData"
                        [isNav]="isNav"
                        [config]="equipmentObject.config"
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
        .transparent {
        }
        .slot {
            margin-left: 34.3px;
            width: 200px;
        }
        .slot-mouseover{
        }
     `
    ]
})
export class SlotComponent{
    //variables
    //id of slot
    hover = false;
    recieveNewConfig(e:any){
        this.config = e;
        this.newConfig.emit({e:e, slotid:this.slotid});
    }
    changeStyle($event:any){
        this.hover = !this.hover;
    }
    @Input() slotid: number;
    @Input() rackId: any;
    //the object that contains data for the equipment component
    @Input() equipmentObject: any;
    //whether to toggle config for equipment or not
    @Input() equipmentActive: boolean;
    @Input() config: any;
    //event to trigger rack to update
    @Output() updateRack = new EventEmitter();
    @Output() newConfig = new EventEmitter();
    @Input() height: number;
    @Input() isNav: boolean;
    moveData: any = {};
    showConfig = false;
    
    constructor(private rackComponent: RackComponent, private zone: NgZone){}

    //emits event from drop
    private _updateRack(e:any, type:any){
        //prevent override of existing equipment
        if(e.dragData.relocateInRack !== undefined) {
            this.updateRack.emit({
                id: this.slotid,
                delete: true,
                eventObject: e
            })
        }
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
            this.moveData = {};
        }); 
    }
    relocate(e: any){
        this.moveData = {
            oldSlot: this.slotid,
            savedEquipmentState: this.equipmentObject,
            oldRackId: this.rackId
        }
    }
    toggleConfig(){
        if(this.equipmentActive){ 
            this.showConfig = !this.showConfig;
        }
    }
}
