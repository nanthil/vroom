//built-in
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';

//public
import { DndModule } from 'ng2-dnd';
 import { Ng2PopupModule } from 'ng2-popup';

//native
import {EquipmentComponent} from './EquipmentComponents/equipment.component';
import {EquipmentModalComponent} from './EquipmentComponents/equipmentModal.component'
import {EquipmentsComponent} from './EquipmentComponents/equipments.component';
import {RackComponent} from './Racks/rack.component';
import {SlotComponent} from './Racks/slot.component';


@NgModule({
  imports:      [ 
    BrowserModule, 
    HttpModule, 
    DndModule.forRoot(),
    Ng2PopupModule],
  declarations: [ 
    AppComponent,
    EquipmentComponent,
    EquipmentModalComponent,
    EquipmentsComponent,
    SlotComponent,
    RackComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
