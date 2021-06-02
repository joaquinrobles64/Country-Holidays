const fs = require('fs');
const path = require('path');

module.exports = {
    collection: path.resolve(__dirname, './history.json'),
    add: function (data) {
        try {
            // read the file
            const file = fs.readFileSync(this.collection);

            // parse file into JS object
            const parsed = JSON.parse(file);

            // add new entry into parsed file array
            parsed.push(data);

            // write updated array back into file
            fs.writeFileSync(this.collection, JSON.stringify(parsed));
        } catch (error) {
            throw error;
        }
    },
    search: function () {
        try {
            // read the file
            const file = fs.readFileSync(this.collection);

            // parse file into JS object
            const parsed = JSON.parse(file);

            // return js object
            return parsed;
        } catch (error) {
            throw error;
        }
    }
};