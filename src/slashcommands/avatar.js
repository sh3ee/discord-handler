const { ApplicationCommandType } = require('discord.js');
/** @type {import('../lib/types/index.ts').SlashCommandData} */

module.exports = {
  name: 'Avatar',
  type: ApplicationCommandType.User,

  others: {
    botPermissions: ['SendMessages'], userPermissions: ['SendMessages'], devOnly: false
  },
  
  async execute(client, interaction) {
    const target = interaction.guild.members.cache.get(interaction.targetId) || await interaction.guild.members.fetch(interaction.targetId);
    interaction.reply({ content: target.displayAvatarURL({ extension: 'png', size: 4096 }), flags: 'Ephemeral' });
  }
};