import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

/**
 *  Uncomment this command if we ever need it in the future. - ProBoz
 */

export default class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', [],"test");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('Test command works');
  }
}