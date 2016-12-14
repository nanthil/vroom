import {Component, Output, Input, ApplicationRef} from '@angular/core';
import {RackComponent} from './rack.component'
@Component({
    selector: 'slot',
    template: `
            <div class="slot img-thumbnail" 
            dnd-droppable
            (onDropSuccess)="setValueOfSlot($event)">
            <div *ngFor="let e of recievedData" >
                <single-equipment [width]="e.w" [equipment]="e.e">
                </single-equipment>
            </div>

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
    recievedData:Array<any> = [];
    constructor(
        private appref: ApplicationRef,
        private rackComponent: RackComponent){

    }
    ngOnInit(){
        this.recievedData.push(this.equipmentObject);
    }
    setValueOfSlot(e:any){
        this.recievedData = [];
        this.recievedData.push(e.dragData)
        //this.rackComponent.setValueOfSingleSlot(this.slotid, e.dragData);
        //this.equipmentObject = equipObj;
    }
}
