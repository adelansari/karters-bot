import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class CharactersCommand extends BaseCommand {
  constructor() {
    super('characters', 'misc', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('characters command works');
  }
}