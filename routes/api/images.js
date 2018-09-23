const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/test', (req, res) => {
    res.json({ msg: "Images route is working" })
})

router.get('/search', (req,res) => {
    const query = req.data;


})

module.exports = router;