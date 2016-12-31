import {Component, NgZone} from '@angular/core'
import {RacksComponent} from '../Racks/racks.component';
import {RackService} from '../Racks/rack.service';
import {NavigationComponent} from './navigation.component';



@Component({
    selector: 'management-page',
    template: `
        <single-site></single-site>
        <navigation></navigation>
      `,
    styles: [
    `
    `
    ]

})
export class ServerManagementComponent{
    constructor(private zone: NgZone, private rackService: RackService){}
}