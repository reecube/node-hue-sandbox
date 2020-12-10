const isReachable = require('is-reachable');

const storage = require('./storage');

module.exports = (huejay) => new Promise(async (resolve, reject) => {
    const storageBridge = await storage.read();

    if (storageBridge) {
        if (!await isReachable(storageBridge.ip)) {
            reject(new Error('Selected bridge unreachable, check the file!'));

            return;
        }

        resolve(storageBridge);

        return;
    }

    /**
     * @type {Array}
     */
    const bridges = await huejay.discover(undefined);

    if (bridges.length === 1) {
        const bridge = bridges[0];

        await storage.write(bridge);

        resolve(bridge);

        return;
    }

    console.log(`${bridges.length} bridges found. Please select one of them manually by adding the file:`)
    for (let bridge of bridges) {
        console.log(`- ${bridge}`);
    }

    reject(new Error('Too many bridges found!'));
});
