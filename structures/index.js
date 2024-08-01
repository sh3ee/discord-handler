const { CustomClient } = require('./classes/customClient.js');
require('../lib/plugins/crashDefender.js').Shield();
const appUtil = require('../lib/functions/application-ecs-loader.js');
const { GatewayIntentBits } = require('discord.js');

const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.setMaxListeners(0); appUtil.loadEvents(client); client.connect();
