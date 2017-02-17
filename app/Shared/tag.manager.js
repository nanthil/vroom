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
var TagManagerComponent = (function () {
    function TagManagerComponent() {
        this.listOfTags = ['Denver', 'Houston', 'Washington D.C.', 'Bums'];
        this.windowName = "Tag Manager";
    }
    TagManagerComponent.prototype.deleteTag = function (e) {
        this.listOfTags = this.listOfTags.filter(function (str) { return str !== e; });
    };
    TagManagerComponent.prototype.addNewTags = function (newTags) {
        var _this = this;
        //push unique items to list
        newTags.split(',').forEach(function (e) {
            if (_this.listOfTags.every(function (x) { return x !== e; }))
                _this.listOfTags.push(e);
        });
        this.newTags = '';
    };
    TagManagerComponent.prototype.closeWindow = function (e) {
        console.log('closed');
    };
    return TagManagerComponent;
}());
TagManagerComponent = __decorate([
    core_1.Component({
        selector: 'tag-manager',
        template: "\n        <div class=\"tag tag-manager-modal\">\n            <title-bar \n                [name]=\"windowName\" \n                (close)=\"closeWindow($event)\"></title-bar>\n            <div tag tag-title><p>Managing Tags For folder/folder</p></div>\n            <div class=\"tag tag-list\">\n                <div *ngFor=\"let tag of listOfTags\">\n                    <div class=\"tag tag-item\">\n                        <span>{{tag}}</span>\n                        <close (close)=\"deleteTag(tag)\"></close>       \n                    </div>\n                </div>\n            </div>\n            <p><i>You can add any number of new tags, separated by a comma (no spaces).</i></p>\n            <div class=\"add-tag\">New Tag: <input [(ngModel)]=newTags type=\"textbox\"/><button (click)=\"addNewTags(newTags)\">Submit</button></div>\n        </div>\n    ",
        styles: ["\n        .add-tag {\n            margin: 10px 50px 30px 20px;\n        }\n        .title-bar{\n            background: #333333;\n            color:white;\n            margin:0;\n        }\n        .tag .tag-title {\n\n        }\n        .tag-manager-modal {\n            position:fixed;\n            top: 50%;\n            left: 50%;\n            margin-top: -300px; /*set to a negative number 1/2 of your height*/\n            margin-left: -200px; /*set to a negative number 1/2 of your width*/\n            background-color: #cccccc;\n            border: 3px solid #73AD21;\n            \n        }\n        .tag .tag-item{\n            color:white;\n            background: #156789;\n            border-radius:10%;\n            border-color: gray;\n            border-style: solid;\n            border-width: 3px;\n            display: inline-block;\n            width:auto;\n            font-size:30px;\n            padding: 10px 10px 10px 10px;\n            margin: 10px 7px;\n            float:left;\n            \n        }\n        .tag .tag-list{\n            background: blue;\n            overflow:auto;\n            height:50vh;\n        }\n        tag-manager-something{\n            position: fixed; /* Stay in place */\n            z-index: 1; /* Sit on top */\n            left: 0;\n            top: 0;\n            width: 100%; /* Full width */\n            height: 100%; /* Full height */\n            overflow: auto; /* Enable scroll if needed */\n            background-color: rgb(0,0,0); /* Fallback color */\n            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n        }\n    "]
    }),
    __metadata("design:paramtypes", [])
], TagManagerComponent);
exports.TagManagerComponent = TagManagerComponent;
//# sourceMappingURL=tag.manager.js.map