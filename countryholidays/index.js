const superagent = require('superagent');

// config file to hold base url
const config = require('./config.json');

const searchCountry = async (countryinput) => {
    try {
        const availableCountriesUrl = `${config.url}/v2/AvailableCountries`;
        const response = await superagent.get(availableCountriesUrl);

        // since API doesn't have search this will be the substitute lol
        const filterCountries = response.body.filter((country) => {
            // case insensitive search
            if (country['value'].toUpperCase().includes(countryinput.toUpperCase())) {
                return country;
            }
        });

        // // commented out for final cause server continually runs or whatever
        // // exit program if there's no result from search
        // if (filterCountries.length === 0) {
        //     console.log('No results. Run the program again.');
        //     process.exit(1);
        // }

        return filterCountries;
    } catch (error) {
        return error;
    }
};

const getHolidays = async (countryCode) => {
    try {
        // i intend the program to always use current year
        const time = new Date();
        const year = time.getFullYear();

        const countryHolidayUrl = `${config.url}/v2/PublicHolidays/${year}/${countryCode}`
        const response = await superagent.get(countryHolidayUrl);

        return response.body;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    searchCountry,
    getHolidays
};
