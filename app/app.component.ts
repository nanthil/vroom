import { Component } from '@angular/core';
import {RacksComponent} from './Racks/racks.component'


@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1><all-racks></all-racks>`,
})
export class AppComponent  {
  name = 'Angular'; 
  constructor(){
  }

}
