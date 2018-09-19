const express = require('express');
const router = express.Router();
const Region = require('../../models/Location');
const validateLocation = require('../../validation/newLocation');

router.get('/test', (req, res) => {
    res.json({ msg: "Locations route is working" })
})

router.post('/new', (req, res) => {
    const { errors, isValid } = validateLocation(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    // { $or: [{ name: req.body.name }, { coordinates: req.body.coordinates }]}
    Region.findOne({ name: req.body.name })
        .then((region) => {    
            if(region){
                if (region.name === req.body.name ){
                    return res.status(400).json({ name: 'location name already exits' });
                }else{
                    return res.status(400).json({ coordinates: 'location coordinates already exits' });
                }
            }else{
                console.log(req.body.coordinates.split(','));
                const region = new Region({
                    name: req.body.name,
                    coordinates: req.body.coordinates.split(',')
                    // coordinates: req.body.coordinates.split(',')
                })

                region.save()
                    .then((loc) => {
                        res.json(loc)
                    });
        }
    }) 
        .catch(err => console.log(err));   

})

module.exports = router;