import {Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';

@Component({
    selector: 'single-equipment',
    template: `
        <img class="equipment"
            dnd-draggable [dragEnabled]="true"
            [dragData]="transferData"
            [alt]="name"
            [src]="equipmentImg"
            [style.width.px]="width" 
            [style.height.px]="height"/>
     `,
     styles: [ `
        .equipment{
        }`]
})
export class EquipmentComponent{
    @Input() equipment: any;
    height: number;
    @Input() width: number;
    name: string;
    equipmentImg : any;
    transferData: Object;

    currentEquipment(e:any){
        this.name = this.equipment.name;
        this.equipmentImg = this.equipment.imgUrl;
        this.height = this.equipment.height * 12;

    }
    ngOnInit() {
        this.name = this.equipment.name;
        this.equipmentImg = this.equipment.imgUrl;
        this.height = this.equipment.height * 12;
        //data transfers on drop
        this.transferData = {
            e: this.equipment, 
            w: this.width
        }
    }
}
