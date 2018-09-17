const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    business: {
        type: Schema.Types.ObjectId,
        ref: "businesses"
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: "locations"
    },
    date: {
        type: Date,
        default: Date.now
    },
    url: {
        type: String,
        required: true
    },
    tag: [{
        type: String,
        required: true
    }]
})

module.exports = Event = mongoose.model('images', ImageSchema);