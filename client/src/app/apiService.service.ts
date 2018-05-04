import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    latitude = 34.0407;
    longitude = -118.2468;
    parkingCoordinates = [];
    sweepDays = [];
    parkingTimes = "";
    streetName = "";

    constructor(private http: Http) { }

    sendLocationData(locationData) {
        this.http.post('http://localhost:3000/rangeData', locationData).subscribe(res => {
            
            this.latitude = locationData.latitude;
            this.longitude = locationData.longitude;
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

            // Parse the sweep times from Strings to Numbers
            var startTime = +subdistrict.SweepTime[0].split(':')[0];
            var endTime = +subdistrict.SweepTime[1].split(':')[0];

            this.formatParkingTimes(startTime, endTime);
            this.streetName = locationData.ShortName;
        });
    }

    formatParkingTimes(startTime, endTime) {
        this.parkingTimes = ""; // Reset

        // Start time
        if (startTime < 12) {
            this.parkingTimes += "12am to " + startTime + "am and ";
        } else {
            this.parkingTimes += "12am to " + startTime + "pm and ";
        }

        // End time
        if (endTime < 12) {
            this.parkingTimes += endTime + "am to 12am";
        } else {
            this.parkingTimes += endTime + "pm to 12am";
        }
    }
} 