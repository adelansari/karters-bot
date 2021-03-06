
import { Message } from 'discord.js';
import DiscordClient from '../../client/client';

export default abstract class BaseCommand {
  constructor(public name: string, public category: string, public aliases: Array<string>,  public description: string) {}

  getName(): string { return this.name; }
  getCategory(): string { return this.category; }
  getAliases(): Array<string> { return this.aliases; }
  getDescription(): string { return this.description; }

  abstract run(client: DiscordClient, message: Message, args: Array<string> | null): Promise<void>;
}