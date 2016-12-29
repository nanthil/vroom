import {Component} from '@angular/core'
import {RackService} from '../Racks/rack.service'
@Component({
    selector: 'single-site',
    template: `
        <add-new 
            [showModal]=showModal
            [whatToAdd]=typeToAdd
            (newValue)="pushNewItemToService($event)"
        ></add-new>
        <div *ngIf="rackService.thereIsADatacenter">
           <div *ngIf="this.rackService.siteList[this.rackService.currentSite.site].buildings[this.rackService.currentSite.building].datacenters[this.rackService.currentSite.datacenter].rooms.length === 0">
                You currently have no rooms. Please add one to continue. 
                <div (click)="addRoom()" class="btn btn-primary">Add Room</div>
           </div>
           <div *ngFor="let room of rackService.siteList[rackService.currentSite.site].buildings[rackService.currentSite.building].datacenters[rackService.currentSite.datacenter].rooms">
                <all-racks></all-racks>
           </div>
        </div>
    `
})
export class SiteComponent{
    showModal = false;
    typeToAdd = 'room';
    constructor(private rackService: RackService){};
    
    pushNewItemToService(e:any){
            this.showModal = false;
            this.rackService.siteList[this.rackService.currentSite.site].buildings[this.rackService.currentSite.building].datacenters[this.rackService.currentSite.datacenter].rooms.push({
            name: e.inputValue
        })
    }
    addRoom(){
        this.showModal = true;
        
    }
  
}

