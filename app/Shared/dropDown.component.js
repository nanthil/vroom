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
var DropDownComponent = (function () {
    function DropDownComponent() {
        this.selection = new core_1.EventEmitter();
    }
    DropDownComponent.prototype.returnSelection = function (e) {
        this.selection.next(e);
    };
    return DropDownComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DropDownComponent.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DropDownComponent.prototype, "name", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DropDownComponent.prototype, "selection", void 0);
DropDownComponent = __decorate([
    core_1.Component({
        selector: 'drop-down',
        template: "\n      <div class=\"dropdown\">\n            <button class=\"dropbtn\">{{name}}</button>\n            <div class=\"dropdown-content\">\n                <a href=\"#\" *ngFor=\"let o of options\">\n                    <span (click)=\"returnSelection(o)\">{{o}}</span>\n                </a>\n            </div>\n      </div>\n    ",
        styles: ["\n     /* Dropdown Button */\n    .dropbtn {\n        background-color: #4CAF50;\n        color: white;\n        padding: 16px;\n        font-size: 16px;\n        border: none;\n        cursor: pointer;\n    }\n\n    /* The container <div> - needed to position the dropdown content */\n    .dropdown {\n        position: relative;\n        display: inline-block;\n    }\n\n    /* Dropdown Content (Hidden by Default) */\n    .dropdown-content {\n        display: none;\n        position: absolute;\n        background-color: #f9f9f9;\n        min-width: 160px;\n        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n        z-index: 1;\n    }\n\n    /* Links inside the dropdown */\n    .dropdown-content a {\n        color: black;\n        padding: 12px 16px;\n        text-decoration: none;\n        display: block;\n    }\n\n    /* Change color of dropdown links on hover */\n    .dropdown-content a:hover {background-color: #f1f1f1}\n\n    /* Show the dropdown menu on hover */\n    .dropdown:hover .dropdown-content {\n        display: block;\n    }\n\n    /* Change the background color of the dropdown button when the dropdown content is shown */\n    .dropdown:hover .dropbtn {\n        background-color: #3e8e41;\n    }\n    "]
    })
], DropDownComponent);
exports.DropDownComponent = DropDownComponent;
//# sourceMappingURL=dropDown.component.js.map