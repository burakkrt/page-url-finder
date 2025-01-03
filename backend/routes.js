const express = require('express');

// Components
const scrapeLinks = require('./api/scrape');  

const router = express.Router();

// API Endpoints
router.get('/scrape-links', scrapeLinks);  


module.exports = router;
