var mongoose = require('mongoose');

module.exports = mongoose.model('Subdistrict', {
    SubDistrictID: String,
    DistrictID: Number,
    GeoFence: Object,
    Streets: Object,
    SweepTime: Object,
    SweepDay: Object
});