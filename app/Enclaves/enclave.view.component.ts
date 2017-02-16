import {Component, Input} from '@angular/core'
import {RackService} from '../Racks/rack.service'
@Component({
    selector: 'single-enclave',
    template: `
        <div *ngIf="currentView !== 'undefined'">
            <all-racks
                [racks]="testmessage"
                [currentView]=currentView
            ></all-racks>
        </div>
          
        
    `
})
export class EnclaveViewComponent{
    constructor(private rackService: RackService){};
    @Input() currentView:string;
    getRacksByPath(){
        var result = this.rackService.getRacksByPath(this.currentView);
        return result;
    }
}

  