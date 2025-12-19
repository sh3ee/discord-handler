const { developerIds, clientToken } = require('../lib/config.json');
const { Client, Collection, version } = require('discord.js');

module.exports.CustomClient = class CustomClient extends Client {
    messageCommands = new Collection();
    slashCommands = new Collection();
    developer = developerIds;

    start() {
        console.log(`◌ discord.js ${version} | ◌ NodeJs ${process.versions.node}`);
        this.login(clientToken);
    }
}