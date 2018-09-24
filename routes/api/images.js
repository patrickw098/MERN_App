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
                console.log("You made a database query for:", queryRes);
                let photosArr = [];

                axios.get(`https://api.yelp.com/v3/businesses/${queryRes.businesses[0].id}`, {
                    headers: { 'Authorization': `Bearer ${keys.APIKey}` }
                })
                    .then(payload => {
                        let currPhotos = payload.data.photos;

                        currPhotos = currPhotos.map((photo, idx) => {
                            return { id: idx, url: photo }
                        })

                        photosArr = photosArr.concat(currPhotos)

                        res.json({ images: photosArr, businesses: queryRes.businesses });
                    })
                    .catch(err => console.log(err));

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

                        newQuery.save().then( query => console.log(query) );

                        let photosArr = [];
                        let count = 0;
                        let length = 0;

                        console.log("making axios call");
                        axios.get(`https://api.yelp.com/v3/businesses/${businesses[0].id}`, {
                            headers: { 'Authorization': `Bearer ${keys.APIKey}` }
                        })
                            .then(payload => {
                                let currPhotos = payload.data.photos;

                                currPhotos = currPhotos.map((photo, idx) => {
                                    return { id: idx, url: photo }
                                })

                                photosArr = photosArr.concat(currPhotos)

                                res.json({ images: photosArr, businesses: businesses });
                            })
                            .catch(err => console.log(err));

                             
                    })
                    .catch(err => console.log(err));
            }
        })

})

module.exports = router;