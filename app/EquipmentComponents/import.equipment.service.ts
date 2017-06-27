import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

//TODO: RECEIVE INPUT IMAGES AND DATA 
//SAVE NEW DATA TO FILE
@Injectable()
export class ImportEquipmentService{
    data: any;
    constructor(private http:Http){

    }
    getDefaultEquipment(){
        return this.http.get('./app/SaveData/equipmentTest.json').map((res:Response) => res.json());
    }
}