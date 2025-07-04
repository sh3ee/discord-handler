const { CustomClient } = require('./classes/customClient.js');
const { loadEvents } = require('./lib/functions/application-ecs-loader.js');
const { GatewayIntentBits } = require('discord.js');

const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    failIfNotExists: false
});

loadEvents(client);
module.exports = client;
client.start();

process.on('uncaughtException', (err, origin) => { console.error(err, origin); });
process.on('unhandledRejection', (reason, p) => { console.error(reason, p); });