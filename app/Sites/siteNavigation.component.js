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
    }
    SiteNavigationComponent.prototype.toggleFolderContents = function (index) {
        console.log(index);
        console.log(this.rackService.testNewData[index]);
        this.rackService.testNewData[index].showContents = !this.rackService.testNewData[index].showContents;
    };
    SiteNavigationComponent.prototype.addNew = function () {
        this.showModal = !this.showModal;
        this.typeToAdd = 'File';
    };
    SiteNavigationComponent.prototype.pushNewItemToService = function (e) {
        this.showModal = !this.showModal;
        if (!(e.inputValue === 'cancel')) {
            this.rackService.addFolder(e.inputValue);
        }
    };
    return SiteNavigationComponent;
}());
SiteNavigationComponent = __decorate([
    core_1.Component({
        selector: 'site-nav',
        template: "\n        <add-new \n             [showModal]=showModal\n             [whatToAdd]=typeToAdd\n             (newValue)=\"pushNewItemToService($event)\"\n        ></add-new>\n        <div class=\"folder-nav\">\n            <h4 class=\"nav-title\">Site Navigation\n                <p class=\"side-by-side\"><a href=\"#\" data-tooltip=\"Add new site.\">\n                    <span (click)=\"addNew()\"\n                    class=\"glyphicon glyphicon-plus\"></span></a>\n                </p>\n            </h4>\n            <div *ngFor=\"let folder of rackService.testNewData; let i = index\">\n                <div class=\"accordion-list\">\n                    <folder [indent]=0 [content]=folder></folder>\n                </div>\n            </div>\n        </div>\n    ",
        styles: [
            "\n        .folder-nav{\n            overflow:auto;\n            height: 600px;\n        }\n        .site-nav-div{\n            position: fixed;\n            top: 0;\n        }\n        .nav-title {\n            color: #ffffff;\n        }\n        .data {\n            width: 200px;\n        }\n        .side-by-side {\n            display: inline-block;\n            float: left;\n        }\n        .site {\n        }\n        .site-nav-pane {\n            height: 400px;\n            border-radius: 4px;\n            overflow:auto;\n        }\n        .accordion-list:hover {\n            background-color: #ddd;\n        }\n        .accordion-list {\n\n             background-color: #eee;\n            color: #444;\n            cursor: pointer;\n            padding: 18px;\n            width: 100%;\n            border: none;\n            outline: none;\n            font-size: 15px;\n            transition: 0.4s;\n            height: 40px;\n            width:100%;\n            margin-bottom:10px;\n        }\n        .building {\n            margin-left:10px;\n        }\n        .datacenter{\n            margin-left: 20px;\n        }\n        [data-tooltip] {\n  position: relative;\n  z-index: 2;\n  cursor: pointer;\n}\n\n[data-tooltip]:before,\n[data-tooltip]:after {\n  visibility: hidden;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);\n  opacity: 0;\n  pointer-events: none;\n}\n\n[data-tooltip]:before {\n  position: absolute;\n  bottom: 150%;\n  left: 50%;\n  margin-bottom: 5px;\n  margin-left: -80px;\n  padding: 7px;\n  width: 160px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n  background-color: #000;\n  background-color: hsla(0, 0%, 20%, 0.9);\n  color: #fff;\n  content: attr(data-tooltip);\n  text-align: center;\n  font-size: 14px;\n  line-height: 1.2;\n}\n\n[data-tooltip]:after {\n  position: absolute;\n  bottom: 150%;\n  left: 50%;\n  margin-left: -5px;\n  width: 0;\n  border-top: 5px solid #000;\n  border-top: 5px solid hsla(0, 0%, 20%, 0.9);\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  content: \" \";\n  font-size: 0;\n  line-height: 0;\n}\n\n[data-tooltip]:hover:before,\n[data-tooltip]:hover:after {\n  visibility: visible;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);\n  opacity: 1;\n}\n    "
        ]
    }),
    __metadata("design:paramtypes", [rack_service_1.RackService, site_component_1.SiteComponent])
], SiteNavigationComponent);
exports.SiteNavigationComponent = SiteNavigationComponent;
// <div site-nav-div>
// <add-new 
//     [showModal]=showModal
//     [whatToAdd]=typeToAdd
//     (newValue)="pushNewItemToService($event)"
// ></add-new>
// <div class="site-nav-pane">
//     <div>
//         <h4 class="nav-title">Site Navigation
//             <p class="side-by-side"><a href="#" data-tooltip="Add new site.">
//                 <span (click)="addNew('site', [])"
//                 class="glyphicon glyphicon-plus"></span></a>
//             </p>
//         </h4>
//     </div>
//     <div *ngIf="rackService.siteList.length === 0">
//         You have no sites saved. Please add a site to begin. 
//     </div>
//     <div *ngFor="let site of rackService.siteList; let i = index">
//         <div class="site accordion-list">
//             <div class="data side-by-side">{{site.name}}</div>
//             <div class="show-buttons side-by-side">
//                 <p class="side-by-side"><a href="#" data-tooltip="Add new building to site">
//                     <span (click)="addNew('building', [i])"
//                         class="glyphicon glyphicon-plus">
//                     </span></a>
//                 </p>
//                 <div *ngIf="!site.showBuildings" class="side-by-side">
//                     <p class="side-by-side"><a href="#" data-tooltip="Show buildings for this site.">
//                         <span (click)="toggleShowBuildings(i)" class="glyphicon glyphicon-chevron-down"></span></a>
//                     </p>
//                 </div>
//                 <div *ngIf="site.showBuildings" class="side-by-side">
//                     <p class="side-by-side"><a href="#" data-tooltip="Hide buildings for this site.">
//                         <span (click)="toggleShowBuildings(i)" class="glyphicon glyphicon-chevron-right"></span></a>
//                     </p>
//                 </div>
//             </div>        
//         </div>
//         <div *ngIf="site.showBuildings">
//             <div *ngFor="let b of site.buildings; let bi = index">
//                 <div class="building accordion-list">
//                     <div class="data side-by-side">{{b.name}}</div>
//                     <div class="show-buttons side-by-side">
//                         <p class="side-by-side"><a href="#" data-tooltip="Add new datacenter to this building.">
//                             <span 
//                                 (click)="addNew('datacenter', [i, bi])"
//                             class="glyphicon glyphicon-plus"></span></a>
//                         </p>
//                         <div *ngIf="!b.showDatacenters" class="side-by-side">
//                             <p class="side-by-side"><a href="#" data-tooltip="Show datacenters for this building.">
//                                 <span (click)="toggleShowDatacenters(i, bi, b)" class="glyphicon glyphicon-chevron-down"></span></a>
//                             </p>
//                         </div>
//                         <div *ngIf="b.showDatacenters" class="side-by-side">
//                             <p class="side-by-side"><a href="#" data-tooltip="Hide datacenters for this building.">
//                                 <span (click)="toggleShowDatacenters(i, bi, b)" class="glyphicon glyphicon-chevron-right"></span></a>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//                 <div *ngIf="b.showDatacenters">
//                     <div class="datacenter accordion-list" *ngFor="let dc of b.datacenters; let dci = index">
//                         <div class="data side-by-side">{{dc.name}}</div>
//                         <div class="show-button side-by-side" (click)="showDataCenterView(i, bi, dci)">ChangeView</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// </div> 
//# sourceMappingURL=siteNavigation.component.js.map