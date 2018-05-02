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
        var address = req.body;
        var resSubDistricts = req.body;
        var subdistricts = await Subdistrict.find({});
        subdistricts.forEach(subdist => {
            subdist.Streets.forEach(street => {
                if (street.ShortName === address.ShortName) {
                    resSubDistricts += subdist;
                }
            });
        });
        res.send(JSON.stringify(resSubDistricts).replace('[object Object]', ''));
    } catch (error) {
        console.log(error);
        res.sendStatus(501);
    }
});

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
