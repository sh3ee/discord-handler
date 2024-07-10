const { CustomClient } = require('./classes/customClient.js');
require('../lib/plugins/crashDefender.js').Shield();
const appUtil = require('../lib/functions/application-ecs-loader.js');
const { GatewayIntentBits, Partials } = require('discord.js');

const client = new CustomClient(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
        partials: [
            Partials.Channel,
            Partials.Reaction,
            Partials.User,
            Partials.GuildMember,
            Partials.Message,
            Partials.ThreadMember
        ],
        failIfNotExists: false
    }
);

client.setMaxListeners(0); appUtil.loadEvents(client); client.start();