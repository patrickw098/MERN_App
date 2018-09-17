const express = require('express');
const router = express.Router();
const Location = require('../../models/Locations');

router.get('/test', (req, res) => {
    res.json({ msg: "Locations route is working" })
})

router.post('/new', (req, res) => {
    console.log(req.body);
    res.json({ req: req.body })
})

module.exports = router;