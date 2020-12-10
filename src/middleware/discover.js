const fs = require('fs');

const isReachable = require('is-reachable');

const bridgeStoragePath = './var/bridge.json';

module.exports = (huejay) => new Promise(async (resolve, reject) => {
    try {
        if (fs.existsSync(bridgeStoragePath)) {
            const data = fs.readFileSync(bridgeStoragePath, 'utf8');
            const bridge = JSON.parse(data);

            if (!await isReachable(bridge.ip)) {
                reject(new Error('Selected bridge unreachable, check the file!'));

                return;
            }

            resolve(bridge);

            return;
        }

        /**
         * @type {Array}
         */
        const bridges = await huejay.discover(undefined);

        if (bridges.length === 1) {
            const bridge = bridges[0];

            try {
                fs.writeFileSync(bridgeStoragePath, JSON.stringify(bridge))
            } catch (error) {
                reject(error);
            }

            resolve(bridge);

            return;
        }

        console.log(`${bridges.length} bridges found. Please select one of them manually by adding the file:`)
        for (let bridge of bridges) {
            console.log(`- ${bridge}`);
        }

        reject(new Error('Too many bridges found!'));
    } catch (error) {
        reject(error);
    }
});
