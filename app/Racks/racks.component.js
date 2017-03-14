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
var core_1 = require('@angular/core');
var rack_service_1 = require('./rack.service');
var RacksComponent = (function () {
    //TODO 
    //REFACTOR RACKS TO SEARCH FOR ACTIVE VIEW INSTEAD OF HARD REFERENCING OBJECTS
    function RacksComponent(rackService) {
        this.rackService = rackService;
    }
    RacksComponent.prototype.getRacksByPath = function (directory) {
        return this.rackService.getRacksByPath(directory);
    };
    RacksComponent.prototype.addNewRack = function () {
        this.rackService.generateEmptyRack(this.currentView);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RacksComponent.prototype, "currentView", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RacksComponent.prototype, "racks", void 0);
    RacksComponent = __decorate([
        core_1.Component({
            selector: 'all-racks',
            template: "\n        <button (click)=\"addNewRack()\">Add New Rack</button>\n\n        <div *ngFor=\"let rack of getRacksByPath(currentView)\">\n            <single-rack class=\"racks\" \n                [slots]=rack.slots \n                [rackId]=\"rack.id\" \n                [directory]=\"currentView\">\n            </single-rack>\n        </div>\n    ",
            styles: ["\n        .racks {\n            float:left;\n            margin-left:5px;\n\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [rack_service_1.RackService])
    ], RacksComponent);
    return RacksComponent;
}());
exports.RacksComponent = RacksComponent;
// /<single-rack [directory]=currentView [rackId]=rack.></single-rack> 
//# sourceMappingURL=racks.component.js.map