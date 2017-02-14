import {Component,Output, EventEmitter} from '@angular/core';
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
        <div class="folder-nav">
            <h4 class="nav-title">Site Navigation
                <p class="side-by-side"><a href="#" data-tooltip="Add new site.">
                    <span (click)="addNew()"
                    class="glyphicon glyphicon-folder-open"></span></a>
                </p>
                
            </h4>
            <div class="fix-overflow" *ngFor="let folder of rackService.testNewData; let i = index">
                <div class="accordion-list">
                    <folder 
                        (setView)=changeView($event)
                        [indent]=0 
                        [content]=folder 
                        [currentDirectory]=folder.name
                        ></folder>
                </div>
            </div>
        </div>
    `,
    styles: [
    `
        .fix-overflow{
            display: block;
            width: 100%;
        }
        .folder-nav{
            overflow:auto;
            height: 600px;
        }
        .site-nav-div{
            position: fixed;
            top: 0;
        }
        .nav-title {
            color: #ffffff;
        }
        .data {
            width: 200px;
        }
        .side-by-side {
            display: block;
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
    toggleFolderContents(index:number){
        console.log(index);
        console.log(this.rackService.testNewData[index]);
        this.rackService.testNewData[index].showContents = !this.rackService.testNewData[index].showContents;
    }
    showModal = false;
    typeToAdd = '';
    argsToAdd: any[] = [];
    constructor(private rackService: RackService, private siteComponent: SiteComponent){}

    //MOVE THIS TO A SERVICE 
    //ANGULAR 2 DOES NOT SUPPORT DEEP NESTED EVENT EMISSION 
    @Output() setView = new EventEmitter();
    changeView(e:any){
        this.setView.emit(e);
    }
    addNew(){
        this.showModal = !this.showModal;
        this.typeToAdd = 'File'
    }
    pushNewItemToService(e:any){
        this.showModal = !this.showModal;
        if(!(e.inputValue === 'cancel')){
            this.rackService.addFolder(e.inputValue, '')
        }
    }
}
