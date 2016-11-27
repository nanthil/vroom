import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class EquipmentService{
    data: any;
    constructor(private http:Http){

    }
    getDefaultEquipment(){
        return this.http.get('./app/SaveData/equipmentTest.json').map((res:Response) => res.json());
    }
}