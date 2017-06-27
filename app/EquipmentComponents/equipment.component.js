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
var EquipmentComponent = (function () {
    function EquipmentComponent() {
        this.newConfig = new core_1.EventEmitter();
    }
    EquipmentComponent.prototype.saveEquipmentConfig = function (e) {
        //this should push even up to set property on existing equipment
        this.newConfig.emit(e);
    };
    EquipmentComponent.prototype.ngOnInit = function () {
        //this id is intended to not delete another equipment of another id when moving equipment already installed into a rack
        if (this.id === undefined)
            this.id = window.uuidV4();
        this.setValues();
    };
    EquipmentComponent.prototype.closeEModal = function (e) {
        this.showConfig = false;
    };
    EquipmentComponent.prototype.ngOnChanges = function (c) {
        this.setValues();
    };
    EquipmentComponent.prototype.setValues = function () {
        this.name = this.equipment.name;
        this.equipmentImg = this.equipment.imgUrl;
        //data transfers on drop
        this.transferData = {
            config: this.config,
            e: this.equipment,
            w: this.width,
            id: this.id,
            relocateInRack: this.moveActiveEquipmentToNewSlot
        };
    };
    return EquipmentComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EquipmentComponent.prototype, "isNav", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EquipmentComponent.prototype, "isActive", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EquipmentComponent.prototype, "equipment", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EquipmentComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EquipmentComponent.prototype, "showConfig", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EquipmentComponent.prototype, "height", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EquipmentComponent.prototype, "moveActiveEquipmentToNewSlot", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EquipmentComponent.prototype, "config", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EquipmentComponent.prototype, "newConfig", void 0);
EquipmentComponent = __decorate([
    core_1.Component({
        selector: 'single-equipment',
        template: "\n        <e-modal [show]=\"showConfig\"\n            (close)=closeEModal($event)\n            (saveConfig)=saveEquipmentConfig($event)\n            [config]=\"config\"></e-modal>\n        <div class=\"equipment\" \n            [ngClass]=\"{'nav-equipment': isNav}\" >\n\n            <div *ngIf=\"isActive || isNav\"\n            [ngClass]=\"{'no-config': config === undefined && isActive}\">\n                <img class=\"e-image\" dnd-draggable [dragEnabled]=\"true\"\n                    \n                    [ngClass]=\"{'e-image-no-config': config === undefined && isActive}\"\n                    [dragData]=\"transferData\"\n                    [alt]=\"name\"\n                    [src]=\"equipmentImg\"\n                    [style.height.px]=\"height\" />\n            </div>\n        </div>\n     ",
        styles: ["\n      .no-config {\n             background: red;\n        }\n        .e-image-no-config{\n            opacity: .5;\n        }\n        .e-image {\n            display: table;\n            width: 100%\n        }\n        .equipment{\n            display: table;\n            height: 100%;\n        }\n        .nav-equipment{\n            margin: 3px;\n        }"]
    })
], EquipmentComponent);
exports.EquipmentComponent = EquipmentComponent;
//# sourceMappingURL=equipment.component.js.map