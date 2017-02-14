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
var site_component_1 = require("../Sites/site.component");
var SiteNavigationComponent = (function () {
    function SiteNavigationComponent(rackService, siteComponent) {
        this.rackService = rackService;
        this.siteComponent = siteComponent;
        this.showModal = false;
        this.typeToAdd = '';
        this.argsToAdd = [];
        //MOVE THIS TO A SERVICE 
        //ANGULAR 2 DOES NOT SUPPORT DEEP NESTED EVENT EMISSION 
        this.setView = new core_1.EventEmitter();
    }
    SiteNavigationComponent.prototype.toggleFolderContents = function (index) {
        console.log(index);
        console.log(this.rackService.testNewData[index]);
        this.rackService.testNewData[index].showContents = !this.rackService.testNewData[index].showContents;
    };
    SiteNavigationComponent.prototype.changeView = function (e) {
        this.setView.emit(e);
    };
    SiteNavigationComponent.prototype.addNew = function () {
        this.showModal = !this.showModal;
        this.typeToAdd = 'File';
    };
    SiteNavigationComponent.prototype.pushNewItemToService = function (e) {
        this.showModal = !this.showModal;
        if (!(e.inputValue === 'cancel')) {
            this.rackService.addFolder(e.inputValue, '');
        }
    };
    return SiteNavigationComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SiteNavigationComponent.prototype, "setView", void 0);
SiteNavigationComponent = __decorate([
    core_1.Component({
        selector: 'site-nav',
        template: "\n        <add-new \n             [showModal]=showModal\n             [whatToAdd]=typeToAdd\n             (newValue)=\"pushNewItemToService($event)\"\n        ></add-new>\n        <div class=\"folder-nav\">\n            <h4 class=\"nav-title\">Site Navigation\n                <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new site.\">\n                    <span (click)=\"addNew()\"\n                    class=\"glyphicon glyphicon-folder-open\"></span></a>\n                </p>\n                \n            </h4>\n            <div class=\"fix-overflow\" *ngFor=\"let folder of rackService.testNewData; let i = index\">\n                <div class=\"accordion-list\">\n                    <folder \n                        (setView)=changeView($event)\n                        [indent]=0 \n                        [content]=folder \n                        [currentDirectory]=folder.name\n                        ></folder>\n                </div>\n            </div>\n        </div>\n    ",
        styles: [
            "\n        .fix-overflow{\n            display: block;\n            width: 100%;\n        }\n        .folder-nav{\n            overflow:auto;\n            height: 600px;\n        }\n        .site-nav-div{\n            position: fixed;\n            top: 0;\n        }\n        .nav-title {\n            color: #ffffff;\n        }\n        .data {\n            width: 200px;\n        }\n        .side-by-side {\n            display: block;\n            float: left;\n        }\n        .site {\n        }\n        .site-nav-pane {\n            height: 400px;\n            border-radius: 4px;\n            overflow:auto;\n        }\n        .accordion-list:hover {\n            background-color: #ddd;\n            \n        }\n        .accordion-list {\n            \n        }\n        .building {\n            margin-left:10px;\n        }\n        .datacenter{\n            margin-left: 20px;\n        }\n        [data-tooltip] {\n  position: relative;\n  z-index: 2;\n  cursor: pointer;\n}\n\n[data-tooltip]:before,\n[data-tooltip]:after {\n  visibility: hidden;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);\n  opacity: 0;\n  pointer-events: none;\n}\n\n[data-tooltip]:before {\n  position: absolute;\n  bottom: 150%;\n  left: 50%;\n  margin-bottom: 5px;\n  margin-left: -80px;\n  padding: 7px;\n  width: 160px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n  background-color: #000;\n  background-color: hsla(0, 0%, 20%, 0.9);\n  color: #fff;\n  content: attr(data-tooltip);\n  text-align: center;\n  font-size: 14px;\n  line-height: 1.2;\n}\n\n[data-tooltip]:after {\n  position: absolute;\n  bottom: 150%;\n  left: 50%;\n  margin-left: -5px;\n  width: 0;\n  border-top: 5px solid #000;\n  border-top: 5px solid hsla(0, 0%, 20%, 0.9);\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  content: \" \";\n  font-size: 0;\n  line-height: 0;\n}\n\n[data-tooltip]:hover:before,\n[data-tooltip]:hover:after {\n  visibility: visible;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);\n  opacity: 1;\n}\n    "
        ]
    }),
    __metadata("design:paramtypes", [rack_service_1.RackService, site_component_1.SiteComponent])
], SiteNavigationComponent);
exports.SiteNavigationComponent = SiteNavigationComponent;
//# sourceMappingURL=siteNavigation.component.js.map