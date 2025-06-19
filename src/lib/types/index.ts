import { PermissionsString, ApplicationCommandType, ChatInputApplicationCommandData, MessageApplicationCommandData, UserApplicationCommandData, ClientEvents, ChatInputCommandInteraction, UserContextMenuCommandInteraction, MessageContextMenuCommandInteraction, AutocompleteInteraction, Message } from 'discord.js';
import { CustomClient } from '../../classes/customClient.js';

interface EventData<EventName extends keyof ClientEvents> {
  name: string;
  event: EventName;
  once?: boolean;
  execute(_client?: CustomClient, ...args: ClientEvents[EventName]): Promise<void>;
}

export type Event = {
  [Key in keyof ClientEvents]: EventData<Key>
}[keyof ClientEvents];

interface AdditionalOptions {
  botPermissions?: PermissionsString | PermissionsString[];
  userPermissions?: PermissionsString | PermissionsString[];
  devOnly?: boolean;
};


type ApplicationCommandData<T extends ApplicationCommandType> =
  T extends ApplicationCommandType.ChatInput ? ChatInputApplicationCommandData & { execute(client: CustomClient, interaction: ChatInputCommandInteraction): Promise<void>; autocomplete?(client: CustomClient, interaction: AutocompleteInteraction): Promise<void>; } :
  T extends ApplicationCommandType.Message ? MessageApplicationCommandData & { execute(client: CustomClient, interaction: MessageContextMenuCommandInteraction): Promise<void>; } :
  T extends ApplicationCommandType.User ? UserApplicationCommandData & { execute(client: CustomClient, interaction: UserContextMenuCommandInteraction): Promise<void>; } : never;

type CommandData = ApplicationCommandData<ApplicationCommandType> & {
  /* global?: boolean */
  /**
   * This Options displaying all permissions and additional utility features.
   */
  others: AdditionalOptions;
};

export type SlashCommandData = CommandData;

export interface MessageCommandData {
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
   * group: 'admin'
   */
  group?: string;
  /**
   * This Options displaying all permissions and additional utility features.
   */
  others: AdditionalOptions;
  execute: (client: CustomClient, message: Message, args: string[]) => Promise<any>;
};
