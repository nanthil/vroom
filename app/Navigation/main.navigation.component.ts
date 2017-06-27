import {Component, Output, EventEmitter} from '@angular/core';
@Component({
    selector: 'navigation',
    template: `
        <div class="nav-bar">
            <site-nav 
                (setView)=changeView($event)
                (rename)=renameActiveViews($event)></site-nav>
            <all-equipment [isNav]="true" [width]="rackWidth"></all-equipment>
        </div>
    `,
    styles: [`
        .test{
            right:0;
            position:fixed;
            top:0;
            background:red;
        }
        .nav-bar {
            position:fixed;
            top:0;
            right:0;
            height: 100vh;
            width: 400px;
            background-color: #25272b;
        }
    `]
})
export class MainNavigationComponent{
    rackWidth = 40;
    something: any;
    @Output() rename = new EventEmitter();
    renameActiveViews(e:any){
        this.rename.next(e);
    }
    @Output() setView = new EventEmitter();
    changeView(e:any){
        this.setView.next(e);
    }
    resize(e:any){
        console.log(e);
    }
}
