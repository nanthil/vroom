import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'title-bar',
    template: `
        <div class="title-bar">{{name}}
        <close (close)="closeWindow(e)"></close></div>
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
        .title-bar{
            background: #333333;
            color:white;
            margin:0;
        }
    `]
})
export class TitleBarComponent{
    @Input() name:string;
    @Output() close = new EventEmitter();
    ngOnInit(){
        console.log(name);
    }
    closeWindow(e:any){
        this.close.next(e);
    }

}