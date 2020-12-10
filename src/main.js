const huejay = require('huejay');

const errorHandler = error => {
    console.error(`An error occurred: ${error.message}`);
};

const discover = require('./middleware/discover');

(async () => {
    const bridge = await discover(huejay, errorHandler);

    // TODO continue here
    console.log(`TODO`, bridge)
})();


