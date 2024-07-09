const { CustomClient } = require('../../structures/classes/customclient.js');
const { Events, Message, EmbedBuilder } = require('discord.js');
const { clientPrefix } = require('../../lib/configuration.json');

module.exports = {
    event: Events.MessageCreate,

    /** 
     * @param {Message} message 
     * @param {CustomClient} client 
     */

    script: async (client, message) => {

        const { author, guild, member } = message;
        if (author.bot || !guild || !message.content.toLowerCase().startsWith(clientPrefix)) return;

        const [cmd, ...args] = message.content.slice(clientPrefix.length).trim().split(/ +/g);
        const command = client.messageCommands.get(cmd.toLowerCase()) || client.messageCommands.find(c => c.alias?.includes(cmd.toLowerCase()));

        if (!command) return;
        const embed = new EmbedBuilder().setColor('Red')

        if (command.others.devOnly && !client.developer.includes(author.id)) return;

        if (command.others.userPermissions && command.others.userPermissions.length !== 0)
            if (!member.permissions.has(command.others.userPermissions)) return message.reply({ embeds: [embed.setDescription(`${client.icon.static.wrong} You need \`${command.others.userPermissions || command.others.userPermissions.join(", ")}\` permission(s) to execute this command!`)] });

        if (command.others.botPermissions && command.others.botPermissions.length !== 0)
            if (!guild.members.me.permissions.has(command.others.botPermissions)) return message.reply({ embeds: [embed.setDescription(`${client.icon.static.wrong} I need \`${command.others.botPermissions || command.others.botPermissions.join(", ")}\` permission(s) to execute this command!`)] });

        command.script({ client, message, args });
    }
};