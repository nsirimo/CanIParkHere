import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {

    constructor(private http: Http) {}

    sendLocationData(locationData) {
        this.http.post('http://localhost:8100/', locationData).subscribe(res => {
            console.log(locationData);
            console.log(res);
        });
    }
}