const { CustomClient } = require('../../structures/classes/customclient.js');
const { Events, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    event: Events.InteractionCreate,

    /** 
     * @param {ChatInputCommandInteraction} interaction
     * @param {CustomClient} client 
     */

    script: async (client, interaction) => {

        const { user, guild, commandName, member } = interaction;
        if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand() && !interaction.isAutocomplete()) return;

        if (!guild) return;
        const command = client.slashCommands.get(commandName);
        const embed = new EmbedBuilder().setColor('Red')

        if (!command) {
            return interaction.reply({ embeds: [embed.setDescription(`${client.icon.static.wrong} This commands doest't exist!`)], ephemeral: true }) && client.slashCommands.delete(commandName);
        }

        if (command.others.devOnly && !client.developer.includes(user.id)) return interaction.reply({ embeds: [embed.setDescription(`${client.icon.static.wrong} Warning! Access Restricted Developer Command Detected.`)], ephemeral: true });

        if (command.others.userPermissions && command.others.userPermissions.length !== 0)
            if (!member.permissions.has(command.others.userPermissions)) return interaction.reply({ embeds: [embed.setDescription(`${client.icon.static.wrong} You need \`${command.others.userPermissions || command.others.userPermissions.join(', ')}\` permission(s) to execute this command!`)], ephemeral: true });

        if (command.others.botPermissions && command.others.botPermissions.length !== 0)
            if (!guild.members.me.permissions.has(command.others.botPermissions)) return interaction.reply({ embeds: [embed.setDescription(`${client.icon.static.wrong} I need \`${command.others.botPermissions || command.others.botPermissions.join(', ')}\` permission(s) to execute this command!`)], ephemeral: true });

        command.script({ client, interaction });
    }
};