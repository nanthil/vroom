import {Component, 
    Input, 
    OnInit, 
    ChangeDetectorRef, 
    Renderer, 
    ElementRef, EventEmitter, Output, SimpleChanges} from '@angular/core';
declare var window:any;


@Component({
    selector: 'single-equipment',
    template: `
        <e-modal [show]="showConfig"
            (close)=closeEModal($event)
            (saveConfig)=saveEquipmentConfig($event)
            [config]="config"></e-modal>
        <div class="equipment" 
            [ngClass]="{'nav-equipment': isNav}" >

            <div *ngIf="isActive || isNav"
            [ngClass]="{'no-config': config === undefined && isActive}">
                <img class="e-image" dnd-draggable [dragEnabled]="true"
                    
                    [ngClass]="{'e-image-no-config': config === undefined && isActive}"
                    [dragData]="transferData"
                    [alt]="name"
                    [src]="equipmentImg"
                    [style.height.px]="height" />
            </div>
        </div>
     `,
     styles: [ `
      .no-config {
             background: red;
        }
        .e-image-no-config{
            opacity: .5;
        }
        .e-image {
            display: table;
            width: 100%
        }
        .equipment{
            display: table;
            height: 100%;
        }
        .nav-equipment{
            margin: 3px;
        }`]
})
export class EquipmentComponent{
    @Input() isNav: boolean;
    @Input() isActive: boolean;
    @Input() equipment: any;
    @Input() width: number;
    @Input() showConfig: boolean;
    @Input() height: number;
    @Input() moveActiveEquipmentToNewSlot: any;
    @Input() config: any;
    @Output() newConfig = new EventEmitter();
    saveEquipmentConfig(e:any) {
        //this should push even up to set property on existing equipment
        this.newConfig.emit(e);
    }
    id: any;
    name: string;
    equipmentImg : any;
    transferData: Object;
    ngOnInit() {
        //this id is intended to not delete another equipment of another id when moving equipment already installed into a rack
        if(this.id === undefined) this.id = window.uuidV4();
        this.setValues();
        
    }
    closeEModal(e:any){
        this.showConfig = false;
    }
    ngOnChanges(c: SimpleChanges){
        this.setValues();
    }
 
     setValues(){
        this.name = this.equipment.name;
        this.equipmentImg = this.equipment.imgUrl;

        //data transfers on drop
        this.transferData = {
            config:this.config,
            e: this.equipment, 
            w: this.width,
            id: this.id,
            relocateInRack: this.moveActiveEquipmentToNewSlot
        }
    }
}
