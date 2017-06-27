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
var MainNavigationComponent = (function () {
    function MainNavigationComponent() {
        this.rackWidth = 40;
        this.rename = new core_1.EventEmitter();
        this.setView = new core_1.EventEmitter();
    }
    MainNavigationComponent.prototype.renameActiveViews = function (e) {
        this.rename.next(e);
    };
    MainNavigationComponent.prototype.changeView = function (e) {
        this.setView.next(e);
    };
    MainNavigationComponent.prototype.resize = function (e) {
        console.log(e);
    };
    return MainNavigationComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MainNavigationComponent.prototype, "rename", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MainNavigationComponent.prototype, "setView", void 0);
MainNavigationComponent = __decorate([
    core_1.Component({
        selector: 'navigation',
        template: "\n        <div class=\"nav-bar\">\n            <site-nav \n                (setView)=changeView($event)\n                (rename)=renameActiveViews($event)></site-nav>\n            <all-equipment [isNav]=\"true\" [width]=\"rackWidth\"></all-equipment>\n        </div>\n    ",
        styles: ["\n        .test{\n            right:0;\n            position:fixed;\n            top:0;\n            background:red;\n        }\n        .nav-bar {\n            position:fixed;\n            top:0;\n            right:0;\n            height: 100vh;\n            width: 400px;\n            background-color: #25272b;\n        }\n    "]
    })
], MainNavigationComponent);
exports.MainNavigationComponent = MainNavigationComponent;
//# sourceMappingURL=main.navigation.component.js.map