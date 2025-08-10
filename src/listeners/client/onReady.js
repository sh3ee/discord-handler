const { print } = require('../../lib/functions/common.js');
const { Events } = require('discord.js');
const { AppMessages, AppSlashCommands } = require('../../lib/functions/application-ecs-loader.js')
const { setTimeout: sleep } = require('node:timers/promises');
/** @type {import('../../lib/types/index.ts').Event} */

module.exports = {
  name: '',
  event: Events.ClientReady,
  once: true,

  async execute(client) {
    await AppMessages(client);
    await sleep(3000)
    await AppSlashCommands(client);
    console.log(`✦ ${print.green(`${print.underline(client.user.username)}`)} online ✓`);
  }
};