const { setTimeout: sleep } = require('node:timers/promises');
const appUtil = require('../../lib/functions/application-ecs-loader.js');
const { logger } = require('../../lib/functions/common.js');
const { Events } = require('discord.js');
const { CustomClient } = require('../../structures/classes/customClient.js');

module.exports = {
  event: Events.ClientReady,
  once: true,
  /** 
   * @param {CustomClient} client;
   */

  script: async (client) => {
    await appUtil.loadMessages(client); await sleep(2000); appUtil.loadSlashCommands(client);
    logger.Info('Client', `${client.user.tag} Is Online!`)
  }
};