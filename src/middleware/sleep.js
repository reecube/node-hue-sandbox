module.exports = (untilHour, untilMinute) => new Promise(async resolve => {
    const wait = () => {
        const now = new Date();

        if (now.getHours() === untilHour && now.getMinutes() === untilMinute) {
            resolve();

            return;
        }

        setTimeout(wait, 1000);
    };

    wait();
});
