/** @type {import('../../lib/types/index.ts').MessageCommandsData} */

module.exports = {
  alias: ['ms', 'ws'],
  desc: 'Get info about bot',

  others: {
    botPermissions: ['SendMessages'],
    userPermissions: ['SendMessages'],
    devOnly: false
  },

  script: async function ({ client, message, args }) {
    return message.reply({ content: `Ping: **${client.ws.ping} ms**` });
  }
};
