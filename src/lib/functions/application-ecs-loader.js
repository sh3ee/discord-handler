const { loadFiles } = require('./fileloader.js');
const { ApplicationCommandType, Events } = require('discord.js');
const { ChatInput, User, Message } = ApplicationCommandType;
const { logger, print } = require('../functions/common.js');

exports.loadEvents = async function (client) {
  console.log(print.underscore(`\n✎ ᴇᴠᴇɴᴛ-ʟᴏᴀᴅᴇʀ-ʀᴜɴɪɴɢ...`));

  const files = await loadFiles('src/listeners');
  const validEvents = Object.values(Events);

  for (const file of files) {
    const event = require(file);

    if (!event.event || !validEvents.includes(event.event)) {
      logger.Warn(file, `event Name is either invalid or missing. Please provide a valid name.`);
      continue;
    }

    if (typeof event.script !== 'function') {
      logger.Warn(file, `command does not have a callback function.`);
      continue;
    }

    if (event.once) client.once(event.event, (...args) => event.script(client, ...args));
    else client.on(event.event, (...args) => event.script(client, ...args));

    logger.Info(event.event, `successfully Loaded.`);
  }
};

exports.loadMessages = async function (client) {
  console.log(print.underscore(`\n✎ ᴍᴇssᴀɢᴇ-ᴄᴏᴍᴍᴀɴᴅ-ʟᴏᴀᴅᴇʀ-ʀᴜɴɪɴɢ...`));

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

    if (typeof command.script !== 'function') {
      logger.Warn(file, `command file ${command.alias.join(',')} does not export "script" as a function.`);
      continue;
    }

    client.messageCommands.set(command.alias[0], command);
    logger.Info(command.alias.join(','), `successfully Loaded.`);
  }
};

exports.loadSlashCommands = async function (client) {
  console.log(print.underscore(`\n✎ sʟᴀsʜ-ᴄᴏᴍᴍᴀɴᴅ-ʟᴏᴀᴅᴇʀ-ʀᴜɴɪɴɢ...`));

  const files = await loadFiles('src/slashcommands');
  await client.slashCommands.clear();

  let CommandsArray = [];

  for (const file of files) {
    const command = require(file);

    if (!command.data) {
      logger.Warn(file, 'command file does not export "data"\n@example\n data: {  }');
      continue;
    }

    if (!command.data.name) {
      logger.Warn(file, 'missing command name. Please provide a valid command to proceed.');
      continue;
    }

    if (command.data.type == ChatInput && !command.data.description) {
      logger.Warn(file, 'a command requires a description. Please provide a description for your commands name.');
      continue;
    }

    if ([User, Message].includes(command.data.type) && command.data.description) {
      logger.Warn(file, 'context commands do not support descriptions.');
      continue;
    }

    if (typeof command.script !== 'function') {
      logger.Warn(file, `command file ${command.data.name} does not export "script" as a function.`);
      continue;
    }

    client.slashCommands.set(command.data.name, command);
    CommandsArray.push(command.data);

    logger.Info(command.data.name, `successfully loaded.`);
  }

  // client.application.commands.set(CommandsArray);
};
