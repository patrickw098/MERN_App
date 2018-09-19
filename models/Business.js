const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: 'regions'
    }
});

module.exports = Event = mongoose.model('businesses', BusinessSchema);