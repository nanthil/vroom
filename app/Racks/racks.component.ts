import {Component,Input} from '@angular/core';
import {RackComponent} from './rack.component';
import {RackService} from './rack.service';
@Component({
    selector: 'all-racks',
    template: `
        <button (click)="addNewRack()">Add New Rack</button>
        <div *ngFor="let rack of rackService.siteList[rackService.currentSite.site]
            .buildings[rackService.currentSite.building]
            .datacenters[rackService.currentSite.datacenter]
            .rooms[room]
            .enclaves[enclave].racks; let i = index">
            <div class="racks">
                <single-rack
                    [room]=room
                    [enclave]=enclave
                    [rackId]=i
                    ></single-rack>
            </div>
        </div>
    `,
    styles: [`
        .racks {
            float:left;
        }
    `]
})
export class RacksComponent{
    @Input() room:number;
    @Input() enclave:number;
    newRackId: number;
    constructor(private rackService: RackService){}
    addNewRack(){
        if(this.rackService.siteList[this.rackService.currentSite.site]
                .buildings[this.rackService.currentSite.building]
                .datacenters[this.rackService.currentSite.datacenter]
                .rooms[this.room]
                .enclaves[this.enclave].racks.length === 0){

                this.rackService.generateEmptyRack(this.room, this.enclave, 0);
            } else{
            this.newRackId = this.rackService.siteList[this.rackService.currentSite.site]
                .buildings[this.rackService.currentSite.building]
                .datacenters[this.rackService.currentSite.datacenter]
                .rooms[this.room]
                .enclaves[this.enclave].racks.length;
                
                this.rackService.generateEmptyRack(this.room, this.enclave, this.newRackId);
            }
        
    }
}
