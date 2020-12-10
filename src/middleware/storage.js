const fs = require('fs');

const bridgeStoragePath = './var/bridge.json';

module.exports = {
    read: () => new Promise(async (resolve, reject) => {
        try {
            if (!fs.existsSync(bridgeStoragePath)) {
                resolve(null);

                return;
            }

            const dataJson = fs.readFileSync(bridgeStoragePath, 'utf8');
            const data = JSON.parse(dataJson);

            resolve(data);
        } catch (error) {
            reject(error);
        }
    }),
    write: data => new Promise(async (resolve, reject) => {
        try {
            fs.writeFileSync(bridgeStoragePath, JSON.stringify(data));

            resolve();
        } catch (error) {
            reject(error);
        }
    }),
}
