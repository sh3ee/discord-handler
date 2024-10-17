const { developerIds, clientToken } = require('../lib/config.json');
const { Client, Collection } = require('discord.js');

class CustomClient extends Client {
  messageCommands = new Collection();
   slashCommands = new Collection();
    icon = require('../lib/plugins/design/icons.js');
     developer = developerIds;

 connect() {
    this.login(clientToken);
  };
};

module.exports = { CustomClient };
