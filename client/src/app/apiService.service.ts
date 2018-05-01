import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    messages = [];

    constructor(private http: Http) {}

    sendLocationData(locationData) {
        this.http.get('http://localhost:3000/posts', locationData).subscribe(res => {
            console.log(res.json());
        });
    }
} 