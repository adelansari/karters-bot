// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember, TextChannel, Message, ChannelManager, Interaction } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';

import { MessageAttachment, MessageEmbed } from 'discord.js';
import { Captcha } from 'captcha-canvas';  // importing captcha from npm module

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }

  async run(client: DiscordClient, member: GuildMember) {
    // console.log(`${member.user.tag} joined to ${member.guild.name}.`);
    // console.log(member.user.tag);
    const captcha = new Captcha(); //create a captcha canvas of 100x300.
    captcha.async = true //Sync
    captcha.addDecoy(); //Add decoy text on captcha canvas.
    captcha.drawTrace(); //draw trace lines on captcha canvas.
    captcha.drawCaptcha(); //draw captcha text on captcha canvas.

    const captchaAttachment = new MessageAttachment(await captcha.png, 'captcha.png');

    const captchaEmbed = new MessageEmbed()
      .setDescription('Please complete this captcha to get a "**verified**" role:')
      .setImage('attachment://captcha.png');


    const channelId = "906924913984671784";   // verify channel id
    const verifychannel = client.channels.cache.get(channelId) as TextChannel  // Finding the "verify" channel
    verifychannel.send(`Hi ${member.user}`)
    const msg = await verifychannel.send({ files: [captchaAttachment], embeds: [captchaEmbed] });

    // The following is not working as intended 
    if (msg.author.id !== member.id) {
      return;
    } else if (msg.content === captcha.text) {
      verifychannel.send('You have been verified!');
      member.roles.add('906790468023627788');   // racer role id
    } else {
      verifychannel.send('Wrong captcha! Please try again using "**.verify**" command');
    }






    // const filter = (message: { author: { id: string; }; content: string; }) => {
    //   if(message.author.id !== member.id) return;
    //   if(message.content === captcha.text) return true;
    //   else member.send("Wrong captcha!")
    // }

    // try {
    //   const response = await msg.channel.awaitMessages({
    //     filter,
    //     max: 1,
    //     time: 600000,
    //     errors: ["time"],
    //   });
    //   if(response) {
    //     // when verified
    //     member.roles.add('906790468023627788');   // racer role id
    //   }
    // } catch (err) {
    //   // no time and not verified
    //   await member.send('You have not verified.')

    // }


  }
}