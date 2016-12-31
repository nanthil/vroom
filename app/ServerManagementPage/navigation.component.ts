import {Component} from '@angular/core';
let browsers = require('../NativeOperations/detectBrowsers');
declare var importOs: any;
@Component({
    selector: 'navigation',
    template: `
        <div class="nav-bar">
            <site-nav></site-nav>
            <all-equipment [width]="rackWidth"></all-equipment>
        </div>
    `,
    styles: [`
        .nav-bar {
            position:fixed;
            top:0;
            right:0;
            height: 100vh;
            width: 400px;
            background-color: blue;
        }
    `]
})
export class NavigationComponent{
    rackWidth = 40;
    something: any;
}
