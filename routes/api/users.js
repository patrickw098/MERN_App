const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');

// validator
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.get('/test', (req,res) => {
    res.json({ msg: "Users route is working"})
})

router.post('/register', (req,res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }) 
    .then(user => {
        if ( user ) {
            return res.status(400).json({ email: "An account is already registered to this email address"});
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    newUser.save()
                    .then( user => {
                        const payload = {
                            id: user.id,
                            name: user.name,
                        }

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token ) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token,
                            });
                        });
                    })
                    .catch( err => console.log(err) );
                })
            })
        }
    })
});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email; // login via email
    const password = req.body.password;

    User.findOne({ email })
    .then(user => {
        if (!user) {
            errors.email = "This email does not exist";
            return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, name: user.name };

                jwt.sign(payload, 
                    keys.secretOrKey, 
                    { expiresIn: 3600 }, 
                    (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
            } else {
                errors.password = "Incorrect password";
                return res.status(400).json(errors);
            }
        });
    });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name
    });
})

module.exports = router;