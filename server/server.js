var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var Subdistrict = require('./Models/Subdistrict');

var post = [
    { message: 'Hello!' },
    { message: 'hi' }
]

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
    res.send(post);
});

app.get('/test', async (req, res) => {
    try {
        var subdistricts = await Subdistrict.find({});
        res.send(subdistricts);
    } catch (error) {
        console.error(error);
        res.sendStatus(200);
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


mongoose.connect('mongodb://test:test@ds223609.mlab.com:23609/ciphappdb', (err) => {
    if (!err)
        console.log('connected to mongo!');
});

app.listen(3000);