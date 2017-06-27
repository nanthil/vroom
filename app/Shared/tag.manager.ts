import {Component} from '@angular/core';

@Component({
    selector: 'tag-manager',
    template: `
        <div class="tag tag-manager-modal">
            <title-bar 
                [name]="windowName" 
                (close)="closeWindow($event)"></title-bar>
            <div tag tag-title><p>Managing Tags For folder/folder</p></div>
            <div class="tag tag-list">
                <div *ngFor="let tag of listOfTags">
                    <div class="tag tag-item">
                        <span>{{tag}}</span>
                        <close (close)="deleteTag(tag)"></close>       
                    </div>
                </div>
            </div>
            <p><i>You can add any number of new tags, separated by a comma (no spaces).</i></p>
            <div class="add-tag">New Tag: <input [(ngModel)]=newTags type="textbox"/><button (click)="addNewTags(newTags)">Submit</button></div>
        </div>
    `,
    styles:[`
        .add-tag {
            margin: 10px 50px 30px 20px;
        }
        .title-bar{
            background: #333333;
            color:white;
            margin:0;
        }
        .tag .tag-title {

        }
        .tag-manager-modal {
            position:fixed;
            top: 50%;
            left: 50%;
            margin-top: -300px; /*set to a negative number 1/2 of your height*/
            margin-left: -200px; /*set to a negative number 1/2 of your width*/
            background-color: #cccccc;
            border: 3px solid #73AD21;
            
        }
        .tag .tag-item{
            color:white;
            background: #156789;
            border-radius:10%;
            border-color: gray;
            border-style: solid;
            border-width: 3px;
            display: inline-block;
            width:auto;
            font-size:30px;
            padding: 10px 10px 10px 10px;
            margin: 10px 7px;
            float:left;
            
        }
        .tag .tag-list{
            background: blue;
            overflow:auto;
            height:50vh;
        }
        tag-manager-something{
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
export class TagManagerComponent{
    listOfTags = ['Denver', 'Houston', 'Washington D.C.', 'Bums'];
    newTags: string;
    windowName = "Tag Manager";
    deleteTag(e:any){
        this.listOfTags = this.listOfTags.filter(str => str !== e);
    }
    addNewTags(newTags:string){
        //push unique items to list
        newTags.split(',').forEach(e => {   
                if(this.listOfTags.every(x => x !== e)) this.listOfTags.push(e);
            });
        this.newTags = '';
    }
    closeWindow(e:any){
        console.log('closed');
    }

}