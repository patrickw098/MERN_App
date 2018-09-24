const express = require('express');
const router = express.Router();
const axios = require('axios');

const keys = require('../../config/keys');

const Query = require('../../models/Query');

router.get('/test', (req, res) => {
    res.json({ msg: "Images route is working" })
})

router.post('/search', (req, res) => {
    const { query } = req.body;

    Query.findOne({ term: query })
        .then( queryRes => {
            if ( queryRes ) {
                console.log("You made a database query for:", query)
                
                requestImages(queryRes.businesses, res)
            } else {
                const options = {
                    headers: { 'Authorization': `Bearer ${keys.APIKey}` },
                    params: { term: query, location: keys.location },
                }

                axios.get('https://api.yelp.com/v3/businesses/search', options)
                    .then(payload => {

                        const businesses = 
                            payload.data.businesses.map((business) => { 
                                return {  
                                    id: business.id,
                                    excluded: [],
                                } 
                            })

                        const newQuery = new Query ({
                            term: query,
                            businesses: businesses,
                        })

                        newQuery.save();

                        requestImages(businesses, res)

                    })
                    .catch(err => console.log(err));
            }
        })

})

router.post('/buffer', (req, res) => {
    const { businesses } = req.body;

    requestImages(businesses, res);
})

const requestImages = (businesses, res, n = 0) => {
    let nthBusiness = businesses[n];

    axios.get(`https://api.yelp.com/v3/businesses/${nthBusiness.id}`, {
        headers: { 'Authorization': `Bearer ${keys.APIKey}` }
    })
        .then(payload => {
            let currPhotos = payload.data.photos;

            currPhotos = currPhotos.map((photo, idx) => {
                return { id: idx, url: photo, businessId: nthBusiness.id }
            })

            // return everything but the current business for future queries.
            res.json({ 
                images: currPhotos, 
                businesses: { 
                    [payload.data.id]: payload.data,
                    nextBusinesses: businesses.slice(1),
                }
            });
        })
        .catch(err => console.log(err));

}

module.exports = router;