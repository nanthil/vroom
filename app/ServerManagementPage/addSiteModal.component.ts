import {Component, Input, EventEmitter, Output,} from '@angular/core';
import {RackService} from '../Racks/rack.service';

@Component({
    selector: 'add-new',
    template: `
        <div *ngIf="showModal" class="addmodal"> 
            <div class="add-form">
                Add new {{whatToAdd}} <input type="text" name="dname" [(ngModel)]="inputValue"><br>
                <div (click)="_newValue()" class="btn btn-primary">Submit</div>
                <div (click)="_cancel()" class="btn btn-danger">Cancel</div>
            </div>
        </div>
    `,
    styles: [`
       .add-form {
            position:fixed;
            top: 50%;
            left: 50%;
            margin-top: -300px; /*set to a negative number 1/2 of your height*/
            margin-left: -200px; /*set to a negative number 1/2 of your width*/
            background-color: #cccccc;
            border: 3px solid #73AD21;
        }
        .addmodal {
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
    `]
})
export class AddNewSiteModalComponent{
    inputValue: string = '';
    showError = false;
    @Input() showModal: boolean;
    @Input() whatToAdd: string;
    @Output() newValue = new EventEmitter();
    private _newValue(){
        if(this.inputValue.length === 0){
            this.showError = true;
        } else {
            this.newValue.emit({added: this.whatToAdd,inputValue: this.inputValue})
            this.inputValue = '';
        }
    }
    private _cancel(){
        this.newValue.emit({added: this.whatToAdd, inputValue: 'cancel'})
        this.inputValue = '';
    }
}