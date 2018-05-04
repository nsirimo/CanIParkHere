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
        var resSubDistricts = {};
        var key = 'SubDistInfo';
        resSubDistricts[key] = [];

        var subdistricts = await Subdistrict.find({});
        subdistricts.forEach(subdist => {
            subdist.Streets.forEach(street => {
                if (street.ShortName === address.ShortName) {
                    resSubDistricts[key].push(subdist);
                }
            });
        });

        res.send(resSubDistricts);
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

app.post('/deleteparkinglots', async (req, res) => {
    try {
        var parkingLots = await Parkinglot.find();
        if(!parkingLots.length){
          toRet = {"isDelete": "False"};
          res.send(toRet);
        } else{
          await Parkinglot.remove();
          toRet = {"isDelete": "True"};
          res.send(toRet);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(501);
    }
});

app.post('/checkforsubdistrict', async (req, res) => {
    try {
        var subDistData = req.body;
        var subDist = new Subdistrict(subDistData)
        var subdistricts = await Subdistrict.find(subDistData);
      
        if(!subdistricts.length){
          toRet = {"isFound": "False"};
          res.send(toRet);
        } else{
          toRet = {"isFound": "True"};
          res.send(toRet);
        }
        //res.send(subdistricts);
    } catch (error) {
        console.error(error);
        res.sendStatus(501);
    }
});

app.post('/deletesubdistricts', async (req, res) => {
    try {
        var subDistData = req.body;
        var subDist = new Subdistrict(subDistData)
        var subdistricts = await Subdistrict.find();

        if(!subdistricts.length){
          toRet = {"isDelete": "False"};
          res.send(toRet);
        } else{
          await Subdistrict.remove();
          toRet = {"isDelete": "True"};
          res.send(toRet);
        }
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
