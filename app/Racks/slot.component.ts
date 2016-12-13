import {Component, Output, Input} from '@angular/core';
import {RackComponent} from './rack.component'

@Component({
    selector: 'slot',
    template: `
            <div class="slot img-thumbnail">
                <div [innerHTML]="equipmentObject"></div>
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
    constructor(private rackComponent: RackComponent){

    }
    

    //methods
    nodeToString ( node :any ) {
        var tmpNode = document.createElement( "div" );
        tmpNode.appendChild( node.cloneNode( true ) );
        var str = tmpNode.innerHTML;
        tmpNode = node = null; // prevent memory leaks in IE
        return str;
    }
    setValueOfSlot(equipObj:any){
        this.equipmentObject = equipObj;
    }
  //slot contains an image as well as the value for a particular equipment
}
