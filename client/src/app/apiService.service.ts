import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    parkingCoordinates = [];
    sweepDays = [];
    sweepTime = [];
    streetName = null;

    constructor(private http: Http) { }

    sendLocationData(locationData) {
        this.http.post('http://localhost:3000/rangeData', locationData).subscribe(res => {
            
            this.parkingCoordinates = []; // Remove previous parking coordinates

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
                    lat: parkingLocations[i+1],
                    lng: parkingLocations[i]
                }
                this.parkingCoordinates.push(coordinate);
            }
            this.sweepDays = subdistrict.SweepDay;
            this.sweepTime = subdistrict.SweepTime;
            this.streetName = locationData.ShortName;
        });
    }
} 