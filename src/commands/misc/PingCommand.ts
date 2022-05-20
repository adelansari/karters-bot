import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

/**
 * Uncomment this command if we ever need it in the future. - ProBoz
 */

export default class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'misc', [], "Shows the client latency along with a pong message.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send({ content:`${client.ws.ping} pong!`});
  }
}