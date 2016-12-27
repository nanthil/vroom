import {Component, 
    Input, 
    OnInit, 
    ChangeDetectorRef, 
    Renderer, 
    ElementRef, SimpleChanges} from '@angular/core';


@Component({
    selector: 'single-equipment',
    template: `
        <e-modal [show]="showConfig"></e-modal>
        <div class="equipment">
        <img class="e-image" dnd-draggable [dragEnabled]="true"
            [dragData]="transferData"
            [alt]="name"
            [src]="equipmentImg"
            [style.height.px]="height" />
        </div>
     `,
     styles: [ `
        .e-image {
            display: table;
            width: 100%
        }
        .equipment{
            display: table;
            height: 100%;
        }`]
})
export class EquipmentComponent{
    @Input() isActive: boolean;
    @Input() equipment: any;
    @Input() width: number;
    @Input() showConfig: boolean;
    @Input() height: number;
    name: string;
    equipmentImg : any;
    transferData: Object;
    ngOnInit() {
        this.setValues();
    }
   
    ngOnChanges(c: SimpleChanges){
        this.setValues();
    }

     setValues(){
        this.name = this.equipment.name;
        this.equipmentImg = this.equipment.imgUrl;

        //data transfers on drop
        this.transferData = {
            e: this.equipment, 
            w: this.width
        }
    }
}
