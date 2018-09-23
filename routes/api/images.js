const express = require('express');
const router = express.Router();
const axios = require('axios');

const keys = require('../../config/keys');

router.get('/test', (req, res) => {
    res.json({ msg: "Images route is working" })
})

router.post('/search', (req, res) => {
    const { query } = req.body;
    const options = {
        headers: { 'Authorization': `Bearer ${keys.APIKey}`},
        params: { term: query, location: keys.location },
    }

    axios.get('https://api.yelp.com/v3/businesses/search', options)
        .then(payload => {
            const id = payload.data.businesses[0].id

            axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
                headers: { 'Authorization': `Bearer ${keys.APIKey}` }
            })
                .then( payload => {
                    let photosArr = payload.data.photos;

                    photosArr = photosArr.map( (photo,idx) => {
                        return { id: idx, url: photo}
                    })

                    res.json(photosArr);
                })
        })
        .catch(err => console.log(err))
})

module.exports = router;