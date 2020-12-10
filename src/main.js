const huejay = require('huejay');

const errorHandler = error => {
    console.error(`An error occurred: ${error.message}`);
};

// Middleware
const discover = require('./middleware/discover');
const auth = require('./middleware/auth');

// Experiments
const sunrise = require('./experiment/sunrise');

(async () => {
    const bridge = await discover(huejay, errorHandler);

    const client = await auth(huejay, bridge);

    await sunrise(client);
})();


