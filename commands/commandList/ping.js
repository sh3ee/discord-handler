/** @type {import('../../lib/types/index.ts').MessageCommandsData} */

module.exports = {
  alias: ['ms', 'ws'],

  args: '',

  desc: 'Get info about bot',

  example: [],

  group: [],

  others: {
    botPermissions: ['SendMessages'], userPermissions: ['SendMessages'], devOnly: true
  },

  script: async ({ client, message, args }) => {
    return message.reply({ content: `Ping: **${client.ws.ping} ms**` });
  }
};
