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
var FolderComponent = (function () {
    function FolderComponent(rackService) {
        this.rackService = rackService;
        this.contextMenuOptions = ['add file', 'add folder', 'delete', 'rename'];
        this.showContextMenu = false;
        this.showModal = false;
        this.contextMenuX = 0;
        this.contextMenuY = 0;
        //as folders is a recursive Component
        //these events handles recursively for each level "this" folder is nested inside of
        //that being the case, the value we're interested is the first event pushed to b
        //the unpacking of this recursive object is handled in serverManagementPage
        this.rename = new core_1.EventEmitter();
        //Sets the current enclave view model
        //This event bubbles to the serverManagementPage
        this.setView = new core_1.EventEmitter();
    }
    FolderComponent.prototype.changeNameOfAnActiveTab = function (e, newName) {
        this.rename.next({ a: this.currentDirectory, b: e, c: newName });
    };
    FolderComponent.prototype.changeView = function (e) {
        this.setView.next({ a: this.currentDirectory, b: e });
    };
    FolderComponent.prototype.contextMenu = function (e, type, file) {
        //handling renaming
        //this.handleContextMenu()
        //opens the "add new" modal to accept user input strings
        //this.pushNewItemToService()
        //asks if the user is renaming or doing something else while passing in the rename or add functionality
        //further renaming happens in the ServerManagementPage
        //the event is published recursively through "folder navigation componant" and the "main navigation component"
        this.whatToAdd = type;
        this.contextMenuOptions = type === 'file' ? ['delete', 'rename'] : ['add file', 'add folder', 'delete', 'rename'];
        this.showContextMenu = true;
        this.contextMenuX = e.screenX;
        this.contextMenuY = e.screenY;
        this.oldFileNameForRenameFile = file;
    };
    FolderComponent.prototype.pushNewItemToService = function (e) {
        //implement delete
        if (e.inputValue !== 'cancel') {
            if (e.action === 'Rename') {
                this.isFileOrFolder(e, this.rackService.renameFile, this.rackService.renameFolder);
            }
            else {
                this.isFileOrFolder(e, this.rackService.addFileToDirectory, this.rackService.addFolderToDirectory);
            }
        }
        this.showModal = false;
    };
    FolderComponent.prototype.isFileOrFolder = function (e, actionFile, actionFolder) {
        if (e.changed === 'file') {
            //this recursively publishes an event to the main navigation in order to extract the full path to this event
            //then it renames the racklist directory and the active tabs directories
            this.changeNameOfAnActiveTab(this.oldFileNameForRenameFile, e.inputValue);
            this.rackService.findFile(e.inputValue, this.currentDirectory, actionFile, this.oldFileNameForRenameFile);
        }
        else {
            this.changeNameOfAnActiveTab('rename folder', e.inputValue);
            this.rackService.findFolder(e.inputValue, this.currentDirectory, actionFolder);
        }
    };
    FolderComponent.prototype.handleContextMenu = function (e) {
        if (e !== 'cancel') {
            if (e === 'add file') {
                this.addNew('file', 'Add new');
            }
            else if (e === 'add folder') {
                this.addNew('folder', 'Add new');
            }
            else if (e === 'remove') {
            }
            else if (e === 'rename') {
                this.addNew(this.whatToAdd, 'Rename');
            }
        }
        this.showContextMenu = false;
    };
    //this does not add, it simply activates the add modal found in shared components
    FolderComponent.prototype.addNew = function (type, action) {
        this.showModal = true;
        this.whatAction = action;
        this.whatToAdd = type;
    };
    FolderComponent.prototype.deleteFileFolder = function (type) {
        this.whatToAdd = type;
        console.log(this.content, this.currentDirectory);
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
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], FolderComponent.prototype, "rename", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], FolderComponent.prototype, "setView", void 0);
FolderComponent = __decorate([
    core_1.Component({
        selector: 'folder',
        template: "\n\n    <context-menu [showContextMenu]=\"showContextMenu\"\n                  [options]=\"contextMenuOptions\"\n                  [x]=\"contextMenuX\"\n                  [y]=\"contextMenuY\"\n                  (selected)=\"handleContextMenu($event)\"></context-menu>\n\n  <add-new \n             [whatAction]=whatAction\n             [showModal]=showModal\n             [whatToAdd]=whatToAdd\n             (newValue)=\"pushNewItemToService($event)\"\n        ></add-new>\n  <div [style.margin-left.px]=\"indent\">\n    <div class=\"accordion-list\"  (contextmenu)=\"contextMenu($event, 'folder', content.name)\">\n      <div class=\"side-by-side\">{{content.name}}</div>\n      <div *ngIf=\"!content.showContents\" class=\"side-by-side file-buttons\">\n          \n          <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new file.\">\n            <span (click)=\"addNew('file')\"\n            class=\"glyphicon glyphicon-file\"></span></a>\n          </p>\n             <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new file.\">\n            <span (click)=\"addNew('folder')\"\n            class=\"glyphicon glyphicon-folder-open\"></span></a>\n          </p>\t\n          <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Show folder contents\">\n              <span (click)=\"content.showContents = !content.showContents\" class=\"glyphicon glyphicon-chevron-right\"></span></a>\n              \n          </p>\n      </div>\n      <div *ngIf=\"content.showContents\" class=\"side-by-side file-buttons\">\n          \n          <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new file.\">\n            <span (click)=\"addNew('file')\"\n            class=\"glyphicon glyphicon-file\"></span></a>\n          </p>\n             <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new file.\">\n            <span (click)=\"addNew('folder')\"\n            class=\"glyphicon glyphicon-folder-open\"></span></a>\n          </p>\t\n          <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Hide Folder Contents\">\n              <span (click)=\"content.showContents = !content.showContents\" class=\"glyphicon glyphicon-chevron-down\"></span></a>\n          </p>\n      </div>\n    </div>\n      <br>\n    <div *ngIf=\"content.showContents\">\n        <div *ngFor=\"let file of content.files\">\n            <div [style.margin-left.px]=\"indent +10\">\n                <div class=\"accordion-list\" (contextmenu)=\"contextMenu($event, 'file', file)\">\n                    <div class=\"side-by-side\">{{file}}</div>\n                    <div class=\"side-by-side file-view\">\n                        <p class=\"side-by-side\"><span (click)=\"changeView(file)\"><a href=\"#\" data-tooltip=\"Add new file.\">Change View</a></span></p></div>\n                    </div>\n                </div>\n            </div>\n      \n        <div *ngFor=\"let folder of content.folders\"> \n          <folder \n            (setView)=changeView($event) \n            (rename)=changeNameOfAnActiveTab($event)\n            [currentDirectory]=\"currentDirectory + '/' + folder.name\" \n            [content]=folder \n            [indent]=\"indent + 10\"></folder>\n        </div>\n    </div>\n  </div>\n  ",
        styles: ["\n       \n        .side-by-side {\n            display: inline-block;\n            float: left;\n        } \n        .file-buttons{\n            float: right;\n        }\n        .file-view {\n            float: right;\n        }\n        .accordion-list:hover {\n            background-color: #ddd;\n        }\n        .accordion-list {\n\n             background-color: #eee;\n            color: #444;\n            cursor: pointer;\n            padding: 18px;\n            width: 100%;\n            border: none;\n            outline: none;\n            font-size: 15px;\n            transition: 0.4s;\n            height: 40px;\n            width:100%;\n            margin-bottom:10px;\n        }\n        \n[data-tooltip]:before,\n[data-tooltip]:after {\n  visibility: hidden;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);\n  opacity: 0;\n  pointer-events: none;\n}\n\n[data-tooltip]:before {\n  position: absolute;\n  bottom: 150%;\n  left: 50%;\n  margin-bottom: 5px;\n  margin-left: -80px;\n  padding: 7px;\n  width: 160px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n  background-color: #000;\n  background-color: hsla(0, 0%, 20%, 0.9);\n  color: #fff;\n  content: attr(data-tooltip);\n  text-align: center;\n  font-size: 14px;\n  line-height: 1.2;\n}\n\n[data-tooltip]:after {\n  position: absolute;\n  bottom: 150%;\n  left: 50%;\n  margin-left: -5px;\n  width: 0;\n  border-top: 5px solid #000;\n  border-top: 5px solid hsla(0, 0%, 20%, 0.9);\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  content: \" \";\n  font-size: 0;\n  line-height: 0;\n}\n\n[data-tooltip]:hover:before,\n[data-tooltip]:hover:after {\n  visibility: visible;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);\n  opacity: 1;\n}\n        "]
    })
    //TODO: ALLOW DND ON FILES AND FOLDERS TO OTHER FILES AND FOLDERS
    //TODO: ENABLE RENAMING OF FILES AND FOLDERS
    //TODO: IMPLEMENT DELETION OF FILES AND FOLDERS
    ,
    __metadata("design:paramtypes", [rack_service_1.RackService])
], FolderComponent);
exports.FolderComponent = FolderComponent;
//# sourceMappingURL=folders.component.js.map