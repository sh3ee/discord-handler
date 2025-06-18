/** @type {import('../lib/types/index.ts').MessageCommandsData} */

module.exports = {
	alias: [
		'ping',
		'ms',
		'ws'
	],
	desc: 'Get info about bot',

	others: {
		botPermissions: ['SendMessages'], userPermissions: ['SendMessages'], devOnly: false,
	},

	execute(client, message, args) {
		message.reply({ content: `Ping: **${client.ws.ping} ms**` });
	},
};
