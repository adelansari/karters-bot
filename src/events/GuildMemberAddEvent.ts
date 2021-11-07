// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember, Message } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
import { channel } from 'diagnostics_channel';

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }


  async run(client: DiscordClient, member: GuildMember) {
    console.log(`${member.user.tag} joined to ${member.guild.name}.`);
       
  }
}