import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'close',
    template: `
        <span class="close-button glyphicon glyphicon-remove"
            (click)="closeWindow(e)"></span>
    `,
    styles:[`
        .close-button {
            float:right;
            background: #cc5588;
        }
        .close-button:hover{
            color: #cc5588;
            background: none;
        }
    `]
})
export class CloseButtonComponent{
    @Output() close = new EventEmitter();

    closeWindow(e:any){
        this.close.next(e);
    }
}