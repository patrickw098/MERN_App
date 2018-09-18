const express = require('express');
const router = express.Router();
const Region = require('../../models/Location');

router.get('/test', (req, res) => {
    res.json({ msg: "Locations route is working" })
})

router.post('/new', (req, res) => {

    Region.findOne({name: req.body.name})
        .then((region) => {    
            if(region){
                return res.status(400).json({ name: 'location already exits'});
            }else{
                const region = new Region({
                    name: req.body.name,
                    coordinates: req.body.coordinates.split(',')
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