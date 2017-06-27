import {Component,EventEmitter, Input,Output} from '@angular/core';
import {RackService} from '../Racks/rack.service';
@Component({
    selector: 'file-viewer',
    template: `
        <div *ngIf="show">
            <div class="file-viewer">            
                <div class="file-viewer-container">
                    <title-bar class="title-bar"
                        [name]="title" 
                        (close)="closeWindow($event)"></title-bar>
                    <div class="file-list">

                        <div *ngFor="let file of files">
                            <div class="one-file" (click)=returnSelection(file)>
                                <div class="file-image">
                                    <img src="./app/Shared/file.png" height="100px"/>
                                </div>
                                <div>
                                    <span>{{file}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="search-bar">
                        File Name: <input width="400px" type="text-fild"/>
                    </div>
                </div>
            </div>
        </div>  
    `,
    styles:[`
        .search-bar {
            bottom: 0;
            margin-bottom: 20px;
            margin-left: 20px;
            margin-top:20px;
            height: 16px;
            position: absolute;
        }
        .one-file {
            color:white;
            display: inline-block;
            width:auto;
            font-size:10px;
            padding: 10px 10px 10px 10px;
            margin: 10px 7px;
            float:left;
        }
        .file-list{
            position: relative;
            height:450px;
            overflow:auto
        }
        .file-viewer-container {
             position: fixed;
            width: 700px; /* Set your desired with */
            height: 500px;
            z-index: 2; /* Make sure its above other items. */
            top: 25%;
            left: 35%;
            margin-top: -10%; /* Changes with height. */
            margin-left: -10%; /* Your width divided by 2. */

            /* You will not need the below, its only for styling   purposes. */
      ;
            border: 2px solid #555555;
            background-color: #ccc;
            border-radius: 5px;
            text-align: center;
        }
    `]
})
export class FileViewerComponent{
    title : string = "File Browser"
    closeWindow(e:any){
        this.close.emit(true);
    }
    @Input() show : boolean;
    @Output() close = new EventEmitter();
    @Output() selection = new EventEmitter()
    @Input() files :any;
    private returnSelection(e:any){
        this.selection.emit(e);
    }
    constructor(rackService: RackService){}
}