import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    parkingCoordinates = [];

    constructor(private http: Http) { }

    sendLocationData(locationData) {
        this.http.post('http://localhost:3000/rangeData', locationData).subscribe(res => {
            
            var subdistricts = res.json().SubDistInfo;
            var subdistrict = subdistricts[0]; // Get the first subdistrict for now
            var streets = subdistrict.Streets;
            var street = null;

            streets.forEach(s => {
                if (s.ShortName === locationData.ShortName) {
                    street = s;
                }
            });

            var parkingLocations = street.Coord;
            for (var i = 0; i < parkingLocations.length; i += 2) {
                var coordinate = {
                    lat: parkingLocations[i],
                    lng: parkingLocations[i+1]
                }
                this.parkingCoordinates.push(coordinate);
            }
            console.log(this.parkingCoordinates);
        });
    }
} 