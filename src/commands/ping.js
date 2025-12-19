/** @type {import('../lib/types/index.ts').MessageCommandData} */

module.exports = {
    alias: ['ping'],
    desc: 'Get info about bot',

    others: {
        botPermissions: ['SendMessages'], userPermissions: ['SendMessages'], devOnly: false
    },

    execute(client, message, args) {
        message.channel.send({ content: `Ping: **${client.ws.ping} ms**` });
    }
}