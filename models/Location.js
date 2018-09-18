const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
    // location: {
    //     type: {
    //         type: String, 
    //         required: true
    //     },

    // }
})

module.exports = Event = mongoose.model('regions', RegionSchema)