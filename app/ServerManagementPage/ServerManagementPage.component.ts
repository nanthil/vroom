import {Component, NgZone} from '@angular/core'
import {RacksComponent} from '../Racks/racks.component';
import {RackService} from '../Racks/rack.service';
import {NavigationComponent} from './navigation.component';



@Component({
    selector: 'management-page',
    template: `
        <div *ngIf="activeView !== ''">
            <single-site [currentView]="activeView"></single-site>
        </div>
        <navigation (setView)="changeView($event)"></navigation>
      `,
    styles: [
    `
    `
    ]

})
export class ServerManagementComponent{
    constructor(private zone: NgZone, private rackService: RackService){}
    activeView:string ='';
    changeView(e:any){
        this.getOriginalEvent(e);
    }
    getOriginalEvent(event:any){
        if(typeof(event.b) === 'object'){
            this.getOriginalEvent(event.b);
        } else{
            this.activeView =  event.a + '/' + event.b;
            console.log(this.activeView);
        }
    }
}