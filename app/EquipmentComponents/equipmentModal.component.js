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
var forms_1 = require("@angular/forms");
//hack
var browsers = require('../NativeOperations/detectBrowsers');
var EquipmentModalComponent = (function () {
    function EquipmentModalComponent(fb, rackService, zone) {
        this.fb = fb;
        this.rackService = rackService;
        this.zone = zone;
        this.saveConfig = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
        this.titleName = "Equipment Config";
    }
    EquipmentModalComponent.prototype.closeWindow = function (e) {
        this.close.emit(e);
    };
    EquipmentModalComponent.prototype.onsubmit = function (e) {
        this.saveConfig.emit(e);
    };
    EquipmentModalComponent.prototype.ngOnInit = function () {
        if (this.config) {
            console.log(this.config);
            this.dname = this.config.dname;
            this.FQDN = this.config.FQDN;
            this.url = this.config.url;
            this.browser = this.config.browser;
            this.ipaddress = this.config.ipaddress;
            this.putty = this.config.putty;
        }
        // if(this.config){
        //     this.form = this.fb.group({
        //         'dname': ['data'],
        //         'FQDN': ['test']
        //     })
        // }
        this.detect(this.rackService, this.zone);
    };
    //implementation found in native operations
    EquipmentModalComponent.prototype.detect = function (service, z) {
        detectBrowsers().done(function (result) {
            //regular js executes outside of angular2's zone. force it to execute within angular2's zone with sone.run()
            z.run(function () {
                service.updateBrowsers(result);
            });
        });
    };
    //Only stop propogation on navigation menu components
    //if the equipment is found equipped in a slot, this.show is true and will not stop propogation
    EquipmentModalComponent.prototype.onEvent = function (e) {
        e.stopPropagation();
    };
    return EquipmentModalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EquipmentModalComponent.prototype, "show", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EquipmentModalComponent.prototype, "config", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EquipmentModalComponent.prototype, "saveConfig", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EquipmentModalComponent.prototype, "close", void 0);
EquipmentModalComponent = __decorate([
    core_1.Component({
        selector: "e-modal",
        template: "\n        \n        <div (click)=\"onEvent($event)\" *ngIf=\"show\">\n            <div class=\"mymodal\">\n                <div class=\"configureForm\">\n                 <title-bar [name]=\"titleName\" (close)=\"closeWindow($event)\"></title-bar>\n                    <form #configForm=\"ngForm\" (ngSubmit)=\"onsubmit(configForm.value)\" novalidate>\n                        DisplayName <input [(ngModel)]=\"dname\" type=\"text\" name=\"dname\"><br>\n                        FQDN <input type=\"text\" [(ngModel)]=\"FQDN\"name=\"FQDN\"><br>\n                        Management IP Address <input [(ngModel)]=\"ipaddress\" type=\"text\" name=\"ipaddress\"><br>\n\n                        <h3>Remote Management</h3>\n                        <div>\n                            <input  [(ngModel)]=\"putty\" name=\"putty\" type=\"checkbox\">\n                            <img name=\"putty img\" src=\"./app/EquipmentComponents/img/thREXG7RQ8.jpg\" class=\"browser-img\"/>\n                            <label for=\"putty\">Putty</label>\n                        </div>\n\n                        <h3>Web UI Management</h3>\n                        <div class=\"browsers\" *ngFor=\"let b of rackService.browsers\">\n                            <div>\n                                <div class=\"browser\">\n                                <input [(ngModel)]=\"browser\"\n                                        type=\"radio\" name=\"browser\" [value]=\"b.name\">\n                                </div>\n                                <div class=\"browser\" *ngIf=\"b.installed\">\n                                    <label class=\"browser-message\" [attr.for]=\"b.name\">Detected\n                                        <img class=\"browser-img\" [alt]=\"b.name\" [src]=\"b.img\"/><br>\n                                    </label>\n                                </div>\n                                <div class=\"browser\" *ngIf=\"!b.installed\">\n                                    \n                                    <label class=\"browser-message\" [attr.for]=\"b.name\">Not Detected\n                                        <img class=\"browser-img img-deactivated\" [alt]=\"b.name\" [src]=\"b.img\"/><br>\n                                    </label>\n                                    \n                                </div>\n                            </div>\n                        </div>\n                        <button type=\"button\" class=\"btn btn-primary\" (click)=\"detect(this.rackService, this.zone)\">Rediscover</button><br>\n\n                        WebUrl <input [(ngModel)]=\"url\"\n                            type=\"text\" name=\"url\"><br>\n                        \n                        <button type=\"button\">Cancel</button>\n                        <input type=\"submit\" value=\"Submit\">\n                        \n                    </form>\n                </div>\n            </div>\n        </div>\n        ",
        styles: ["\n        .browsers {\n            display: flex;\n        }\n        .browser {\n            display: inline-block;\n            float: left;\n        }\n       .configureForm {\n            position:fixed;\n            top: 50%;\n            left: 50%;\n            margin-top: -300px; /*set to a negative number 1/2 of your height*/\n            margin-left: -200px; /*set to a negative number 1/2 of your width*/\n            background-color: #cccccc;\n            border: 3px solid #73AD21;\n        }\n        .browser-img{\n            height:30px;\n        }\n        .img-deactivated{\n                filter: gray; /* IE6-9 */\n                filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */\n                -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */\n        }\n        .mymodal {\n            position: fixed; /* Stay in place */\n            z-index: 1; /* Sit on top */\n            left: 0;\n            top: 0;\n            width: 100%; /* Full width */\n            height: 100%; /* Full height */\n            overflow: auto; /* Enable scroll if needed */\n            background-color: rgb(0,0,0); /* Fallback color */\n            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n        }\n    "]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, rack_service_1.RackService, core_1.NgZone])
], EquipmentModalComponent);
exports.EquipmentModalComponent = EquipmentModalComponent;
//# sourceMappingURL=equipmentModal.component.js.map