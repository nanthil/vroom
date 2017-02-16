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
import {AddNewFileFolderModalComponent} from './Shared/addnew.filefolder.component';
import {MainNavigationComponent} from './Navigation/main.navigation.component';

import {FolderNavigationComponent} from './Navigation/folder.navigation.component';
import {EnclaveViewComponent} from './Enclaves/enclave.view.component';

//import {FileComponent} from './FileFolder/files.component';
import {FolderComponent} from './FileFolder/folders.component';



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
    MainNavigationComponent,
    FolderNavigationComponent,
    EnclaveViewComponent,
    AddNewFileFolderModalComponent,
   // FileComponent,
    FolderComponent
   ],
   providers: [RackService, EnclaveViewComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
