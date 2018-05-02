var mongoose = require('mongoose'),
Schema =       mongoose.Schema;;

const Street = new Schema({
    ShortName: String,
    Coord: [Number]
});

const Subdistrict = new Schema({
    SubDistrictID: String,
    DistrictID: Number,
    GeoFence: Object,
    Streets: [Street],
    SweepTime: Object,
    SweepDay: Object
})


module.exports = mongoose.model('Subdistrict', Subdistrict);
