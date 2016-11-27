import {Component, Output} from '@angular/core';
import {DragulaModule, DragulaService} from '../ng2-dragula/ng2-dragula';

@Component({
    selector: 'slot',
    template: `
            <div class="slot img-thumbnail" [dragula]="equipment-bag" [dragulaModel]="equipmentObject">
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
    equipmentObject = "";
    constructor(private dragulaService: DragulaService){
        dragulaService.drop.subscribe((value: any) => {
            console.log(`drop: ${value[0]}`);
            this.onDrop(value.slice(1));
        });
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

    //dragula
    private onDrop(args: any) {
        let [equipmentDiv, el] = args;
        this.equipmentObject = this.nodeToString(equipmentDiv);
    }
    //slot contains an image as well as the value for a particular equipment
}
