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
        this.listActiveViews = [];
    }
    ServerManagementComponent.prototype.changeView = function (e) {
        this.getOriginalEvent(e);
    };
    ServerManagementComponent.prototype.closeView = function (viewName) {
        //TODO:
        //GET INDEX OF FOUND view
        //SET ACTIVE VIEW TO INDEX -1 or index +1
        this.listActiveViews = this.listActiveViews.filter(function (str) { return str !== viewName; });
        if (this.listActiveViews.length === 0) {
            this.activeView = '';
        }
    };
    ServerManagementComponent.prototype.getOriginalEvent = function (event) {
        //folder is a nested component, and as such the event also happens recursively
        //unpack the object b until b is a string of the selected file in the path
        //this path/to/my/selected/file is the file that will be viewed in the single-enclave component
        if (typeof (event.b) === 'object') {
            this.getOriginalEvent(event.b);
        }
        else {
            var eventPath = event.a + '/' + event.b;
            if (this.listActiveViews.every(function (str) { return str !== eventPath; })) {
                this.listActiveViews.push(eventPath);
            }
            this.activeView = eventPath;
        }
    };
    return ServerManagementComponent;
}());
ServerManagementComponent = __decorate([
    core_1.Component({
        selector: 'management-page',
        template: "\n        <div class=\"main-view\">\n            <div *ngFor=\"let viewName of listActiveViews\"><div (click)=\"closeView(viewName)\">{{viewName}}</div></div>\n            <div *ngIf=\"activeView !== ''\">\n                <single-enclave [currentView]=\"activeView\"></single-enclave>\n            </div>\n            <div *ngIf=\"activeView === ''\">\n                <div class=\"empty-main\">\n                    NO FILE CURRENTLY SELECTED\n                </div>\n            </div>\n        </div>\n        <navigation (setView)=\"changeView($event)\"></navigation>\n      ",
        styles: [
            "\n        .main-view{\n            height: 100vh;\n            background-color: gainsboro;\n        }\n        .empty-main {\n            padding:10%;\n            margin:auto;\n            font-size: 50px;\n        }\n    "
        ]
    }),
    __metadata("design:paramtypes", [core_1.NgZone, rack_service_1.RackService])
], ServerManagementComponent);
exports.ServerManagementComponent = ServerManagementComponent;
//# sourceMappingURL=ServerManagementPage.component.js.map