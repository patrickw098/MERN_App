const Validator = require('validator');
const Util = require('./util');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !Util.isEmpty(data.email) ? data.email : '';
    data.password = !Util.isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: Util.isEmpty(errors)
    };
};