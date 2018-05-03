var mongoose = require('mongoose');


module.exports = mongoose.model('Street', {
    ShortName: String,
    Coord: [Number]
})