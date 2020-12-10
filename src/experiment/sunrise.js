module.exports = client => new Promise(async resolve => {
    // https://github.com/sqmk/huejay#clientlightssave---save-a-lights-attributes-and-state

    /**
     * @typedef {Object} LightConfig
     * @property {string} [name]
     * @property {boolean} [on]
     * @property {number} [brightness] => 0 - 254
     * @property {number} [hue] => 0 - 65535
     * @property {number} [saturation] => 0 - 254
     * @property {number} [colorTemp] => white color temperature, 154 (cold) - 500 (warm).
     * @property {number} [transitionTime]
     * @property {*} [alert]
     * @property {*} [effect]
     * @property {number} [incrementBrightness]
     * @property {number} [incrementHue]
     * @property {number} [incrementSaturation]
     * @property {number} [incrementXy]
     * @property {number} [incrementColorTemp]
     */

    /**
     * @param client
     * @param lightId
     * @param {LightConfig} config
     * @return {Promise<void>}
     */
    const modifyLight = async (client, lightId, config) => {
        const light = await client.lights.getById(lightId);

        for (const configKey of Object.keys(config)) {
            light[configKey] = config[configKey];
        }

        await client.lights.save(light);
    };

    const bedroom = await client.groups.getById(1);

    for (let lightId of bedroom.lightIds) {
        await modifyLight(client, lightId, {
            on: true,
            brightness: 0,
            hue: 0,
            saturation: 254,
            transitionTime: 0,
        });
    }

    for (let lightId of bedroom.lightIds) {
        await modifyLight(client, lightId, {
            brightness: 100,
            hue: 7500,
            saturation: 200,
            transitionTime: 30 * 60,
        });
    }

    resolve();
});
