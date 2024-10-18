const { CustomClient } = require('./classes/customClient.js');
const app = require('./lib/functions/application-ecs-loader.js');
const { GatewayIntentBits } = require('discord.js');

const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.setMaxListeners(0);
app.loadEvents(client);

client.connect();

process.on('uncaughtException', (err, origin) => { console.error(err, origin); });
process.on('unhandledRejection', (reason, p) => { console.error(reason, p); });