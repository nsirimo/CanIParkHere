import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    coords = {};
    streetName = "";
    parkingTime = "";
    parkingData = [];
    parkingCoordinates = [];

    constructor(private http: Http) {}

    sendLocationData(locationData) {
        this.http.post('http://localhost:3000/rangeData', locationData).subscribe(res => {
            this.coords = {
                lat: locationData.latitude,
                lng: locationData.longitude
            }
            this.streetName = locationData.formatted_address;
            const subdistricts = res.json().SubDistInfo;
            const subdistrict = subdistricts[0]; // Get the first subdistrict for now
            const streets = subdistrict.Streets;
            var street = null;

            streets.forEach(s => {
                if (s.ShortName === locationData.ShortName) {
                    street = s;
                }
            });

            this.setDefaultParkingData();
            
            this.parkingCoordinates = []; // Remove previous parking coordinates
            var parkingLocations = street.Coord;
            for (var i = 0; i < parkingLocations.length; i += 2) {
                var coordinate = {
                    lat: parkingLocations[i+1],
                    lng: parkingLocations[i]
                }
                this.parkingCoordinates.push(coordinate);
            }

            // Parse the sweep time from Strings to Numbers
            const startTime = +subdistrict.SweepTime[0].split(':')[0];
            const endTime = +subdistrict.SweepTime[1].split(':')[0];
            this.formatParkingTimes(startTime, endTime);

            this.setNewParkingData(subdistrict.SweepDay);

            console.log(subdistrict); // For testing purposes
        });
    }

    setDefaultParkingData() {
        this.parkingData = []; // Reset parking data
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        days.forEach(day => {
            this.parkingData.push({
                day: day,
                time: "All day"
            });
        });
    }

    formatParkingTimes(startTime, endTime) {
        this.parkingTime = "12am to "; // Reset

        if (startTime < 12) {
            this.parkingTime += startTime + "am and ";
        } else if (startTime === 12) {
            this.parkingTime += startTime + "pm and ";
        } else {
            this.parkingTime += (startTime % 12) + "pm and ";
        }

        if (endTime < 12) {
            this.parkingTime += endTime + "am to 12am";
        } else if (endTime === 12) {
            this.parkingTime += endTime + "pm to 12am";
        } else {
            this.parkingTime += (endTime % 12) + "pm to 12am";
        }
    }

    setNewParkingData(sweepDays) {
        sweepDays.forEach(day => {
            switch (day) {
                case "M": this.parkingData[0].time = this.parkingTime; break;
                case "Tu": this.parkingData[1].time = this.parkingTime; break;
                case "W": this.parkingData[2].time = this.parkingTime; break;
                case "Th": this.parkingData[3].time = this.parkingTime; break;
                case "F": this.parkingData[4].time = this.parkingTime; break;
                case "Sa": this.parkingData[5].time = this.parkingTime; break;
                case "Su": this.parkingData[6].time = this.parkingTime; break;
            }
        });
    }
} 