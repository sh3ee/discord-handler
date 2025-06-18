const { logger, print } = require('../../lib/functions/common.js');
const { Events } = require('discord.js');
const { CustomClient } = require('../../classes/customClient.js');
const { loadMessages, loadSlashCommands } = require('../../lib/functions/application-ecs-loader.js')
const { setTimeout: sleep } = require('node:timers/promises');

module.exports = {
  name: '',
  event: Events.ClientReady,
  once: true,
  /** 
   * @param {CustomClient} client;
   */

  async execute(client) {
    await loadMessages(client);
    await sleep(3000)
    await loadSlashCommands(client);
    console.log(`✦ ${print.green(`${print.underline(client.user.username)}`)} online ✓`);
  }
};
