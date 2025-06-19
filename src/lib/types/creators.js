/**
 * Create a slash command
 * @param {import('./index').Event} data
 */
function createEvent(data) {
  return data;
}

/**
 * Create a slash command
 * @param {import('./index').MessageCommandData} data
 */
function createMessage(data) {
  return data;
}


/**
 * Create a slash command
 * @param {import('./index').SlashCommandData} data
 */
function createSlash(data) {
  return data;
}

module.exports = {
  createEvent,
  createMessage,
  createSlash
}
