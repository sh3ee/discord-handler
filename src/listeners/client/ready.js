const { logger } = require('../../lib/functions/common.js');
const { Events } = require('discord.js');
const { CustomClient } = require('../../classes/customClient.js');

module.exports = {
  event: Events.ClientReady,
  once: true,
  /** 
   * @param {CustomClient} client;
   */

  script: async (client) => {
    logger.Info('Client', `${client.user.tag} Is Online!`)
  }
};