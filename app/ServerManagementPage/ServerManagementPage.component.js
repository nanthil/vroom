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
var ServerManagementComponent = (function () {
    function ServerManagementComponent(zone, rackService) {
        this.zone = zone;
        this.rackService = rackService;
        this.showCreateNewProject = false;
        this.whatAction = 'Create New ';
        this.whatToAdd = 'Project';
        this.showFileViewer = false;
        this.titleBarMenuOptions = [
            { name: 'File', options: ['New Project', 'Save', 'Open'] },
            { name: 'Options', options: ['Style'] },
            { name: 'Help', options: ['Manual', 'Guide', 'Contact'] }
        ];
        this.activeView = '';
        this.listActiveViews = [];
    }
    ServerManagementComponent.prototype.closeFileViewer = function (e) {
        this.showFileViewer = false;
    };
    ServerManagementComponent.prototype.handleMenuSelection = function (type, e) {
        if (type === "File")
            this.handleFileOptions(e);
        else if (type === "Options")
            this.handleOptionOptions(e);
        else
            this.handleHelpOptions(e);
    };
    ServerManagementComponent.prototype.handleFileOptions = function (e) {
        if (e === 'Save') {
            if (this.rackService.projectName !== undefined) {
                this.rackService.save();
                this.rackService.getFiles(this.zone);
            }
        }
        else if (e === 'New Project') {
            if (this.rackService.projectName !== undefined) {
                console.log('would you like to save changes to' + this.rackService.projectName);
                this.rackService.resetStateForNewProject();
                this.activeView = '';
                this.listActiveViews = [];
            }
            this.showCreateNewProject = true;
        }
        else if (e === 'Open') {
            this.showFileViewer = true;
            this.listOfSavedFiles = this.rackService.files;
        }
    };
    ServerManagementComponent.prototype.handleOpen = function (e) {
        this.rackService.open(e, this.zone);
        this.showFileViewer = false;
        this.activeView = '';
        this.listActiveViews = [];
    };
    ServerManagementComponent.prototype.handleOptionOptions = function (e) {
    };
    ServerManagementComponent.prototype.handleHelpOptions = function (e) {
    };
    ServerManagementComponent.prototype.createNewProject = function (e) {
        this.showCreateNewProject = false;
        if (e.inputValue !== 'cancel') {
            this.rackService.projectName = e.inputValue;
            this.rackService.findFolder(e.inputValue, 'home', undefined);
        }
    };
    ServerManagementComponent.prototype.switchActiveView = function (event) {
        this.listActiveViews = this.listActiveViews.map(function (e) { return { name: e.name, isActive: (event.name === e.name) }; });
        this.activeView = event.name;
    };
    ServerManagementComponent.prototype.changeView = function (e) {
        this.getOriginalEvent(e);
    };
    ServerManagementComponent.prototype.closeView = function (viewName) {
        //TODO:
        //GET INDEX OF FOUND view
        //SET ACTIVE VIEW TO INDEX -1 or index +1
        this.listActiveViews = this.listActiveViews.filter(function (str) { return str.name !== viewName; });
        if (this.listActiveViews.length === 0) {
            this.activeView = '';
        }
    };
    ServerManagementComponent.prototype.getFiles = function () {
        this.files = this.rackService.getFiles(this.zone);
        console.log(this.files);
    };
    ServerManagementComponent.prototype.getOriginalEvent = function (event) {
        var _this = this;
        //folder is a nested component, and as such the event also happens recursively
        //unpack the object b until b is a string of the selected file in the path
        //this path/to/my/selected/file is the file that will be viewed in the single-enclave component
        var eventPath;
        if (typeof (event.b) === 'object') {
            this.getOriginalEvent(event.b);
        }
        else {
            if (event.b === 'rename folder') {
                //this is a folder being renamed, do things for folders here
                var something = event.a.split('/');
                something.pop();
                something.push(event.c);
                eventPath = something.join('/');
                this.listActiveViews.map(function (e) {
                    if (e.name.includes(event.a))
                        e.name = e.name.replace(event.a, eventPath);
                    _this.rackService.renameFileInRackList(e.name, eventPath, event.a);
                });
            }
            else {
                eventPath = event.a + '/' + event.b;
                if (this.listActiveViews.every(function (str) { return str.name !== eventPath; })) {
                    this.listActiveViews = this.listActiveViews.map(function (e) { return { name: e.name, isActive: false }; });
                    this.listActiveViews.push({ name: eventPath, isActive: true });
                }
                else {
                    this.listActiveViews = this.listActiveViews.map(function (e) { return { name: e.name, isActive: (eventPath === e.name) }; });
                }
                //this only occurs if the event is a renamed file
                //for the purpose of renaming the active views along with the actual file itself
                if (event.c && event.b !== 'rename folder') {
                    this.listActiveViews.map(function (e) {
                        var newStr;
                        if (e.name === eventPath) {
                            var temp = e.name.split('/');
                            temp.pop();
                            newStr = temp.join('/');
                            newStr += ('/' + event.c);
                            _this.rackService.renameFileInRackList(e.name, newStr, undefined);
                        }
                        else if (e.name.includes(eventPath)) {
                            console.log(eventPath);
                        }
                        else
                            newStr = e.name;
                        //very important, renames the related directory in the rackslist in rack service
                        //without this, no data will tie to the new name of the directory
                        e.name = newStr;
                    });
                }
                else {
                    this.activeView = eventPath;
                }
            }
        }
    };
    return ServerManagementComponent;
}());
ServerManagementComponent = __decorate([
    core_1.Component({
        selector: 'management-page',
        template: "\n        <file-viewer\n            [show]=showFileViewer\n            [files]=listOfSavedFiles\n            (selection)=handleOpen($event)\n            (close)=closeFileViewer($event)>\n            \n        </file-viewer>\n        <add-new\n            [whatAction]=\"whatAction\"\n            [whatToAdd]=\"whatToAdd\"\n            [showModal]=\"showCreateNewProject\"\n            (newValue)=\"createNewProject($event)\">\n        </add-new>\n        <!--<tag-manager></tag-manager>-->\n        <div class=\"title-bar\">\n            <div class=\"file-menu\">\n                <div class=\"side-by-side\" *ngFor=\"let o of titleBarMenuOptions\">\n                    <drop-down [name]=o.name\n                            [options]=o.options\n                            (selection)=\"handleMenuSelection(o.name, $event)\"\n                            >\n                    </drop-down>\n                </div>\n            </div>\n        </div>\n        <div class=\"main-view\">\n            <nav>\n                <ul class=\"nav nav-pills list-inline enclave-bar\">\n                    <li *ngFor=\"let view of listActiveViews\" \n                        class=\"top-nav-pill\" \n                        role=\"presentation\">\n                        <a [ngClass]=\"{'my-active': view.isActive}\"\n                            (click)=\"switchActiveView(view)\">\n                            <close (close)=\"closeView(view.name)\"></close>\n                            {{view.name}}\n                        </a>\n                    </li>\n                </ul>\n            </nav>\n            <div *ngIf=\"activeView !== ''\">\n                <single-enclave [currentView]=\"activeView\"></single-enclave>\n            </div>\n            <div *ngIf=\"activeView === ''\">\n                <div class=\"empty-main\">\n                    NO FILE CURRENTLY SELECTED\n                </div>\n            </div>\n        </div>\n        <navigation \n            (setView)=changeView($event)\n            (rename)=getOriginalEvent($event)></navigation>\n      ",
        styles: ["\n        .side-by-side {\n            display: inline;\n        }\n        .enclave-bar {\n            background: #25272b;\n        }\n        .my-active {\n            background: #44474c !important;\n        }\n        .top-nav-pill {\n            border-radius:2% !important;\n            border-color: #cccccc;\n            border-style:solid;\n            border-width:2px;\n            margin:0;\n            padding:0;\n        }\n        .top-nav-pill a {\n            background: #555555;\n            color: #cccccc; \n        }\n        .top-nav-pill a:hover {\n            background: #444444;\n            color: #dddddd; \n        }\n    \n        .close-button{\n            float: right;\n        }\n        .close-button:hover{\n            color: #cc5588;\n        }\n        .main-view{\n            height: 100vh;\n            background-color: #616770;\n        }\n        .empty-main {\n            padding:10%;\n            margin:auto;\n            font-size: 50px;\n        }\n    "
        ]
    }),
    __metadata("design:paramtypes", [core_1.NgZone, rack_service_1.RackService])
], ServerManagementComponent);
exports.ServerManagementComponent = ServerManagementComponent;
//# sourceMappingURL=ServerManagementPage.component.js.map