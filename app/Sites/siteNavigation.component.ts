import {Component} from '@angular/core';
import {RackService} from '../Racks/rack.service';
import {SiteComponent} from '../Sites/site.component'

@Component({
    selector: 'site-nav',
    template: `
    
        <add-new 
            [showModal]=showModal
            [whatToAdd]=typeToAdd
            (newValue)="pushNewItemToService($event)"
        ></add-new>
        <div class="site-nav-pane">
            <div>
                <h4 class="nav-title">Site Navigation
                    <p class="side-by-side"><a href="#" data-tooltip="Add new site.">
                        <span (click)="addNew('site', [])"
                        class="glyphicon glyphicon-plus"></span></a>
                    </p>
                </h4>
                
            </div>
            <div *ngIf="rackService.siteList.length === 0">
                You have no sites saved. Please add a site to begin. 
            </div>
            <div *ngFor="let site of rackService.siteList; let i = index">
                <div class="site accordion-list">
                    <div class="data side-by-side">{{site.name}}</div>
                    <div class="show-buttons side-by-side">
                        <p class="side-by-side"><a href="#" data-tooltip="Add new building to site">
                            <span (click)="addNew('building', [i])"
                                class="glyphicon glyphicon-plus">
                            </span></a>
                        </p>
                        <div *ngIf="!site.showBuildings" class="side-by-side">
                            <p class="side-by-side"><a href="#" data-tooltip="Show buildings for this site.">
                                <span (click)="toggleShowBuildings(i)" class="glyphicon glyphicon-chevron-down"></span></a>
                            </p>
                        </div>
                        <div *ngIf="site.showBuildings" class="side-by-side">
                            <p class="side-by-side"><a href="#" data-tooltip="Hide buildings for this site.">
                                <span (click)="toggleShowBuildings(i)" class="glyphicon glyphicon-chevron-right"></span></a>
                            </p>
                        </div>
                    </div>        
                </div>
                <div *ngIf="site.showBuildings">
                    <div *ngFor="let b of site.buildings; let bi = index">
                        <div class="building accordion-list">
                            <div class="data side-by-side">{{b.name}}</div>
                            <div class="show-buttons side-by-side">
                                <p class="side-by-side"><a href="#" data-tooltip="Add new datacenter to this building.">
                                    <span 
                                        (click)="addNew('datacenter', [i, bi])"
                                    class="glyphicon glyphicon-plus"></span></a>
                                </p>
                                <div *ngIf="!b.showDatacenters" class="side-by-side">
                                    <p class="side-by-side"><a href="#" data-tooltip="Show datacenters for this building.">
                                        <span (click)="toggleShowDatacenters(i, bi, b)" class="glyphicon glyphicon-chevron-down"></span></a>
                                    </p>
                                </div>
                                <div *ngIf="b.showDatacenters" class="side-by-side">
                                    <p class="side-by-side"><a href="#" data-tooltip="Hide datacenters for this building.">
                                        <span (click)="toggleShowDatacenters(i, bi, b)" class="glyphicon glyphicon-chevron-right"></span></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div *ngIf="b.showDatacenters">
                            <div class="datacenter accordion-list" *ngFor="let dc of b.datacenters; let dci = index">
                                <div class="data side-by-side">{{dc.name}}</div>
                                <div class="show-button side-by-side" (click)="showDataCenterView(i, bi, dci)">ChangeView</div>
                                
                            </div>
                        
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    `,
    styles: [
    `
        .nav-title {
            color: #ffffff;
        }
        .data {
            width: 200px;
        }
        .side-by-side {
            display: inline-block;
            float: left;
        }
        .site {
        }
        .site-nav-pane {
            height: 400px;
            border-radius: 4px;
            overflow:auto;
        }
        .accordion-list:hover {
            background-color: #ddd;
        }
        .accordion-list {

             background-color: #eee;
            color: #444;
            cursor: pointer;
            padding: 18px;
            width: 100%;
            border: none;
            outline: none;
            font-size: 15px;
            transition: 0.4s;
            height: 40px;
            width:100%;
            margin-bottom:10px;
        }
        .building {
            margin-left:10px;
        }
        .datacenter{
            margin-left: 20px;
        }
        [data-tooltip] {
  position: relative;
  z-index: 2;
  cursor: pointer;
}

[data-tooltip]:before,
[data-tooltip]:after {
  visibility: hidden;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);
  opacity: 0;
  pointer-events: none;
}

[data-tooltip]:before {
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-bottom: 5px;
  margin-left: -80px;
  padding: 7px;
  width: 160px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color: #000;
  background-color: hsla(0, 0%, 20%, 0.9);
  color: #fff;
  content: attr(data-tooltip);
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
}

[data-tooltip]:after {
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-left: -5px;
  width: 0;
  border-top: 5px solid #000;
  border-top: 5px solid hsla(0, 0%, 20%, 0.9);
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  content: " ";
  font-size: 0;
  line-height: 0;
}

[data-tooltip]:hover:before,
[data-tooltip]:hover:after {
  visibility: visible;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);
  opacity: 1;
}
    `
    ]
})
export class SiteNavigationComponent{
    showModal = false;
    typeToAdd = '';
    argsToAdd: any[] = [];
    constructor(private rackService: RackService, private siteComponent: SiteComponent){}
    toggleShowBuildings(index:number){
        this.rackService.siteList[index].showBuildings = !this.rackService.siteList[index].showBuildings;
    }
    toggleShowDatacenters(index:number, buildingIndex:number, b:any){
       this.rackService.siteList[index].buildings[buildingIndex].showDatacenters = !this.rackService.siteList[index].buildings[buildingIndex].showDatacenters;
       console.log(b.showDatacenters)
    }
    showDataCenterView(s: number, b: number, dc: number){
        //call service with the desired datacenter
        this.rackService.currentSite = {
            site: s,
            building: b,
            datacenter: dc
        }
        
        this.rackService.thereIsADatacenter = true;
        console.log(this.rackService.siteList);
    }
    addNew(type: string, args: any[]){
        this.showModal = !this.showModal;
        this.typeToAdd = type;
        this.argsToAdd = args;
    }
    pushNewItemToService(e:any){
        this.showModal = !this.showModal;
        if(!(e.inputValue === 'cancel')){
            if(this.argsToAdd.length ===0){
                this.addSite(e.inputValue)
            } else if (this.argsToAdd.length === 1){
                this.addBldg(e.inputValue);
            } else if (this.argsToAdd.length === 2){
                this.addDatacenter(e.inputValue);
            }
        }
    }
    addSite(value: string){
        this.rackService.siteList.push({ 
            name: value,
            showBuildings: false,
            buildings: []
        })
        console.log(this.rackService.siteList);
    }
    addBldg(value: string){
        this.rackService.siteList[this.argsToAdd[0]].buildings.push({
            name:value,
            showDatacenters: false,
            datacenters: []})
        console.log(this.rackService.siteList[this.argsToAdd[0]].buildings)

    }
    addDatacenter(value: string){
        this.rackService.siteList[this.argsToAdd[0]].buildings[this.argsToAdd[1]].datacenters.push({
            name: value,
            rooms: []
        })
        console.log(this.rackService.siteList[this.argsToAdd[0]].buildings[this.argsToAdd[1]].datacenters);
    }
}