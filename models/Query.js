const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuerySchema = new Schema({
    term: {
        type: String,
        required: true
    },
    businesses: [{
        id: String,
        excluded: [Number]
    }],  
});

module.exports = Query = mongoose.model('queries', QuerySchema);