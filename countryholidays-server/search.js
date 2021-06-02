const router = require('express').Router();
const countryholidays = require('countryholidays');
const collection = require('../db/collection');

// GET /search/country
router.get('/country', async (req, res) => {
    try {
        // destructure query. c is country
        const { c } = req.query;

        // this handles having no query in the url query request or whatever
        let query = '';
        if (c) { query = c; }

        // search country with url parameter as argument
        const results = await countryholidays.searchCountry(query);
        
        const numresults = results.length;
        const date = new Date();

        // this endpoint should store the searched keyword/term, a timestamp and the number of matching results
        collection.add({
            query,
            date,
            numresults
        });

        console.log(`GET request to search/country with country query: "${query}"`);

        // code 200 response with json
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// POST /search/holiday
router.post('/holiday', async (req, res) => {
    try {
        // destructure query. ccode is country code
        const { countryCode } = req.body;

        // for if there's no url parameter i guess
        if (!countryCode) {
            res.status(404).json({ error: "Not found bro you prolly forgot url parameter" })
        };

        // get holidays from a country using country code url parameter as argument
        const holiday = await countryholidays.getHolidays(countryCode);

        console.log(`POST request to search/holiday with country code query: "${countryCode}"`);

        // code 200 response with json
        res.json(holiday);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;