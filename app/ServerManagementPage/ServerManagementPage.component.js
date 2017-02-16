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
var ServerManagementComponent = (function () {
    function ServerManagementComponent(zone, rackService) {
        this.zone = zone;
        this.rackService = rackService;
        this.activeView = '';
    }
    ServerManagementComponent.prototype.changeView = function (e) {
        this.getOriginalEvent(e);
    };
    ServerManagementComponent.prototype.getOriginalEvent = function (event) {
        if (typeof (event.b) === 'object') {
            this.getOriginalEvent(event.b);
        }
        else {
            this.activeView = event.a + '/' + event.b;
            console.log(this.activeView);
        }
    };
    return ServerManagementComponent;
}());
ServerManagementComponent = __decorate([
    core_1.Component({
        selector: 'management-page',
        template: "\n        <div *ngIf=\"activeView !== ''\">\n            <single-enclave [currentView]=\"activeView\"></single-enclave>\n        </div>\n        <navigation (setView)=\"changeView($event)\"></navigation>\n      ",
        styles: [
            "\n    "
        ]
    }),
    __metadata("design:paramtypes", [core_1.NgZone, rack_service_1.RackService])
], ServerManagementComponent);
exports.ServerManagementComponent = ServerManagementComponent;
//# sourceMappingURL=ServerManagementPage.component.js.map