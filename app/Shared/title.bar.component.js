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
var TitleBarComponent = (function () {
    function TitleBarComponent() {
        this.close = new core_1.EventEmitter();
    }
    TitleBarComponent.prototype.ngOnInit = function () {
        console.log(name);
    };
    TitleBarComponent.prototype.closeWindow = function (e) {
        this.close.next(e);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TitleBarComponent.prototype, "name", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TitleBarComponent.prototype, "close", void 0);
    TitleBarComponent = __decorate([
        core_1.Component({
            selector: 'title-bar',
            template: "\n        <div class=\"title-bar\">{{name}}\n        <close (close)=\"closeWindow(e)\"></close></div>\n    ",
            styles: ["\n        .close-button {\n            float:right;\n            background: #cc5588;\n        }\n        .close-button:hover{\n            color: #cc5588;\n            background: none;\n        }\n        .title-bar{\n            background: #333333;\n            color:white;\n            margin:0;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], TitleBarComponent);
    return TitleBarComponent;
}());
exports.TitleBarComponent = TitleBarComponent;
//# sourceMappingURL=title.bar.component.js.map