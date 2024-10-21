const { CustomClient } = require('./classes/customClient.js');
const { loadEvents } = require('./lib/functions/application-ecs-loader.js');
const { GatewayIntentBits } = require('discord.js');

const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

loadEvents(client);
module.exports = client;

client.setMaxListeners(0);
client.connect();

process.on('uncaughtException', (err, origin) => { console.error(err, origin); });
process.on('unhandledRejection', (reason, p) => { console.error(reason, p); });