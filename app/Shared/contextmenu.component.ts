import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    host: {
        '(document:click)': 'onOutsideClick($event)'
    },
    selector: 'context-menu',
    template: `
        <div class="main-context-area" 
            [style.top.px]="y -50"
            [style.left.px]="x">
            <div *ngIf="showContextMenu" class="context">
                <div class="list-of-options" *ngFor="let o of options">
                    <span (click)="returnSelected(o)">{{o}}</span>
                </div>
            </div>
        </div>
    `,
    styles:[`
    
      .context {
          color: blue;
      }
      .main-context-area {
          position: fixed;
          z-index: 3;
      }
      .list-of-options {
          background: green;
      }
    `]
})
export class ContextMenuComponent{
   @Input() showContextMenu: boolean;
   @Input() options: any = [];
   @Input() x: any;
   @Input() y: any;
   //TODO on selecting an option, output that option
   @Output() selected = new EventEmitter();
   returnSelected(e: any){
       console.log(e);
       this.selected.next(e);
   }
   onOutsideClick(e:any){
        this.returnSelected('cancel');
   }
}