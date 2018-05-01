var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var Subdistrict = require('./Models/Subdistrict');
var Parkinglot = require('./Models/Parkinglot');

var post = [
    { message: 'Hello!' },
    { message: 'hi' }
]

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
    res.send(post);
});

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
    console.log(subDist);
    subDist.save((err, result) => {
        if(err){
            console.log('Saving User Error');
            res.sendStatus(501);
        } else {
            res.sendStatus(200);
        }
    });
});

app.post('/addparkinglot', (req, res) => {
    var parkingLotData = req.body;

    var parkingLot = new Parkinglot(parkingLotData);
    console.log(parkingLot);
    console.log(parkingLotData);
    parkingLot.save((err, result) => {
        if(err){
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
        console.log(req.body);
        console.log(subDistData);
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

app.post('/deletesubdistrict', async (req, res) => {
    try {
        var subDistData = req.body;
        var subDist = new Subdistrict(subDistData)
        var subdistricts = await Subdistrict.find(subDistData);
        console.log(req.body);
        console.log(subDistData);
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
