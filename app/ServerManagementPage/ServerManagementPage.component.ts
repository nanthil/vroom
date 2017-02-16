import {Component, NgZone} from '@angular/core'
import {RacksComponent} from '../Racks/racks.component';
import {RackService} from '../Racks/rack.service';
import {MainNavigationComponent} from '../Navigation/main.navigation.component';



@Component({
    selector: 'management-page',
    template: `
        <div class="main-view">
            <div *ngFor="let viewName of listActiveViews"><div (click)="closeView(viewName)">{{viewName}}</div></div>
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
    styles: [
    `
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
    listActiveViews: string[] = []
    changeView(e:any){
        this.getOriginalEvent(e);
    }
    closeView(viewName:string){
        //TODO:
        //GET INDEX OF FOUND view
        //SET ACTIVE VIEW TO INDEX -1 or index +1
        this.listActiveViews = this.listActiveViews.filter(str => str !== viewName); 
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
            if(this.listActiveViews.every(str => str !== eventPath)){
                this.listActiveViews.push(eventPath);
            }
            this.activeView = eventPath;
        }
    }
}