const { CustomClient } = require('./classes/customClient.js');
const { AppEvents } = require('./lib/functions/application-ecs-loader.js');
const { GatewayIntentBits } = require('discord.js');

const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    failIfNotExists: false
});

AppEvents(client);
module.exports = client;
client.start();

process.on('uncaughtException', (err, origin) => { console.log(err, origin); });
process.on('unhandledRejection', (reason, p) => { console.log(reason, p); });