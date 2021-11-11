// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import {
  GuildMember,
  TextChannel,
  Message,
  ChannelManager,
  Interaction,
} from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";

import { MessageAttachment, MessageEmbed } from "discord.js";
import { Captcha } from "captcha-canvas"; // importing captcha from npm module

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }

  async run(client: DiscordClient, member: GuildMember) {
    // console.log(`${member.user.tag} joined to ${member.guild.name}.`);
    // console.log(member.user.tag);
    const captcha = new Captcha(); //create a captcha canvas of 100x300.
    captcha.async = true; //Sync
    captcha.addDecoy(); //Add decoy text on captcha canvas.
    captcha.drawTrace(); //draw trace lines on captcha canvas.
    captcha.drawCaptcha(); //draw captcha text on captcha canvas.

    const captchaAttachment = new MessageAttachment(
      await captcha.png,
      "captcha.png"
    );

    const captchaEmbed = new MessageEmbed()
      .setDescription(
        'Please complete this captcha to get "**verified**"'
      )
      .setImage("attachment://captcha.png");

    // To send the captcha message to 'verify' channel
    const channelId = "906924913984671784"; // verify channel id
    const verifychannel = client.channels.cache.get(channelId) as TextChannel; // Finding the "verify" channel
    verifychannel.send(`Hi ${member.user}`);
    const msg = await verifychannel.send({
      files: [captchaAttachment],
      embeds: [captchaEmbed],
    });

    // const msg = await member.send({
    //   files: [captchaAttachment],
    //   embeds: [captchaEmbed],
    // });

    const filter = (message: { author: { id: string }; content: string }) => {
      if (message.author.id !== member.id) {
        return false;
      }
      if (message.content === captcha.text) {
        return true;
      } else {
        member.send("Wrong captcha! Please try again.");
        return false;
      }
    };

    try {
      const response = await msg.channel.awaitMessages({
        filter,
        max: 1, // Number of messages to successfully pass the filter
        time: 900000, // 15 min timeout
        errors: ["time"],
      });
      if (response) {
        // when verified
        await member.roles.add("906790468023627788");
        await member.send("You have been verified");
      }
    } catch (err) {
      // no time and not verified
      await member.send("You have not verified and were kicked from the server.");
      member.kick('Member failed to answer captcha in 15 min.')

      // await member.send(JSON.stringify(err))
      // console.log(err);
    }
  }
}
