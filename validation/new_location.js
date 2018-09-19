const Validator = require('validator');
const Util = require('./util');

module.exports = function validLocation(data) {
    let errors = {};

    data.name = !Util.isEmpty(data.name) ? data.name : '';
    data.coordinates = !Util.isEmpty(data.coordinates) ? data.coordinates : '';

    if (!Validator.isLatLong(data.coordinates)){
        errors.coordinates = 'Invalid Coordinates';
    }
    if (Validator.isEmpty(data.coordinates)){
        errors.coordinates = 'Cannot Have Empty Coordinates';
    }
    if (Validator.isEmpty(data.name)){
        errors.name = 'Cannot Have Empty Name';
    }

    return {
        errors,
        isValid: Util.isEmpty(errors)
    };

}