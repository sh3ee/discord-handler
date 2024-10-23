const {
    loadMessages,
    loadSlashCommands,
    loadEvents,
} = require('../../lib/functions/application-ecs-loader.js');
const { inspect } = require('node:util');
const { codeBlock } = require('discord.js');
/** @type {import('../../lib/types/index.ts').MessageCommandsData} */

module.exports = {
    alias: [
        'eval',
        'e',
        'ev'
    ],
    desc: 'Get info about bot',

    others: {
        botPermissions: ['SendMessages'],
        userPermissions: ['SendMessages'],
        devOnly: true
    },

    execute: async function ({ client, message, args }) {
        try {
            const code = args.join(' ');
            if (/\bclient\.token\b/g.test(code)) return message.reply('No token grabbing.');

            const evaled = await eval(code),
                output = inspect(evaled);

            if (output.length >= 2000) {
                const outputfile = Buffer.from(output)
                return message.channel.send({
                    files: [
                        {
                            attachment: outputfile,
                            name: 'result.js'
                        }
                    ]
                });
            }

            sendResult(message, output, 'js')
        } catch (err) {
            sendResult(message, err, 'js')
        }
    },
};

function sendResult(message, value, formate) {
    return message.channel.send(
        {
            content:
                codeBlock(formate, value)
        }
    );
}
