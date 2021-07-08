import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class AgDataService{
    
    constructor(private http : HttpClient){}
    
    getgridData(){
        return this.http.get('http://localhost:3004/gridData').toPromise().then(data=>{
            return data
        },error=>{ 
            return error
        })
    }
}