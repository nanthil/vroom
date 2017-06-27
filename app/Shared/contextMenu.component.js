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
var ContextMenuComponent = (function () {
    function ContextMenuComponent() {
        this.options = [];
        //TODO on selecting an option, output that option
        this.selected = new core_1.EventEmitter();
    }
    ContextMenuComponent.prototype.returnSelected = function (e) {
        console.log(e);
        this.selected.next(e);
    };
    ContextMenuComponent.prototype.onOutsideClick = function (e) {
        this.returnSelected('cancel');
    };
    return ContextMenuComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ContextMenuComponent.prototype, "showContextMenu", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ContextMenuComponent.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ContextMenuComponent.prototype, "x", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ContextMenuComponent.prototype, "y", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ContextMenuComponent.prototype, "selected", void 0);
ContextMenuComponent = __decorate([
    core_1.Component({
        host: {
            '(document:click)': 'onOutsideClick($event)'
        },
        selector: 'context-menu',
        template: "\n        <div class=\"main-context-area\" \n            [style.top.px]=\"y -50\"\n            [style.left.px]=\"x\">\n            <div *ngIf=\"showContextMenu\" class=\"context\">\n                <div class=\"list-of-options\" *ngFor=\"let o of options\">\n                    <span (click)=\"returnSelected(o)\">{{o}}</span>\n                </div>\n            </div>\n        </div>\n    ",
        styles: ["\n    \n      .context {\n          color: blue;\n      }\n      .main-context-area {\n          position: fixed;\n          z-index: 3;\n      }\n      .list-of-options {\n          background: green;\n      }\n    "]
    })
], ContextMenuComponent);
exports.ContextMenuComponent = ContextMenuComponent;
//# sourceMappingURL=contextMenu.component.js.map