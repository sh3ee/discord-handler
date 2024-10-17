const {
    loadMessages,
    loadSlashCommands,
    loadEvents,
} = require('../../lib/functions/application-ecs-loader.js');
const { AttachmentBuilder, codeBlock } = require('discord.js');
/** @type {import('../../lib/types/index.ts').MessageCommandsData} */

module.exports = {
    alias: ['eval', 'e', 'ev'],
    desc: 'Get info about bot',

    others: {
        botPermissions: ['SendMessages'],
        userPermissions: ['SendMessages'],
        devOnly: true,
    },

    script: async function ({ client, message, args }) {
        try {
            if (/\bclient\.token\b/g.test(args.join(' '))) {
                return message.reply('No token grabbing.');
            }
            const evaled = await eval(args.join(' '));
            const output = require('node:util').inspect(evaled);

            if (output.length > 2000) {
                const outputfile = new AttachmentBuilder(Buffer.from(output), {
                    name: `result.js`,
                });
                return message.channel.send({ files: [outputfile] });
            }

            return message.reply({ content: codeBlock('js', output) });
        } catch (err) {
            return message.reply({ content: codeBlock('js', err) });
        }
    },
};
