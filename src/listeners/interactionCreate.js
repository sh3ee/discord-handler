const { CustomClient } = require('../classes/customClient.js');
const { Events, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: '',
    event: Events.InteractionCreate,

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {CustomClient} client
     */

    async execute(client, interaction) {
        if (
            !interaction.isChatInputCommand() && !interaction.isContextMenuCommand() && !interaction.isAutocomplete()
        ) return;

        if (!interaction.guild) return;
        const command = client.slashCommands.get(interaction.commandName);

        if (!command) return;

        const embed = new EmbedBuilder().setColor('Red')
        if (command.others.devOnly && !client.developer.includes(interaction.user.id)) return interaction.reply({ embeds: [embed.setDescription(`Warning! Access Restricted Developer Command Detected.`)], ephemeral: true });
        if (command.others.userPermissions && command.others.userPermissions.length !== 0)
            if (!interaction.member.permissions.has(command.others.userPermissions)) return interaction.reply({ embeds: [embed.setDescription(`You need \`${command.others.userPermissions || command.others.userPermissions.join(', ')}\` permission(s) to execute this command!`)], ephemeral: true });
        if (command.others.botPermissions && command.others.botPermissions.length !== 0)
            if (!interaction.guild.members.me.permissions.has(command.others.botPermissions)) return interaction.reply({ embeds: [embed.setDescription(`I need \`${command.others.botPermissions || command.others.botPermissions.join(', ')}\` permission(s) to execute this command!`)], ephemeral: true });

        command.execute(client, interaction);
    }
};