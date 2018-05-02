import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    messages = [];

    constructor(private http: Http) {}

    sendLocationData(locationData) {
        console.log(locationData);
        this.http.post('http://localhost:3000/rangeData', locationData).subscribe(res => {
            console.log(res.json());
        });
    }
} 