const { loadFiles } = require('./fileloader.js');
const { ApplicationCommandType: { ChatInput, User, Message }, Events } = require('discord.js');
const { logger, print } = require('../functions/common.js');

async function loadEvents(client) {
  console.log(print.underline(`\n✎ ᴇᴠᴇɴᴛ-ʟᴏᴀᴅᴇʀ-ʀᴜɴɪɴɢ...`));

  const files = await loadFiles('src/listeners');
  const validEvents = Object.values(Events);

  for (const file of files) {
    const event = require(file);

    if (!event.event || !validEvents.includes(event.event)) {
      logger.Warn(file, `event Name is either invalid or missing. Please provide a valid name.`);
      continue;
    }

    if (event.once) client.once(event.event, (...args) => event.execute(client, ...args));
    else client.on(event.event, (...args) => event.execute(client, ...args));

    logger.Info(event.event, `Loaded.`);
  }
};

async function loadMessages(client) {
  console.log(print.underline(`\n✎ ᴍᴇssᴀɢᴇ-ᴄᴏᴍᴍᴀɴᴅ-ʟᴏᴀᴅᴇʀ-ʀᴜɴɪɴɢ...`));

  const files = await loadFiles('src/commands');
  await client.messageCommands.clear();

  for (const file of files) {
    const command = require(file);

    if (
      !command.alias ||
      command.alias.length === 0 ||
      (command.alias && command.alias.some((alias) => alias === ''))
    ) {
      logger.Warn(file, `missing command alias. Please provide a valid command alias to proceed.`);
      continue;
    }

    client.messageCommands.set(command.alias[0], command);
    logger.Info(command.alias.join(','), `Loaded.`);
  }
};

async function loadSlashCommands(client) {
  console.log(print.underline(`\n✎ sʟᴀsʜ-ᴄᴏᴍᴍᴀɴᴅ-ʟᴏᴀᴅᴇʀ-ʀᴜɴɪɴɢ...`));

  const files = await loadFiles('src/slashcommands');
  await client.slashCommands.clear();

  let CommandsArray = [];

  for (const file of files) {
    const command = require(file);

    if (!command.name) {
      logger.Warn(file, 'missing command name. Please provide a valid command to proceed.');
      continue;
    }

    if (command.type == ChatInput && !command.description) {
      logger.Warn(file, 'a command requires a description. Please provide a description for your commands name.');
      continue;
    }

    if ([User, Message].includes(command.type) && command.description) {
      logger.Warn(file, 'context commands do not support descriptions.');
      continue;
    }

    if (typeof command.execute !== 'function') {
      logger.Warn(file, `command file ${command.name} does not export "execute" as a function.`);
      continue;
    }

    client.slashCommands.set(command.name, command);
 
    const { others, execute, ...cmd } = command;
    CommandsArray.push(cmd);

    logger.Info(command.name, `Loaded.`);
  }

  // client.application.commands.set(CommandsArray);
};

module.exports = {
  loadEvents,
  loadMessages,
  loadSlashCommands
}
