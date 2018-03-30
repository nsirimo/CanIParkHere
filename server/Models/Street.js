var mongoose = require('mongoose');

module.exports = mongoose.model('Street', {
                shortName: String,
                intersection: Object
});