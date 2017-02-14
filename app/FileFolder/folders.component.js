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
var FolderComponent = (function () {
    function FolderComponent(rackService) {
        this.rackService = rackService;
    }
    FolderComponent.prototype.ngOnInit = function () {
    };
    FolderComponent.prototype.addNew = function () {
        this.rackService.addFolder('test', this.currentDirectory);
    };
    return FolderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FolderComponent.prototype, "content", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FolderComponent.prototype, "indent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FolderComponent.prototype, "currentDirectory", void 0);
FolderComponent = __decorate([
    core_1.Component({
        selector: 'folder',
        template: "\n  <div [style.margin-left.px]=\"indent\">\n    <div class=\"accordion-list\">\n      <div class=\"side-by-side\">{{content.name}}</div>\n      <div *ngIf=\"!content.showContents\" class=\"side-by-side\">\n          <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Show folder contents\">\n              <span (click)=\"content.showContents = !content.showContents\" class=\"glyphicon glyphicon-chevron-right\"></span></a>\n              \n          </p>\n          <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new file.\">\n            <span (click)=\"addNew()\"\n            class=\"glyphicon glyphicon-file\"></span></a>\n          </p>\n             <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new file.\">\n            <span (click)=\"addNew()\"\n            class=\"glyphicon glyphicon-folder-open\"></span></a>\n          </p>\t\n      </div>\n      <div *ngIf=\"content.showContents\" class=\"side-by-side\">\n          <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Hide Folder Contents\">\n              <span (click)=\"content.showContents = !content.showContents\" class=\"glyphicon glyphicon-chevron-down\"></span></a>\n          </p>\n          <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new file.\">\n            <span (click)=\"addNew()\"\n            class=\"glyphicon glyphicon-file\"></span></a>\n          </p>\n             <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new file.\">\n            <span (click)=\"addNew()\"\n            class=\"glyphicon glyphicon-folder-open\"></span></a>\n          </p>\t\n      </div>\n    </div>\n      <br>\n    <div *ngIf=\"content.showContents\">\n        <div *ngFor=\"let file of content.files\">\n          <div [style.margin-left.px]=\"indent+15\" class=\"accordion-list\">{{file}}</div>\n        </div>\n      \n        <div *ngFor=\"let folder of content.folders\"> \n          <folder [currentDirectory]=\"currentDirectory + '/' + folder.name\" [content]=folder [indent]=\"indent + 15\"></folder>\n        </div>\n    </div>\n  </div>\n  ",
        styles: ["\n        .side-by-side {\n            display: inline-block;\n            float: left;\n        }\n        .accordion-list:hover {\n            background-color: #ddd;\n        }\n        .accordion-list {\n\n             background-color: #eee;\n            color: #444;\n            cursor: pointer;\n            padding: 18px;\n            width: 100%;\n            border: none;\n            outline: none;\n            font-size: 15px;\n            transition: 0.4s;\n            height: 40px;\n            width:100%;\n            margin-bottom:10px;\n        }\n        \n[data-tooltip]:before,\n[data-tooltip]:after {\n  visibility: hidden;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);\n  opacity: 0;\n  pointer-events: none;\n}\n\n[data-tooltip]:before {\n  position: absolute;\n  bottom: 150%;\n  left: 50%;\n  margin-bottom: 5px;\n  margin-left: -80px;\n  padding: 7px;\n  width: 160px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n  background-color: #000;\n  background-color: hsla(0, 0%, 20%, 0.9);\n  color: #fff;\n  content: attr(data-tooltip);\n  text-align: center;\n  font-size: 14px;\n  line-height: 1.2;\n}\n\n[data-tooltip]:after {\n  position: absolute;\n  bottom: 150%;\n  left: 50%;\n  margin-left: -5px;\n  width: 0;\n  border-top: 5px solid #000;\n  border-top: 5px solid hsla(0, 0%, 20%, 0.9);\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  content: \" \";\n  font-size: 0;\n  line-height: 0;\n}\n\n[data-tooltip]:hover:before,\n[data-tooltip]:hover:after {\n  visibility: visible;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);\n  opacity: 1;\n}\n        "]
    }),
    __metadata("design:paramtypes", [rack_service_1.RackService])
], FolderComponent);
exports.FolderComponent = FolderComponent;
//# sourceMappingURL=folders.component.js.map