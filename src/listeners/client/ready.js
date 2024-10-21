const { logger } = require('../../lib/functions/common.js');
const { Events } = require('discord.js');
const { CustomClient } = require('../../classes/customClient.js');
const app = require('../../lib/functions/application-ecs-loader.js')
const { setTimeout: sleep } = require('node:timers/promises');

module.exports = {
  event: Events.ClientReady,
  once: true,
  /** 
   * @param {CustomClient} client;
   */

  execute: async (client) => {
    await app.loadMessages(client);
    await sleep(3000)
    await app.loadSlashCommands(client);
    logger.Info('Client', `${client.user.tag} Is Online!`)
  }
};