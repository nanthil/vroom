import {Component, Input} from '@angular/core';
import {RackService} from '../Racks/rack.service';
@Component({
  selector: 'folder',
  template: `
  <div [style.margin-left.px]="indent">
    <div class="accordion-list">
      <div class="side-by-side">{{content.name}}</div>
      <div *ngIf="!content.showContents" class="side-by-side">
          <p class="side-by-side"><a href="#" data-tooltip="Show folder contents">
              <span (click)="content.showContents = !content.showContents" class="glyphicon glyphicon-chevron-right"></span></a>
              
          </p>
          <p class="side-by-side"><a href="#" data-tooltip="Add new file.">
            <span (click)="addNew()"
            class="glyphicon glyphicon-file"></span></a>
          </p>
             <p class="side-by-side"><a href="#" data-tooltip="Add new file.">
            <span (click)="addNew()"
            class="glyphicon glyphicon-folder-open"></span></a>
          </p>	
      </div>
      <div *ngIf="content.showContents" class="side-by-side">
          <p class="side-by-side"><a href="#" data-tooltip="Hide Folder Contents">
              <span (click)="content.showContents = !content.showContents" class="glyphicon glyphicon-chevron-down"></span></a>
          </p>
          <p class="side-by-side"><a href="#" data-tooltip="Add new file.">
            <span (click)="addNew()"
            class="glyphicon glyphicon-file"></span></a>
          </p>
             <p class="side-by-side"><a href="#" data-tooltip="Add new file.">
            <span (click)="addNew()"
            class="glyphicon glyphicon-folder-open"></span></a>
          </p>	
      </div>
    </div>
      <br>
    <div *ngIf="content.showContents">
        <div *ngFor="let file of content.files">
          <div [style.margin-left.px]="indent+15" class="accordion-list">{{file}}</div>
        </div>
      
        <div *ngFor="let folder of content.folders"> 
          <folder [currentDirectory]="currentDirectory + '/' + folder.name" [content]=folder [indent]="indent + 15"></folder>
        </div>
    </div>
  </div>
  `,
  styles: [`
        .side-by-side {
            display: inline-block;
            float: left;
        }
        .accordion-list:hover {
            background-color: #ddd;
        }
        .accordion-list {

             background-color: #eee;
            color: #444;
            cursor: pointer;
            padding: 18px;
            width: 100%;
            border: none;
            outline: none;
            font-size: 15px;
            transition: 0.4s;
            height: 40px;
            width:100%;
            margin-bottom:10px;
        }
        
[data-tooltip]:before,
[data-tooltip]:after {
  visibility: hidden;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);
  opacity: 0;
  pointer-events: none;
}

[data-tooltip]:before {
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-bottom: 5px;
  margin-left: -80px;
  padding: 7px;
  width: 160px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color: #000;
  background-color: hsla(0, 0%, 20%, 0.9);
  color: #fff;
  content: attr(data-tooltip);
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
}

[data-tooltip]:after {
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-left: -5px;
  width: 0;
  border-top: 5px solid #000;
  border-top: 5px solid hsla(0, 0%, 20%, 0.9);
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  content: " ";
  font-size: 0;
  line-height: 0;
}

[data-tooltip]:hover:before,
[data-tooltip]:hover:after {
  visibility: visible;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);
  opacity: 1;
}
        `]
})
export class FolderComponent{
  @Input() content: any;
  @Input() indent: any;
  @Input() currentDirectory: string;
  constructor(private rackService: RackService){}
  ngOnInit(){
  }
  addNew(){
      this.rackService.addFolder('test', this.currentDirectory);
  }
}