import {Component} from '@angular/core';
import {RackComponent} from './rack.component';
import {RackService} from './rack.service';
@Component({
    selector: 'all-racks',
    template: `
        <button (click)="addNewRack()">Add New Rack</button>
        <div *ngFor="let rack of numOfRacks">
            <div class="racks">
                <single-rack
                    [rackId]=rack
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
    rackId: string;
    newRackId: number;
    numOfRacks: any[] = [];
    ngOnInit(){
        this.newRackId = 0;
        this.numOfRacks.push('rack' + this.newRackId);
    }
    addNewRack(){
        this.newRackId ++;
        this.numOfRacks.push('rack'+ this.newRackId);
    }
    

}
