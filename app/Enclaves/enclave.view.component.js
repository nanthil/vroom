"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var rack_service_1 = require("../Racks/rack.service");
var EnclaveViewComponent = (function () {
    function EnclaveViewComponent(rackService) {
        this.rackService = rackService;
        this.showModal = false;
        this.typeToAdd = 'room';
        this.selectedRoom = 0;
        this.selectedEnclave = 0;
    }
    ;
    EnclaveViewComponent.prototype.getRacksByPath = function () {
        var result = this.rackService.getRacksByPath(this.currentView);
        return result;
    };
    EnclaveViewComponent.prototype.changeSelectedRoom = function (index) {
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
    };
    EnclaveViewComponent.prototype.changeSelectedEnclave = function (index) {
        this.selectedEnclave = index;
    };
    EnclaveViewComponent.prototype._pushNewItemToService = function (e) {
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
    };
    EnclaveViewComponent.prototype.addNew = function (addThis) {
        this.typeToAdd = addThis;
        this.showModal = true;
    };
    return EnclaveViewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EnclaveViewComponent.prototype, "currentView", void 0);
EnclaveViewComponent = __decorate([
    core_1.Component({
        selector: 'single-enclave',
        template: "\n        <add-new \n            [showModal]=showModal\n            [whatToAdd]=typeToAdd\n            (newValue)=\"_pushNewItemToService($event)\"\n        ></add-new>\n        {{currentView}}\n        <div *ngIf=\"currentView !== 'undefined'\">\n            <all-racks\n                [racks]=\"testmessage\"\n                [currentView]=currentView\n            ></all-racks>\n        </div>\n          \n        \n    "
    }),
    __metadata("design:paramtypes", [rack_service_1.RackService])
], EnclaveViewComponent);
exports.EnclaveViewComponent = EnclaveViewComponent;
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
//# sourceMappingURL=enclave.view.component.js.map