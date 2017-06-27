import {Component, NgZone} from '@angular/core'
import {RacksComponent} from '../Racks/racks.component';
import {RackService} from '../Racks/rack.service';
import {MainNavigationComponent} from '../Navigation/main.navigation.component';



@Component({
    selector: 'management-page',
    template: `
        <file-viewer
            [show]=showFileViewer
            [files]=listOfSavedFiles
            (selection)=handleOpen($event)
            (close)=closeFileViewer($event)>
            
        </file-viewer>
        <add-new
            [whatAction]="whatAction"
            [whatToAdd]="whatToAdd"
            [showModal]="showCreateNewProject"
            (newValue)="createNewProject($event)">
        </add-new>
        <!--<tag-manager></tag-manager>-->
        <div class="title-bar">
            <div class="file-menu">
                <div class="side-by-side" *ngFor="let o of titleBarMenuOptions">
                    <drop-down [name]=o.name
                            [options]=o.options
                            (selection)="handleMenuSelection(o.name, $event)"
                            >
                    </drop-down>
                </div>
            </div>
        </div>
        <div class="main-view">
            <nav>
                <ul class="nav nav-pills list-inline enclave-bar">
                    <li *ngFor="let view of listActiveViews" 
                        class="top-nav-pill" 
                        role="presentation">
                        <a [ngClass]="{'my-active': view.isActive}"
                            (click)="switchActiveView(view)">
                            <close (close)="closeView(view.name)"></close>
                            {{view.name}}
                        </a>
                    </li>
                </ul>
            </nav>
            <div *ngIf="activeView !== ''">
                <single-enclave [currentView]="activeView"></single-enclave>
            </div>
            <div *ngIf="activeView === ''">
                <div class="empty-main">
                    NO FILE CURRENTLY SELECTED
                </div>
            </div>
        </div>
        <navigation 
            (setView)=changeView($event)
            (rename)=getOriginalEvent($event)></navigation>
      `,
    styles: [`
        .side-by-side {
            display: inline;
        }
        .enclave-bar {
            background: #25272b;
        }
        .my-active {
            background: #44474c !important;
        }
        .top-nav-pill {
            border-radius:2% !important;
            border-color: #cccccc;
            border-style:solid;
            border-width:2px;
            margin:0;
            padding:0;
        }
        .top-nav-pill a {
            background: #555555;
            color: #cccccc; 
        }
        .top-nav-pill a:hover {
            background: #444444;
            color: #dddddd; 
        }
    
        .close-button{
            float: right;
        }
        .close-button:hover{
            color: #cc5588;
        }
        .main-view{
            height: 100vh;
            background-color: #616770;
        }
        .empty-main {
            padding:10%;
            margin:auto;
            font-size: 50px;
        }
    `
    ]

})
export class ServerManagementComponent{
    showCreateNewProject = false;
    whatAction = 'Create New ';
    whatToAdd = 'Project';
    listOfSavedFiles: any;
    showFileViewer = false;
    closeFileViewer(e:any){
        this.showFileViewer = false;
    }
    handleMenuSelection(type: any, e:any){
        if(type === "File") this.handleFileOptions(e);
        else if (type === "Options") this.handleOptionOptions(e);
        else this.handleHelpOptions(e);
    }
    handleFileOptions(e:any){
        if(e === 'Save'){
            if(this.rackService.projectName !== undefined){
                this.rackService.save();
                this.rackService.getFiles(this.zone);
                
            }
        }
        else if(e === 'New Project') {
            if(this.rackService.projectName !== undefined){
                console.log('would you like to save changes to' + this.rackService.projectName);
                this.rackService.resetStateForNewProject(); 
                this.activeView = '';
                this.listActiveViews = [];
            } 
            this.showCreateNewProject = true;
            
        }
        else if(e === 'Open'){
            this.showFileViewer = true;
            this.listOfSavedFiles = this.rackService.files;
        }
    }
    handleOpen(e:any){
        this.rackService.open(e,this.zone);
        this.showFileViewer = false;
        this.activeView = '';
        this.listActiveViews = [];
    }
    handleOptionOptions(e:any){
    }
    handleHelpOptions(e:any){

    }
    createNewProject(e:any){
        this.showCreateNewProject = false;
        if(e.inputValue !== 'cancel') {
            this.rackService.projectName = e.inputValue;
            this.rackService.findFolder(e.inputValue, 'home', undefined)
        }

    }

    titleBarMenuOptions: any = [
            {name:'File', options: ['New Project', 'Save', 'Open']},
            {name:'Options', options:['Style']},
            {name:'Help', options: ['Manual', 'Guide', 'Contact']}
        ];
    constructor(private zone: NgZone, private rackService: RackService){}
    activeView:string ='';
    listActiveViews: any[] = [];
    
    switchActiveView(event:any){
        this.listActiveViews = this.listActiveViews.map(e => {return {name: e.name, isActive: (event.name === e.name)}});
        this.activeView = event.name;
    }
    changeView(e:any){
        this.getOriginalEvent(e);
    }
    closeView(viewName:string){
        //TODO:
        //GET INDEX OF FOUND view
        //SET ACTIVE VIEW TO INDEX -1 or index +1
        this.listActiveViews = this.listActiveViews.filter(str => str.name !== viewName); 
        if(this.listActiveViews.length ===0){
            this.activeView = '';
        }
    }
    getFiles() {
        this.files = this.rackService.getFiles(this.zone);
        console.log(this.files);
    }
    files :any;
    getOriginalEvent(event:any){
        //folder is a nested component, and as such the event also happens recursively
        //unpack the object b until b is a string of the selected file in the path
        //this path/to/my/selected/file is the file that will be viewed in the single-enclave component
        var eventPath: any;
        if(typeof(event.b) === 'object'){
            this.getOriginalEvent(event.b);
        } else{
            if(event.b === 'rename folder'){
                //this is a folder being renamed, do things for folders here
                var something = event.a.split('/')
                something.pop()
                something.push(event.c);
                eventPath = something.join('/');
                this.listActiveViews.map(e => {
                    if(e.name.includes(event.a)) e.name = e.name.replace(event.a, eventPath);
                    this.rackService.renameFileInRackList(e.name, eventPath, event.a);
                })
            } else {
                eventPath = event.a + '/' + event.b;
                if(this.listActiveViews.every(str => str.name !== eventPath)){
                    this.listActiveViews = this.listActiveViews.map(e => {return {name: e.name, isActive: false}});
                    this.listActiveViews.push({name: eventPath, isActive:true});
                } else {
                    this.listActiveViews = this.listActiveViews.map(e => {return {name: e.name, isActive: (eventPath === e.name)}});
                }

                //this only occurs if the event is a renamed file
                //for the purpose of renaming the active views along with the actual file itself
                
                if(event.c && event.b !== 'rename folder'){
                    this.listActiveViews.map(e => {
                        let newStr: string;
                        if(e.name === eventPath){
                            let temp = e.name.split('/');
                            temp.pop();
                            newStr = temp.join('/');
                            newStr += ('/' + event.c);
                            this.rackService.renameFileInRackList(e.name, newStr, undefined);
                        } else if(e.name.includes(eventPath)){
                            console.log(eventPath);
                        }else newStr = e.name;
                        //very important, renames the related directory in the rackslist in rack service
                        //without this, no data will tie to the new name of the directory
                        
                        e.name = newStr;
                    });
                
                } else{
                    this.activeView = eventPath;
                }
            }
        }
    }
}