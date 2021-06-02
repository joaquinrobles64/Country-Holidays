const router = require('express').Router();
const collection = require('../db/collection');

// GET /history/search
router.get('/search', async (req, res) => {
    try {
        // get history of searches from database
        const searchHistory = collection.search();

        // status code 200 and return the array of objs in history.json
        res.json(searchHistory);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;