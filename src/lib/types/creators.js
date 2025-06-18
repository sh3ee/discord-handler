/**
 * Create a slash command
 * @param {import('./index').Event} data
 */
function createEvent(data) {
  return data;
}

/**
 * Create a slash command
 * @param {import('./index').MessageCommandsData} data
 */
function createMessage(data) {
  return data;
}


/**
 * Create a slash command
 * @param {import('./index').SlashCommandsData} data
 */
function createSlash(data) {
  return data;
}

module.exports = {
  createEvent,
  createMessage,
  createSlash
}
