import {Component, NgZone} from '@angular/core'
import {RacksComponent} from '../Racks/racks.component';
import {RackService} from '../Racks/rack.service';
import {MainNavigationComponent} from '../Navigation/main.navigation.component';



@Component({
    selector: 'management-page',
    template: `
        <tag-manager></tag-manager>
        <div class="main-view">
            <nav>
                <ul class="nav nav-pills list-inline enclave-bar">
                    <li *ngFor="let view of listActiveViews" 
                        class="top-nav-pill" 
                        role="presentation">
                        <a [ngClass]="{'my-active': view.isActive}"
                            (click)="switchActiveView(view)">
                            <close (close)="closeView(view.name)"></close>
                            {{view.name}}
                        </a>
                    </li>
                </ul>
            </nav>
            <div *ngIf="activeView !== ''">
                <single-enclave [currentView]="activeView"></single-enclave>
            </div>
            <div *ngIf="activeView === ''">
                <div class="empty-main">
                    NO FILE CURRENTLY SELECTED
                </div>
            </div>
        </div>
        <navigation (setView)="changeView($event)"></navigation>
      `,
    styles: [`
        .enclave-bar {
            background: #336688;
        }
        .my-active {
            background: #456789 !important;
        }
        .top-nav-pill {
            border-radius:2% !important;
            border-color: #cccccc;
            border-style:solid;
            border-width:2px;
            margin:0;
            padding:0;
        }
        .top-nav-pill a {
            background: #555555;
            color: #cccccc; 
        }
        .top-nav-pill a:hover {
            background: #444444;
            color: #dddddd; 
        }
    
        .close-button{
            float: right;
        }
        .close-button:hover{
            color: #cc5588;
        }
        .main-view{
            height: 100vh;
            background-color: gainsboro;
        }
        .empty-main {
            padding:10%;
            margin:auto;
            font-size: 50px;
        }
    `
    ]

})
export class ServerManagementComponent{
    constructor(private zone: NgZone, private rackService: RackService){}
    activeView:string ='';
    listActiveViews: any[] = [];

    switchActiveView(event:any){
        this.listActiveViews = this.listActiveViews.map(e => {return {name: e.name, isActive: (event.name === e.name)}});
        this.activeView = event.name;
    }
    changeView(e:any){
        this.getOriginalEvent(e);
    }
    closeView(viewName:string){
        //TODO:
        //GET INDEX OF FOUND view
        //SET ACTIVE VIEW TO INDEX -1 or index +1
        this.listActiveViews = this.listActiveViews.filter(str => str.name !== viewName); 
        if(this.listActiveViews.length ===0){
            this.activeView = '';
        }
    }
    getOriginalEvent(event:any){
        //folder is a nested component, and as such the event also happens recursively
        //unpack the object b until b is a string of the selected file in the path
        //this path/to/my/selected/file is the file that will be viewed in the single-enclave component
        if(typeof(event.b) === 'object'){
            this.getOriginalEvent(event.b);
        } else{
            var eventPath = event.a + '/' + event.b;
            if(this.listActiveViews.every(str => str.name !== eventPath)){
                this.listActiveViews = this.listActiveViews.map(e => {return {name: e.name, isActive: false}});
                this.listActiveViews.push({name: eventPath, isActive:true});
            } else {
                this.listActiveViews = this.listActiveViews.map(e => {return {name: e.name, isActive: (eventPath === e.name)}});
            }
            this.activeView = eventPath;
        }
    }
}