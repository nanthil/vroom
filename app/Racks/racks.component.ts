import {Component,Input} from '@angular/core';
import {RackComponent} from './rack.component';
import {RackService} from './rack.service';
@Component({
    selector: 'all-racks',
    template: `
        <button (click)="addNewRack()">Add New Rack</button>

        <div *ngFor="let rack of getRacksByPath(currentView)">
            <single-rack class="racks" 
                [slots]=rack.slots 
                [rackId]="rack.id" 
                [directory]="currentView">
            </single-rack>
        </div>
    `,
    styles: [`
        .racks {
            float:left;
            margin-left:5px;

        }
    `]
})
export class RacksComponent{
    @Input() currentView: any;
    @Input() racks:any;
    //TODO 
    //REFACTOR RACKS TO SEARCH FOR ACTIVE VIEW INSTEAD OF HARD REFERENCING OBJECTS
    constructor(private rackService: RackService){}

    getRacksByPath(directory:string){
        return this.rackService.getRacksByPath(directory);
    }
    addNewRack(){
        this.rackService.generateEmptyRack(this.currentView);
    }
}

// /<single-rack [directory]=currentView [rackId]=rack.></single-rack>