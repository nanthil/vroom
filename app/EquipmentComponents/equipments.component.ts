import { Component, Input } from '@angular/core';
import { EquipmentService } from './equipment.services';

@Component({
    selector: 'all-equipment',
    template: `
            <ul class="equipment-list">
                <li *ngFor="let e of equipmentJson" >
                    <single-equipment 
                    [width]="width" 
                    [height]="e.height * 19.55"
                    [equipment]="e"
                    [isActive]="equipmentIsActive">
                    </single-equipment>
                </li>
            <ul>
    `,
    styles: [`
    .equipment-list{position: fixed;
    display: list-item;
    top: 0;
    right: 0;
    width: 300px;
    height: 400px;
    border: 3px solid #73AD21;}`],
    providers: [EquipmentService]
})
export class EquipmentsComponent{
    
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

