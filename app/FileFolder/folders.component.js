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
var rack_service_1 = require('../Racks/rack.service');
var FolderComponent = (function () {
    function FolderComponent(rackService) {
        this.rackService = rackService;
        this.contextMenuOptions = ['add file', 'add folder', 'delete', 'rename'];
        this.showContextMenu = false;
        this.showModal = false;
        //Sets the current enclave view model
        //This event bubbles to the serverManagementPage
        this.setView = new core_1.EventEmitter();
    }
    FolderComponent.prototype.changeView = function (e) {
        //as folders is a recursive Component
        //the event handles recursively for each level "this" folder is nested inside of
        //that being the case, the value we're interested is the first event pushed to b
        //the unpacking of this recursive object is handled in serverManagementPage
        this.setView.next({ a: this.currentDirectory, b: e });
    };
    FolderComponent.prototype.contextMenu = function (e) {
        this.showContextMenu = true;
    };
    FolderComponent.prototype.pushNewItemToService = function (e) {
        if (e.inputValue !== 'cancel') {
            if (e.added === 'file') {
                this.rackService.addFile(e.inputValue, this.currentDirectory);
            }
            else {
                this.rackService.addFolder(e.inputValue, this.currentDirectory);
            }
        }
        this.showModal = false;
    };
    //this does not add, it simply activates the add modal found in shared components
    FolderComponent.prototype.addNew = function (type) {
        this.showModal = true;
        this.whatToAdd = type;
    };
    FolderComponent.prototype.remove = function () {
        //remove from racklist as well as from directory
        //remove any nested data if necessary
    };
    FolderComponent.prototype.rename = function () {
        this.remove();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FolderComponent.prototype, "content", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FolderComponent.prototype, "indent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FolderComponent.prototype, "currentDirectory", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FolderComponent.prototype, "setView", void 0);
    FolderComponent = __decorate([
        core_1.Component({
            selector: 'folder',
            template: "\n  <context-menu [showContextMenu]=\"showContextMenu\"\n                [options]=\"contextMenuOptions\"></context-menu>\n  <add-new \n             [showModal]=showModal\n             [whatToAdd]=whatToAdd\n             (newValue)=\"pushNewItemToService($event)\"\n        ></add-new>\n  <div [style.margin-left.px]=\"indent\">\n    <div class=\"accordion-list\"  (contextmenu)=\"contextMenu($event)\">\n      <div class=\"side-by-side\">{{content.name}}</div>\n      <div *ngIf=\"!content.showContents\" class=\"side-by-side file-buttons\">\n          \n          <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new file.\">\n            <span (click)=\"addNew('file')\"\n            class=\"glyphicon glyphicon-file\"></span></a>\n          </p>\n             <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new file.\">\n            <span (click)=\"addNew('folder')\"\n            class=\"glyphicon glyphicon-folder-open\"></span></a>\n          </p>\t\n          <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Show folder contents\">\n              <span (click)=\"content.showContents = !content.showContents\" class=\"glyphicon glyphicon-chevron-right\"></span></a>\n              \n          </p>\n      </div>\n      <div *ngIf=\"content.showContents\" class=\"side-by-side file-buttons\">\n          \n          <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new file.\">\n            <span (click)=\"addNew('file')\"\n            class=\"glyphicon glyphicon-file\"></span></a>\n          </p>\n             <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new file.\">\n            <span (click)=\"addNew('folder')\"\n            class=\"glyphicon glyphicon-folder-open\"></span></a>\n          </p>\t\n          <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Hide Folder Contents\">\n              <span (click)=\"content.showContents = !content.showContents\" class=\"glyphicon glyphicon-chevron-down\"></span></a>\n          </p>\n      </div>\n    </div>\n      <br>\n    <div *ngIf=\"content.showContents\">\n        <div *ngFor=\"let file of content.files\">\n            <div [style.margin-left.px]=\"indent +10\">\n                <div class=\"accordion-list\">\n                    <div class=\"side-by-side\">{{file}}</div>\n                    <div class=\"side-by-side file-view\">\n                        <p class=\"side-by-side\"><span (click)=\"changeView(file)\"><a href=\"#\" data-tooltip=\"Add new file.\">Change View</a></span></p></div>\n                    </div>\n                </div>\n            </div>\n      \n        <div *ngFor=\"let folder of content.folders\"> \n          <folder (setView)=changeView($event) [currentDirectory]=\"currentDirectory + '/' + folder.name\" [content]=folder [indent]=\"indent + 10\"></folder>\n        </div>\n    </div>\n  </div>\n  ",
            styles: ["\n       \n        .side-by-side {\n            display: inline-block;\n            float: left;\n        } \n        .file-buttons{\n            float: right;\n        }\n        .file-view {\n            float: right;\n        }\n        .accordion-list:hover {\n            background-color: #ddd;\n        }\n        .accordion-list {\n\n             background-color: #eee;\n            color: #444;\n            cursor: pointer;\n            padding: 18px;\n            width: 100%;\n            border: none;\n            outline: none;\n            font-size: 15px;\n            transition: 0.4s;\n            height: 40px;\n            width:100%;\n            margin-bottom:10px;\n        }\n        \n[data-tooltip]:before,\n[data-tooltip]:after {\n  visibility: hidden;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);\n  opacity: 0;\n  pointer-events: none;\n}\n\n[data-tooltip]:before {\n  position: absolute;\n  bottom: 150%;\n  left: 50%;\n  margin-bottom: 5px;\n  margin-left: -80px;\n  padding: 7px;\n  width: 160px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n  background-color: #000;\n  background-color: hsla(0, 0%, 20%, 0.9);\n  color: #fff;\n  content: attr(data-tooltip);\n  text-align: center;\n  font-size: 14px;\n  line-height: 1.2;\n}\n\n[data-tooltip]:after {\n  position: absolute;\n  bottom: 150%;\n  left: 50%;\n  margin-left: -5px;\n  width: 0;\n  border-top: 5px solid #000;\n  border-top: 5px solid hsla(0, 0%, 20%, 0.9);\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  content: \" \";\n  font-size: 0;\n  line-height: 0;\n}\n\n[data-tooltip]:hover:before,\n[data-tooltip]:hover:after {\n  visibility: visible;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);\n  opacity: 1;\n}\n        "]
        }), 
        __metadata('design:paramtypes', [rack_service_1.RackService])
    ], FolderComponent);
    return FolderComponent;
}());
exports.FolderComponent = FolderComponent;
//# sourceMappingURL=folders.component.js.map