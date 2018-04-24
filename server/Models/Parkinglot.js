var mongoose = require('mongoose');

module.exports = mongoose.model('Subdistrict', {
    LotID: Number,
    LotName: String,
    City: String,
    Zipcode: String,
    State: String,
    Lon: Number,
    Lat: Number,
    Status: String,
    HourlyCost: String,
    DailyCost: String,
    MonthlyCost: String.
    Hours: String,
    Phone: String,
    Address: String,
    SpecialFeatures: String,
    Spaces: String
    Type: String,
});
