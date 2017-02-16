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
//built-in
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
//public
var ng2_dnd_1 = require("ng2-dnd");
var ng2_popup_1 = require("ng2-popup");
//native
var equipment_component_1 = require("./EquipmentComponents/equipment.component");
var equipmentModal_component_1 = require("./EquipmentComponents/equipmentModal.component");
var equipments_component_1 = require("./EquipmentComponents/equipments.component");
var racks_component_1 = require("./Racks/racks.component");
var rack_component_1 = require("./Racks/rack.component");
var rack_service_1 = require("./Racks/rack.service");
var slot_component_1 = require("./Racks/slot.component");
var ServerManagementPage_component_1 = require("./ServerManagementPage/ServerManagementPage.component");
var addnew_filefolder_component_1 = require("./Shared/addnew.filefolder.component");
var main_navigation_component_1 = require("./Navigation/main.navigation.component");
var folder_navigation_component_1 = require("./Navigation/folder.navigation.component");
var enclave_view_component_1 = require("./Enclaves/enclave.view.component");
//import {FileComponent} from './FileFolder/files.component';
var folders_component_1 = require("./FileFolder/folders.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            ng2_dnd_1.DndModule.forRoot(),
            ng2_popup_1.Ng2PopupModule,
            forms_1.FormsModule
        ],
        declarations: [
            app_component_1.AppComponent,
            equipment_component_1.EquipmentComponent,
            equipmentModal_component_1.EquipmentModalComponent,
            equipments_component_1.EquipmentsComponent,
            slot_component_1.SlotComponent,
            rack_component_1.RackComponent,
            racks_component_1.RacksComponent,
            ServerManagementPage_component_1.ServerManagementComponent,
            main_navigation_component_1.MainNavigationComponent,
            folder_navigation_component_1.FolderNavigationComponent,
            enclave_view_component_1.EnclaveViewComponent,
            addnew_filefolder_component_1.AddNewFileFolderModalComponent,
            // FileComponent,
            folders_component_1.FolderComponent
        ],
        providers: [rack_service_1.RackService, enclave_view_component_1.EnclaveViewComponent],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map