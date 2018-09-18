const express = require('express');
const router = express.Router();
const Region = require('../../models/Location');

router.get('/test', (req, res) => {
    res.json({ msg: "Locations route is working" })
})

router.post('/new', (req, res) => {

    console.log((req.body.coordinates)); 

    const region = new Region({
        name: req.body.name,
        coordinates: req.body.coordinates.split(',')
    })

    console.log(region);
    region.save()
        .then((loc) => {
            res.json(loc)
        });
    

})

module.exports = router;