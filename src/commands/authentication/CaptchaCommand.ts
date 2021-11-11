import { Message } from "discord.js";
import { MessageAttachment } from "discord.js";
import { MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

import { Captcha } from "captcha-canvas"; // importing captcha from npm module
import { MembershipStates } from "discord.js/typings/enums";
import GuildMemberAddEvent from "../../events/GuildMemberAddEvent";

export default class CaptchaCommand extends BaseCommand {
  constructor() {
    super("captcha", "authentication", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
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
      .setDescription("Please complete this captcha:")
      .setImage("attachment://captcha.png");

    const msg = await message.channel.send({
      files: [captchaAttachment],
      embeds: [captchaEmbed],
    });

    // const filter = (message: { author: { id: string }; content: string }) => {
    //   if (message.author.id !== member.id) return;
    //   if (message.content === captcha.text) return true;
    //   else member.send("Wrong captcha!");
    // };

    // message.channel.send({ files: [captchaAttachment], content: `Code: ${captcha.text}` });
  }
}
