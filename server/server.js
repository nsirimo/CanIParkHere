var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var Subdistrict = require('./Models/Subdistrict');
var Parkinglot = require('./Models/Parkinglot');

app.use(cors());
app.use(bodyParser.json());

app.get('/subdistricts', async (req, res) => {
    try {
        var subdistricts = await Subdistrict.find({});
        res.send(subdistricts);
    } catch (error) {
        console.error(error);
        res.sendStatus(501);
    }
});

app.post('/addsubdistrict', (req, res) => {
    var subDistData = req.body;

    var subDist = new Subdistrict(subDistData);
    subDist.save((err, result) => {
        if (err) {
            console.log('Saving User Error');
            res.sendStatus(501);
        } else {
            res.sendStatus(200);
        }
    });
});

app.post('/rangeData', async (req, res) => {
    try {
        var bestNum = [];
        var address = req.body;
        var longitude = address.longitude;
        var resSubDistricts1 = {};
        var key = 'SubDistInfo';
        resSubDistricts1[key] = [];
        var subdistricts = await Subdistrict.find({});
        subdistricts.forEach(subdist => {
            subdist.Streets.forEach(street => {
                if (street.ShortName === address.ShortName) {
                    resSubDistricts1[key].push(subdist);
                }
            });
        });

        resSubDistricts1[key].forEach(subDist => {
            let counts = subDist.GeoFence;
            let goal = longitude;
            bestNum.push(counts.reduce((prev, curr) => Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev));
        });

        let goal = longitude;
        bestNum = bestNum.reduce((prev, curr) => (Math.abs(curr) - goal) < (Math.abs(prev) - goal) ? curr : prev);

        var resSubDistricts2 = {};
        resSubDistricts2[key] = [];
        let temps = await subdistricts.forEach(subdist => {
            subdist.Streets.forEach(street => {
                let matchingGeo = false;
                geo(subdist.GeoFence, bestNum).then(function (result) {
                    if ((street.ShortName === address.ShortName) && result) {
                        resSubDistricts2[key].push(subdist);
                    }
                });
            });
        });

        res.send(resSubDistricts2);
    } catch (error) {
        console.log(error);
        res.sendStatus(501);
    }
});


function geo(geoFence, bestNum, callback) {
    return new Promise(function (resolve, reject) {
        geoFence.forEach(x => {
            if(x == bestNum){
                resolve(true);
            }
        });
    });
};




app.post('/addparkinglot', (req, res) => {
    var parkingLotData = req.body;

    var parkingLot = new Parkinglot(parkingLotData);
    parkingLot.save((err, result) => {
        if (err) {
            console.log('Saving User Error');
            res.sendStatus(501);
        } else {
            res.sendStatus(200);
        }
    });
});

app.post('/checkforsubdistrict', async (req, res) => {
    try {
        var subDistData = req.body;
        var subDist = new Subdistrict(subDistData)
        var subdistricts = await Subdistrict.find(subDistData);
        res.send(subdistricts);
    } catch (error) {
        console.error(error);
        res.sendStatus(501);
    }
});

mongoose.connect('mongodb://test:test@ds223609.mlab.com:23609/ciphappdb', (err) => {
    if (!err)
        console.log('connected to mongo!');
});

app.listen(3000);
