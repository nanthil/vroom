import {Component, Input} from '@angular/core'
import {RackService} from '../Racks/rack.service'
@Component({
    selector: 'single-site',
    template: `
        <add-new 
            [showModal]=showModal
            [whatToAdd]=typeToAdd
            (newValue)="_pushNewItemToService($event)"
        ></add-new>
        {{currentView}}
        <div *ngIf="currentView !== 'undefined'">
            <all-racks
                [racks]="testmessage"
                [currentView]=currentView
            ></all-racks>
        </div>
          
        
    `
})
export class SiteComponent{
    showModal = false;
    typeToAdd = 'room';
    constructor(private rackService: RackService){};
    selectedRoom = 0;
    selectedEnclave = 0;
    testmessage = 'ding';
    @Input() currentView:string;
    getRacksByPath(){
        var result = this.rackService.getRacksByPath(this.currentView);
        return result;
    }
    changeSelectedRoom(index:number){
        // this.selectedRoom = index;
        // if(this.rackService.siteList[this.rackService.currentSite.site]
        //         .buildings[this.rackService.currentSite.building]
        //         .datacenters[this.rackService.currentSite.datacenter].rooms[this.selectedRoom].enclaves.length === 0){
        //                 this.selectedEnclave = 0;
        //         } else{
        //             this.selectedEnclave = this.rackService.siteList[this.rackService.currentSite.site]
        //             .buildings[this.rackService.currentSite.building]
        //             .datacenters[this.rackService.currentSite.datacenter].rooms[this.selectedRoom].enclaves.length - 1;

        //         }
    }

    changeSelectedEnclave(index:number){
        this.selectedEnclave = index;
    }
    private _pushNewItemToService(e:any){
        
        // this.showModal = !this.showModal;
        // if(!(e.inputValue === 'cancel')){
        //     if(e.added === 'room'){
        //         this.rackService.siteList[this.rackService.currentSite.site].buildings[this.rackService.currentSite.building].datacenters[this.rackService.currentSite.datacenter].rooms.push({
        //             name: e.inputValue,
        //             enclaves: []
        //         });
        //         this.selectedRoom = this.rackService.siteList[this.rackService.currentSite.site]
        //             .buildings[this.rackService.currentSite.building]
        //             .datacenters[this.rackService.currentSite.datacenter]
        //             .rooms.length -1
        //     } else {
        //         this.rackService.siteList[this.rackService.currentSite.site]
        //             .buildings[this.rackService.currentSite.building]
        //             .datacenters[this.rackService.currentSite.datacenter]
        //             .rooms[this.selectedRoom].enclaves.push({
        //                 name: e.inputValue,
        //                 racks: []
        //             });
        //         this.selectedEnclave = this.rackService.siteList[this.rackService.currentSite.site]
        //             .buildings[this.rackService.currentSite.building]
        //             .datacenters[this.rackService.currentSite.datacenter]
        //             .rooms[this.selectedRoom].enclaves.length -1;
                
        //     }
        //     console.log(this.rackService.siteList);
        // }
        
    }
    addNew(addThis:string){
        this.typeToAdd = addThis;
        this.showModal = true;
    }
  
}

// <div *ngIf="rackService.thereIsADatacenter">
//            <div *ngIf="this.rackService.siteList[this.rackService.currentSite.site].buildings[this.rackService.currentSite.building].datacenters[this.rackService.currentSite.datacenter].rooms.length === 0">
//                 <nav class="navbar navbar-default">
//                     You currently have no rooms. Please add one to continue. 
//                     <div (click)="addNew('room')" class="btn btn-primary">Add Room</div>
//                 </nav>
//            </div>
                
//             <div *ngIf="this.rackService.siteList[this.rackService.currentSite.site].buildings[this.rackService.currentSite.building].datacenters[this.rackService.currentSite.datacenter].rooms.length > 0">
//                 <nav class="navbar navbar-default">
//                     <div class="navbar-header">
//                         <a class="navbar-brand">Now viewing rooms for 
//                             Site: {{this.rackService.siteList[this.rackService.currentSite.site].name}} 
//                             Building: {{this.rackService.siteList[this.rackService.currentSite.site].buildings[this.rackService.currentSite.building].name}} 
//                             Datacenter: {{this.rackService.siteList[this.rackService.currentSite.site].buildings[this.rackService.currentSite.building].datacenters[this.rackService.currentSite.datacenter].name}}</a>
//                     </div>
//                     <div (click)="addNew('room')" class="btn btn-primary">Add Room</div>
//                     <ul class="nav navbar-nav"
//                         *ngFor="let room of rackService.siteList[rackService.currentSite.site].buildings[rackService.currentSite.building].datacenters[rackService.currentSite.datacenter].rooms; let i = index">
//                         <li (click)="changeSelectedRoom(i)" [ngClass]="{'active': selectedRoom === i}"><a>{{room.name}}</a></li>
//                     </ul> 
//                 </nav>



//                 <div *ngIf="this.rackService.siteList[this.rackService.currentSite.site].buildings[this.rackService.currentSite.building].datacenters[this.rackService.currentSite.datacenter].rooms[selectedRoom].enclaves.length === 0">
//                     <nav class="navbar navbar-default">
//                         This room has no enclaves. Please add one to continue. 
//                         <div (click)="addNew('enclave')" class="btn btn-primary">Add Enclave</div>
//                     </nav>
//                 </div>
//                 <!--enclaves-->
//                 <div *ngIf="this.rackService.siteList[this.rackService.currentSite.site].buildings[this.rackService.currentSite.building].datacenters[this.rackService.currentSite.datacenter].rooms[selectedRoom].enclaves.length > 0">
//                     <nav class="navbar navbar-default">
//                         <div class="navbar-header">
//                             <a class="navbar-brand">Enclaves</a>
//                         </div>
//                         <div (click)="addNew('enclave')" class="btn btn-primary">Add Enclave</div>
//                         <ul class="nav navbar-nav"
//                             *ngFor="let enclave of rackService.siteList[rackService.currentSite.site].buildings[rackService.currentSite.building].datacenters[rackService.currentSite.datacenter].rooms[selectedRoom].enclaves; let i = index">
//                             <li (click)="changeSelectedEnclave(i)" [ngClass]="{'active': selectedEnclave === i}"><a>{{enclave.name}}</a></li>
//                         </ul> 
//                     </nav>
//                 </div>
//                 <div *ngIf="this.rackService.siteList[this.rackService.currentSite.site].buildings[this.rackService.currentSite.building].datacenters[this.rackService.currentSite.datacenter].rooms[selectedRoom].enclaves.length > 0">
//                     <all-racks
//                         [room]=selectedRoom
//                         [enclave]=selectedEnclave
//                     ></all-racks>
//                 </div>        
//             </div>
                
//         </div>

  