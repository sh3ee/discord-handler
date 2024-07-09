import { PermissionsString, ApplicationCommandType, ChatInputApplicationCommandData, MessageApplicationCommandData, UserApplicationCommandData } from 'discord.js';

interface AdditionalOptions {
  /**
   * A string or array of permissions that the bot needs to execute the current command.
   *
   * @example
   * botPermissions: 'KickMembers'
   * or
   * botPermissions: ['KickMembers', 'ModerateMembers']
   */
  botPermissions?: PermissionsString | PermissionsString[];
  /**
   * A string or array of permissions that a user needs for the current command to be executed.
   *
   * @example
   * userPermissions: 'KickMembers'
   * or
   * userPermissions: ['KickMembers', 'ModerateMembers']
   */
  userPermissions?: PermissionsString | PermissionsString[];
  /**
   * A boolean value that indicates whether the command is for developer-only registration or not.
   */
  devOnly?: boolean;
};

type CommandProps<T> = T extends ApplicationCommandType.ChatInput ? ChatInputApplicationCommandData : T extends ApplicationCommandType.Message ? MessageApplicationCommandData : T extends ApplicationCommandType.User ? UserApplicationCommandData : never;

type CommandData = CommandProps<ApplicationCommandType> & {
  /* global?: boolean */
};

interface SlashCommandsData {
  data: CommandData;
  others: AdditionalOptions;
  script: (options: { client: import('../../structures/classes/customclient.js').CustomClient, interaction: import('discord.js').CommandInteraction }) => Promise<any>;
};


interface MessageCommandsData {
  /**
   * The `alias` are an array of multiple MessageCommands names set that the bot uses to execute the current command.
   * 
   * @example
   * alias: ['ban','bn','banned']
   */
  alias: string[];
  /**
   * The name of the `MessageCommands` should ideally be between `1 to 100` characters for optimal readability and efficiency, `only for your understanding`. 
   * However, `you can extend this limit` based on your specific requirements.
   */
  desc?: string;
  /**
   * The `example` of how to use MessageCommands shows that you can add multiple commands in a string or an array.
   *  
   * @example
   * example: ['!ban <user> <reason>','!ban <user>']
   */
  example?: string[];
  /**
   * The `args` property defines the structure of MessageCommands.
   *
   * @example
   * example: '{user} {reason}'
   */
  args?: string;
  /**
   * The `group` property defines the category or group to which the command belongs.
   * It helps organize commands based on their functionality or purpose.
   *
   * @example
   * group: ['admin', 'moderation']
   */
  group?: string[];
  others: AdditionalOptions;
  script: (options: { client: import('../../structures/classes/customclient.js').CustomClient, message: import('discord.js').Message, args: string[] }) => Promise<any>;
};

export { SlashCommandsData, MessageCommandsData };