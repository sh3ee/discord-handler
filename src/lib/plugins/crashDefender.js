exports.Shield = function () {
    process.on('uncaughtException', (err, origin) => { console.error(err, origin); });
    process.on('unhandledRejection', (reason, p) => { console.error(reason, p); });
}
