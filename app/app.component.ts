import { Component } from '@angular/core';
import {RackComponent} from './Racks/rack.component'


@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1><single-rack></single-rack>`,
})
export class AppComponent  {
  name = 'Angular'; 
  constructor(){
  }

}
