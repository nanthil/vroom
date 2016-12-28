import { 
  Component, OnInit, Input, Output, OnChanges, EventEmitter, 
  trigger, state, style, animate, transition, SimpleChanges } from '@angular/core';

@Component({
    selector: "e-modal",
    template: `
        
        <div (click)="onEvent($event)" *ngIf="show">
            <div class="mymodal">
                <div class="configureForm">
                    <form>
                        DisplayName <input type="text" name="dname"><br>
                        FQDN <input type="text" name="FQDN"><br>
                        Management IP Address <input type="text" name="ipaddress"><br>

                        <h3>Remote Management</h3>
                        <input type="radio" name="remote" value="1" checked>Option 2<br>
                        <input type="radio" name="remote" value="2">Option 3<br>
                        <input type="radio" name="remote" value="3">Option 4<br>
                        <button class="btn btn-primary">Rediscover</button>

                        <h3>Web UI Management</h3>
                        <input type="radio" name="remote" value="1" checked>Option 2<br>
                        <input type="radio" name="remote" value="2">Option 3<br>
                        <input type="radio" name="remote" value="3">Option 4<br>
                        <button class="btn btn-primary">Rediscover</button><br>

                        WebUrl <input type="text" name="url"><br>
                        
                        <input type="submit" value="Cancel">
                        <input type="submit" value="Submit">
                        
                    </form>
                </div>
            </div>
        </div>
        `,
    styles: [`
       .configureForm {
            position:fixed;
            top: 50%;
            left: 50%;
            margin-top: -300px; /*set to a negative number 1/2 of your height*/
            margin-left: -200px; /*set to a negative number 1/2 of your width*/
            background-color: #cccccc;
            border: 3px solid #73AD21;
        }
        .mymodal {
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
export class EquipmentModalComponent {
    @Input() show: boolean;
    
    onEvent(e:any){
        e.stopPropagation();
    }
}