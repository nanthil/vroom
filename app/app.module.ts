import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import {DndModule} from 'ng2-dnd';

import {EquipmentComponent} from './EquipmentComponents/equipment.component';
import {EquipmentsComponent} from './EquipmentComponents/equipments.component';
import {RackComponent} from './Racks/rack.component';
import {SlotComponent} from './Racks/slot.component';


@NgModule({
  imports:      [ BrowserModule, HttpModule, DndModule.forRoot() ],
  declarations: [ 
    AppComponent,
    EquipmentComponent,
    EquipmentsComponent,
    SlotComponent,
    RackComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
