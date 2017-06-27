import { 
  Component, OnInit, Input, Output, OnChanges, EventEmitter, 
  trigger, state, style, animate, transition, SimpleChanges,NgZone } from '@angular/core';
  import {RackService} from '../Racks/rack.service';
  import { FormGroup, FormControl, Validators, FormBuilder, FormArray }
  from '@angular/forms';
//hack
let browsers = require('../NativeOperations/detectBrowsers');
declare var detectBrowsers: any;
@Component({
    selector: "e-modal",
    template: `
        
        <div (click)="onEvent($event)" *ngIf="show">
            <div class="mymodal">
                <div class="configureForm">
                 <title-bar [name]="titleName" (close)="closeWindow($event)"></title-bar>
                    <form #configForm="ngForm" (ngSubmit)="onsubmit(configForm.value)" novalidate>
                        DisplayName <input [(ngModel)]="dname" type="text" name="dname"><br>
                        FQDN <input type="text" [(ngModel)]="FQDN"name="FQDN"><br>
                        Management IP Address <input [(ngModel)]="ipaddress" type="text" name="ipaddress"><br>

                        <h3>Remote Management</h3>
                        <div>
                            <input  [(ngModel)]="putty" name="putty" type="checkbox">
                            <img name="putty img" src="./app/EquipmentComponents/img/thREXG7RQ8.jpg" class="browser-img"/>
                            <label for="putty">Putty</label>
                        </div>

                        <h3>Web UI Management</h3>
                        <div class="browsers" *ngFor="let b of rackService.browsers">
                            <div>
                                <div class="browser">
                                <input [(ngModel)]="browser"
                                        type="radio" name="browser" [value]="b.name">
                                </div>
                                <div class="browser" *ngIf="b.installed">
                                    <label class="browser-message" [attr.for]="b.name">Detected
                                        <img class="browser-img" [alt]="b.name" [src]="b.img"/><br>
                                    </label>
                                </div>
                                <div class="browser" *ngIf="!b.installed">
                                    
                                    <label class="browser-message" [attr.for]="b.name">Not Detected
                                        <img class="browser-img img-deactivated" [alt]="b.name" [src]="b.img"/><br>
                                    </label>
                                    
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" (click)="detect(this.rackService, this.zone)">Rediscover</button><br>

                        WebUrl <input [(ngModel)]="url"
                            type="text" name="url"><br>
                        
                        <button type="button">Cancel</button>
                        <input type="submit" value="Submit">
                        
                    </form>
                </div>
            </div>
        </div>
        `,
    styles: [`
        .browsers {
            display: flex;
        }
        .browser {
            display: inline-block;
            float: left;
        }
       .configureForm {
            position:fixed;
            top: 50%;
            left: 50%;
            margin-top: -300px; /*set to a negative number 1/2 of your height*/
            margin-left: -200px; /*set to a negative number 1/2 of your width*/
            background-color: #cccccc;
            border: 3px solid #73AD21;
        }
        .browser-img{
            height:30px;
        }
        .img-deactivated{
                filter: gray; /* IE6-9 */
                filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
                -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
        }
        .mymodal {
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
    `]
})
export class EquipmentModalComponent {
    @Input() show: boolean;
    @Input() config: any;
    dname: string;
    FQDN: string;
    url: string;
    ipaddress:string;
    browser:string;
    putty: boolean;
    @Output() saveConfig = new EventEmitter();
    @Output() close = new EventEmitter();
    form: FormGroup;
    titleName = "Equipment Config";
    closeWindow(e:any){
      this.close.emit(e);

    }
    onsubmit(e:any){
        this.saveConfig.emit(e);
        
    }
    constructor(private fb: FormBuilder,private rackService: RackService, private zone: NgZone){}
    ngOnInit(){
        if(this.config){
            console.log(this.config);
            this.dname = this.config.dname;
            this.FQDN = this.config.FQDN;
            this.url = this.config.url;
            this.browser = this.config.browser;
            this.ipaddress = this.config.ipaddress
            this.putty = this.config.putty;
        }
        // if(this.config){
        //     this.form = this.fb.group({
        //         'dname': ['data'],
        //         'FQDN': ['test']
        //     })
        // }
        this.detect(this.rackService, this.zone);
    }
    //implementation found in native operations
    detect(service: RackService, z: NgZone){
        detectBrowsers().done(function(result:any){
            //regular js executes outside of angular2's zone. force it to execute within angular2's zone with sone.run()
            z.run(() => {
                service.updateBrowsers(result);
            });
        });
    }
    //Only stop propogation on navigation menu components
    //if the equipment is found equipped in a slot, this.show is true and will not stop propogation
    onEvent(e:any){
        e.stopPropagation();
    }
}