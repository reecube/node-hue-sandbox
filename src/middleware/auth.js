const storage = require('./storage');

const deviceType = require('../../package.json').name;

// Source: https://stackoverflow.com/a/49959557/3359418
// Source: https://gist.github.com/unitycoder/8eade8271b44e1bf9ac149e5d7ad566b
const keypress = async () => new Promise(resolve => {
    const stdin = process.stdin;
    if (stdin.isTTY) stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.once('data', key => {
        if (stdin.isTTY) stdin.setRawMode(false);

        resolve(key);

        stdin.pause();
    });
});

module.exports = (huejay, bridge) => new Promise(async resolve => {
    const continueWithAuthedBridge = async bridge => {
        const client = new huejay.Client({
            host: bridge.ip,
            username: bridge.auth.username,
        });

        // The following will fail if the user is not properly authed

        await client.users.get()

        await client.bridge.ping()

        await client.bridge.isAuthenticated()

        resolve(client);
    };

    if (bridge.auth) {
        await continueWithAuthedBridge(bridge);

        return;
    }

    const tmpClient = new huejay.Client({
        host: bridge.ip
    });

    const tmpUser = new tmpClient.users.User;

    tmpUser.deviceType = deviceType;

    console.log('Press your Philips Hue link button to authorize and then press enter in the CLI...')

    await keypress()

    const user = await tmpClient.users.create(tmpUser);

    bridge.auth = {
        username: user.username,
    };

    await storage.write(bridge);

    await continueWithAuthedBridge(bridge);
});
