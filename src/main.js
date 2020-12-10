const huejay = require('huejay');

const errorHandler = error => {
    console.error(`An error occurred: ${error.message}`);
};

const discover = require('./middleware/discover');
const auth = require('./middleware/auth');

(async () => {
    const bridge = await discover(huejay, errorHandler);

    const client = await auth(huejay, bridge);

    // TODO continue here
    console.log(`TODO`, client)
})();


