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
}

type ApplicationCommandData<T extends ApplicationCommandType> =
  T extends ApplicationCommandType.ChatInput ? ChatInputApplicationCommandData & { execute(client: CustomClient, interaction: ChatInputCommandInteraction): Promise<void>; autocomplete?(client: CustomClient, interaction: AutocompleteInteraction): Promise<void>; } :
  T extends ApplicationCommandType.Message ? MessageApplicationCommandData & { execute(client: CustomClient, interaction: MessageContextMenuCommandInteraction): Promise<void>; } :
  T extends ApplicationCommandType.User ? UserApplicationCommandData & { execute(client: CustomClient, interaction: UserContextMenuCommandInteraction): Promise<void>; } : never;

export type SlashCommandData = ApplicationCommandData<ApplicationCommandType> & {

  /**
   * This Options displaying all permissions and additional utility features.
   */
  others: AdditionalOptions;
  /* global?: boolean */
};


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
   * This Options displaying all permissions and additional utility features.
   */
  others: AdditionalOptions;
  execute: (client: CustomClient, message: Message, args: string[]) => Promise<any>;
}
