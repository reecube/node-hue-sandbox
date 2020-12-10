const huejay = require('huejay');

const emptyOptions = undefined;

const errorHandler = error => {
    console.error(`An error occurred: ${error.message}`);
};

huejay.discover(emptyOptions)
    .then(bridges => {
        for (let bridge of bridges) {
            console.log(bridge);
        }
    })
    .catch(errorHandler);
