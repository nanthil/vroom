import { 
  Component, OnInit, Input, Output, OnChanges, EventEmitter, 
  trigger, state, style, animate, transition, SimpleChanges } from '@angular/core';

@Component({
    selector: "e-modal",
    template: `
        <div (click)="onEvent($event)" class="configureForm" *ngIf="show">
            <form action="demo_form.asp">
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
        </div>`,
    styles: [`
       .configureForm {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    border: 3px solid #73AD21;
}
    `]
})
export class EquipmentModalComponent {
    @Input() show: boolean;
    
    onEvent(e:any){
        e.stopPropagation();
    }
}