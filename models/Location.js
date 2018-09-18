const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
    },
    coordinates: {
        type: [Number], // GEO Json is formatted in long, lat
        required: true
    }
})

module.exports = Event = mongoose.model('locations', LocationSchema)