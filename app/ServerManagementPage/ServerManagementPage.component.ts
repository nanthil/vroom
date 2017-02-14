import {Component, NgZone} from '@angular/core'
import {RacksComponent} from '../Racks/racks.component';
import {RackService} from '../Racks/rack.service';
import {NavigationComponent} from './navigation.component';



@Component({
    selector: 'management-page',
    template: `
        <single-site [currentView]=activeSite></single-site>
        <navigation (setView)=changeView($event)></navigation>
      `,
    styles: [
    `
    `
    ]

})
export class ServerManagementComponent{
    constructor(private zone: NgZone, private rackService: RackService){}
    activeSite:string ='';
    changeView(e:any){
        this.getOriginalEvent(e);
    }
    getOriginalEvent(event:any){
        if(typeof(event.b) === 'object'){
            this.getOriginalEvent(event.b);
        } else{
            this.activeSite=  event.a + '/' + event.b;
        }
    }
}