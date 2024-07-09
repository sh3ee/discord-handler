const { developerIds, clientToken } = require('../../lib/configuration.json');
const { Client, Collection } = require('discord.js');

class CustomClient extends Client {
  messageCommands = new Collection();
   slashCommands = new Collection();
    icon = require('../../lib/plugins/design/icons.js').icon;
     developer = developerIds;

  start() {
    this.login(clientToken);
  };
};

module.exports = { CustomClient };
