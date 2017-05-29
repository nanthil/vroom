import { Component, Input } from '@angular/core';
import { EquipmentService } from './equipment.services';

@Component({
    selector: 'all-equipment',
    template: `
            <ul class="equipment-list">
                <li *ngFor="let e of equipmentJson" >
                    <single-equipment 
                    [isNav]="isNav"
                    [width]="width" 
                    [height]="e.height * 19.55"
                    [equipment]="e"
                    [isActive]="equipmentIsActive">
                    </single-equipment>
                </li>
            <ul>
    `,
    styles: [`
    .equipment-list{
        overflow:auto;
        list-style-type: none;
        display: list-item;
        border: 3px solid #73AD21;
        height: 400px; 
    }`],
    providers: [EquipmentService]
})
export class EquipmentsComponent{
    @Input() isNav: boolean;
    @Input() width: number;
    equipmentJson = new Array();
    equipmentIsActive = false;

    constructor(private equipmentService: EquipmentService){
        this.generateDefaultEquipment();
    }
    generateDefaultEquipment(){
        this.equipmentService.getDefaultEquipment().subscribe(
            defaultEquipment => {
                this.formatData(defaultEquipment);                
            });
    }
    formatData(defaultEquipment: any){
        for(let size in defaultEquipment){
            for(let e in defaultEquipment[size]){
                this.equipmentJson.push(defaultEquipment[size][e]);
            }
        }
    }
}

// position: fixed;
//     overflow:auto;
//     display: list-item;
//     top: 0;
//     right: 0;
//     width: 300px;
//     border: 3px solid #73AD21;