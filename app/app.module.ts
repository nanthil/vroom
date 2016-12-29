//built-in
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import {FormsModule} from '@angular/forms';

//public
import { DndModule } from 'ng2-dnd';
 import { Ng2PopupModule } from 'ng2-popup';

//native
import {EquipmentComponent} from './EquipmentComponents/equipment.component';
import {EquipmentModalComponent} from './EquipmentComponents/equipmentModal.component'
import {EquipmentsComponent} from './EquipmentComponents/equipments.component';

import {RacksComponent} from './Racks/racks.component';
import {RackComponent} from './Racks/rack.component';
import {RackService} from './Racks/rack.service';
import {SlotComponent} from './Racks/slot.component';

import {ServerManagementComponent} from './ServerManagementPage/ServerManagementPage.component';
import {AddNewSiteModalComponent} from './ServerManagementPage/addSiteModal.component';
import {NavigationComponent} from './ServerManagementPage/navigation.component';

import {SiteNavigationComponent} from './Sites/siteNavigation.component';
import {SiteComponent} from './Sites/site.component'


@NgModule({
  imports:      [ 
    BrowserModule, 
    HttpModule, 
    DndModule.forRoot(),
    Ng2PopupModule,
    FormsModule],
  declarations: [ 
    AppComponent,
    EquipmentComponent,
    EquipmentModalComponent,
    EquipmentsComponent,
    SlotComponent,
    RackComponent,
    RacksComponent,
    ServerManagementComponent,
    NavigationComponent,
    SiteNavigationComponent,
    SiteComponent,
    AddNewSiteModalComponent
   ],
   providers: [RackService, SiteComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
