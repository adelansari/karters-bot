import { Guild, GuildMember, Message, Role } from "discord.js";
import { MessageAttachment } from "discord.js";
import { MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

import { Captcha } from "captcha-canvas"; // importing captcha from npm module
import { MembershipStates } from "discord.js/typings/enums";
import GuildMemberAddEvent from "../../events/GuildMemberAddEvent";


export default class VerifyCommand extends BaseCommand {
  constructor() {
    super("verify", "authentication", ["captcha"], "Verifying members with captcha."); // command, category, aliases, description
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const captcha = new Captcha(); //create a captcha canvas of 100x300.
    captcha.async = true; //Sync
    // captcha.addDecoy(); //Add decoy text on captcha canvas. Leave disabled for now as per request of sboczek
    captcha.drawTrace(); //draw trace lines on captcha canvas.
    captcha.drawCaptcha(); //draw captcha text on captcha canvas.

    const captchaAttachment = new MessageAttachment(
      await captcha.png,
      "captcha.png"
    );

    const captchaEmbed = new MessageEmbed()
      .setDescription(
        'Please complete this captcha to get a "**verified**" role:'
      )
      .setImage("attachment://captcha.png");

    const msg = await message.channel.send({
      files: [captchaAttachment],
      embeds: [captchaEmbed],
    });

    const { author } = message; // deconstructing the initial message with captcha command and saving the author object.

    let member = message.member as GuildMember;

    const filter = (message: { author: { id: string }; content: string }) => {
      if (author.id !== member.id) {
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
        const guildObject = member.guild as Guild; // Finding the member guild
        const memberrole: any|undefined = guildObject.roles.cache.find(
          (role: { name: string }) => role.name === "racer"
        ); // Searching for the role 'racer' in the guild
        await member.roles.add(memberrole.id); // adding the role 'racer' to the member
        // await member.roles.add("906790468023627788");  // role 'racer' based on id
        await member.send("You have been verified");
      }
    } catch (err) {
      // no time and not verified
      await member.send(
        'You have failed to complete the captcha on time. Please try again using ".verify" command.'
      );
    }
  }
}
