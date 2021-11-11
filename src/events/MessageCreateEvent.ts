// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageCreate
import { Message } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';

export default class CreateMessageEvent extends BaseEvent {
  constructor() {
    super('messageCreate');
  }
  
  async run(client: DiscordClient, message: Message) {
    
  }
}