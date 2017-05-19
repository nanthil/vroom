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
var rack_service_1 = require("../Racks/rack.service");
var EnclaveViewComponent = (function () {
    function EnclaveViewComponent(rackService) {
        this.rackService = rackService;
    }
    ;
    EnclaveViewComponent.prototype.getRacksByPath = function () {
        var result = this.rackService.getRacksByPath(this.currentView);
        return result;
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
        template: "\n        <div *ngIf=\"currentView !== 'undefined'\">\n            <all-racks\n                [racks]=\"testmessage\"\n                [currentView]=currentView\n            ></all-racks>\n        </div>\n          \n        \n    "
    }),
    __metadata("design:paramtypes", [rack_service_1.RackService])
], EnclaveViewComponent);
exports.EnclaveViewComponent = EnclaveViewComponent;
//# sourceMappingURL=enclave.view.component.js.map