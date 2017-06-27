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
var FileViewerComponent = (function () {
    function FileViewerComponent(rackService) {
        this.title = "File Browser";
        this.close = new core_1.EventEmitter();
        this.selection = new core_1.EventEmitter();
    }
    FileViewerComponent.prototype.closeWindow = function (e) {
        this.close.emit(true);
    };
    FileViewerComponent.prototype.returnSelection = function (e) {
        this.selection.emit(e);
    };
    return FileViewerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FileViewerComponent.prototype, "show", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], FileViewerComponent.prototype, "close", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], FileViewerComponent.prototype, "selection", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FileViewerComponent.prototype, "files", void 0);
FileViewerComponent = __decorate([
    core_1.Component({
        selector: 'file-viewer',
        template: "\n        <div *ngIf=\"show\">\n            <div class=\"file-viewer\">            \n                <div class=\"file-viewer-container\">\n                    <title-bar class=\"title-bar\"\n                        [name]=\"title\" \n                        (close)=\"closeWindow($event)\"></title-bar>\n                    <div class=\"file-list\">\n\n                        <div *ngFor=\"let file of files\">\n                            <div class=\"one-file\" (click)=returnSelection(file)>\n                                <div class=\"file-image\">\n                                    <img src=\"./app/Shared/file.png\" height=\"100px\"/>\n                                </div>\n                                <div>\n                                    <span>{{file}}</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    \n                    <div class=\"search-bar\">\n                        File Name: <input width=\"400px\" type=\"text-fild\"/>\n                    </div>\n                </div>\n            </div>\n        </div>  \n    ",
        styles: ["\n        .search-bar {\n            bottom: 0;\n            margin-bottom: 20px;\n            margin-left: 20px;\n            margin-top:20px;\n            height: 16px;\n            position: absolute;\n        }\n        .one-file {\n            color:white;\n            display: inline-block;\n            width:auto;\n            font-size:10px;\n            padding: 10px 10px 10px 10px;\n            margin: 10px 7px;\n            float:left;\n        }\n        .file-list{\n            position: relative;\n            height:450px;\n            overflow:auto\n        }\n        .file-viewer-container {\n             position: fixed;\n            width: 700px; /* Set your desired with */\n            height: 500px;\n            z-index: 2; /* Make sure its above other items. */\n            top: 25%;\n            left: 35%;\n            margin-top: -10%; /* Changes with height. */\n            margin-left: -10%; /* Your width divided by 2. */\n\n            /* You will not need the below, its only for styling   purposes. */\n      ;\n            border: 2px solid #555555;\n            background-color: #ccc;\n            border-radius: 5px;\n            text-align: center;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [rack_service_1.RackService])
], FileViewerComponent);
exports.FileViewerComponent = FileViewerComponent;
//# sourceMappingURL=fileViewer.component.js.map