const cors = require('cors');
const express = require('express');

const search = require('./search.js');
const history = require('./history.js');

const app = express();
const port = 8888;

// apply application-level middleware
app.use(cors());
app.use(express.json());

// routes
// prefix /search and adds search router to express app
app.use('/search', search);

// prefix /history and adds history router to express app
app.use('/history', history);

// start server
app.listen(port, () => {
    console.log(`Server running on... port: ${port}`);
});