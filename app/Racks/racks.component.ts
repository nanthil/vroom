import {Component} from '@angular/core';
import {RackComponent} from './rack.component';
import {RackService} from './rack.service';
@Component({
    selector: 'all-racks',
    template: `
        <button (click)="addNewRack()">Add New Rack</button>
        <div *ngFor="let rack of rackService.rackList; let i = index">
            <div class="racks">
                <single-rack
                    [rackId]=i
                    ></single-rack>
            </div>
        </div>
    `,
    styles: [`
        .racks {
            float:left;
        }
    `]
})
export class RacksComponent{
    newRackId: number;
    constructor(private rackService: RackService){}
    ngOnInit(){
        this.newRackId = 0;
    }
    addNewRack(){
        this.rackService.generateEmptyRack(this.newRackId);
        this.newRackId ++;
    }
}
