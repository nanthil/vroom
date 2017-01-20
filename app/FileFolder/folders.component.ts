import {Component, Input} from '@angular/core';
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
      </div>
      <div *ngIf="content.showContents" class="side-by-side">
          <p class="side-by-side"><a href="#" data-tooltip="Hide Folder Contents">
              <span (click)="content.showContents = !content.showContents" class="glyphicon glyphicon-chevron-down"></span></a>
          </p>
      </div>
    </div>
      <br>
    <div *ngIf="content.showContents">
        <div *ngFor="let file of content.files">
          <div [style.margin-left.px]="indent+15" class="accordion-list">{{file}}</div>
        </div>
      
        <div *ngFor="let folder of content.folders"> 
          <folder [content]=folder [indent]="indent + 15"></folder>
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
        `]
})
export class FolderComponent{
  @Input() content: any;
  @Input() indent: any;
}