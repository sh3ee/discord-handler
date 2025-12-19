const { Events, EmbedBuilder } = require('discord.js');
/** @type {import('../lib/types/index.ts').Event} */

module.exports = {
    name: 'onInteraction', event: Events.InteractionCreate, once: true,

    async execute(client, interaction) {
        if (
            !interaction.isChatInputCommand() && !interaction.isContextMenuCommand() && !interaction.isAutocomplete()
        ) return;

        if (!interaction.guild) return;
        const command = client.slashCommands.get(interaction.commandName);

        if (!command) return;

        const embed = new EmbedBuilder().setColor('Red')
        if (command.others.devOnly && !client.developer.includes(interaction.user.id)) return interaction.reply({ embeds: [embed.setDescription(`Warning! Access Restricted Developer Command Detected.`)], flags: 'Ephemeral' });
        if (command.others.userPermissions && command.others.userPermissions.length !== 0) {
            if (!interaction.member.permissions.has(command.others.userPermissions)) return interaction.reply({ embeds: [embed.setDescription(`You need \`${command.others.userPermissions || command.others.userPermissions.join(', ')}\` permission(s) to execute this command!`)], flags: 'Ephemeral' });
        } if (command.others.botPermissions && command.others.botPermissions.length !== 0) {
            if (!interaction.guild.members.me.permissions.has(command.others.botPermissions)) return interaction.reply({ embeds: [embed.setDescription(`I need \`${command.others.botPermissions || command.others.botPermissions.join(', ')}\` permission(s) to execute this command!`)], flags: 'Ephemeral' });
        }
        command.execute(client, interaction);
    }
}