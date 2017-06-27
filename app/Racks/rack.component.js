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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rack_service_1 = require("./rack.service");
var RackComponent = (function () {
    function RackComponent(rackService) {
        this.rackService = rackService;
        this.slotArray = [];
        this.rackWidth = 190;
        this.rackName = "rack";
    }
    RackComponent.prototype.recieveNewConfig = function (e) {
        this.rackService.updateEquipmentConfigInRack(this.directory, this.rackId, e.slotid, e.e);
    };
    RackComponent.prototype.callUpdateService = function (e) {
        if (e.delete)
            this.rackService.deleteSlot(this.directory, this.rackId, e.eventObject.dragData.relocateInRack.oldRackId, e.id, e.eventObject.dragData.relocateInRack.oldSlot, e.eventObject.dragData.e);
        else {
            var success = this.rackService.updateRack(this.directory, this.rackId, e.id, e.eventObject.dragData, e.activeStatus);
            if (!success) {
                //error
                console.log('Failed to add new component to the rack. Please try again.');
            }
        }
    };
    return RackComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RackComponent.prototype, "rackId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RackComponent.prototype, "directory", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RackComponent.prototype, "slots", void 0);
RackComponent = __decorate([
    core_1.Component({
        selector: 'single-rack',
        template: "\n      <div class=\"rack\">\n         <div *ngFor=\"let s of slots\">\n          <slot *ngIf=\"!s.shouldHideSlot\"\n            [rackId]=\"rackId\"\n            [isNav]=\"false\"\n            [equipmentObject]=s.object\n            [slotid]=s.slotid\n            [height]=\"s.object.e.height * 19.55\"\n            [equipmentActive]=s.equipmentActive\n            (updateRack)=\"callUpdateService($event)\"\n            (newConfig)=\"recieveNewConfig($event)\"\n          ></slot>\n        </div>\n      </div>",
        styles: [
            "\n        .rack {\n          padding-top:28.5px;\n          height: 875px;\n          width: 266px;\n          background-image: url(\"./app/Racks/img/42uRack.png\"); \n        }\n     "
        ]
    }),
    __metadata("design:paramtypes", [rack_service_1.RackService])
], RackComponent);
exports.RackComponent = RackComponent;
//# sourceMappingURL=rack.component.js.map