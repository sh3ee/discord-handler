const { ApplicationCommandType } = require('discord.js');
/** @type {import('../lib/types/index.ts').SlashCommandData} */

module.exports = {
  name: 'ping',
  description: 'Get information about the bot.',
  type: ApplicationCommandType.ChatInput,
  
  others: {
    botPermissions: ['SendMessages'], userPermissions: ['SendMessages'], devOnly: false
  },

  execute(client, interaction) {
    interaction.reply({ content: `Ping: **${client.ws.ping} ms**`, flags: 'Ephemeral' });
  }
}