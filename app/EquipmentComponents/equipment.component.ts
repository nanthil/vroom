import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'single-equipment',
    template: `
        <img class="equipment"
            [alt]="name"
            [src]="equipmentImg"
            [style.width.px]="width" 
            [style.height.px]="height"/>
     `,
     styles: [ `
        .equipment{
            padding-left: 31px;
        }`]
})
export class EquipmentComponent{
    @Input() equipment: any;
    height: number;
    @Input() width: number;
    name: string;
    equipmentImg : any;

    ngOnInit() {
        this.name = this.equipment.name;
        this.equipmentImg = this.equipment.imgUrl;
        this.height = this.equipment.height * 15;
    }
}
