import {
  Message,
  Permissions,
  MessageEmbed,
  TextChannel,
  GuildMember,
} from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { CollectionConstructor } from "@discordjs/collection";

export default class ModCommand extends BaseCommand {
  constructor() {
    super(
      "mod",
      "misc",
      [],
      "Bot created message by either .mod message or .mod embed"
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    // message.channel.send("mod command works");

    let member = message.member as GuildMember;

    if (member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      let inputForThisCommand = args[0];

      if (message.author.bot) return;

      if (inputForThisCommand === undefined) {
        inputForThisCommand = "spacethefinalfrontier";
      }

      if (inputForThisCommand !== undefined) {
        let makeItLowerCase = inputForThisCommand.toLowerCase();
        switch (makeItLowerCase) {
          case "spacethefinalfrontier":
            const blankEmbed = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle("Mod Commands")
              .setDescription(
                `Use one of the following commands:\n**.mod message**\n**.mod embed**`
              );
            message.channel.send({ embeds: [blankEmbed] });
            break;

          case "message":
            const channelSent = message.channel as TextChannel;
            const msg_filter = (m: {
              author: { id: string };
              content: string;
            }) => m.author.id === message.author.id;
            const messageInput = await channelSent.send(
              "Please input your message here:"
            );
            const collectedMessage: any = await message.channel.awaitMessages({
              // const collected: Collection< string, Message<boolean>> = await message.channel.awaitMessages({
              filter: msg_filter,
              max: 1,
            });
            // saving the user sent reply:
            const userSentMessage: string = collectedMessage.first()
              ?.content as string;
            // sending a bot created message
            // const messageSent = message.channel.send(userSentMessage);

            // .then((collected) => {
            //   const userSentMessage: string = collected.first()
            //     ?.content as string;
            //   // Deleting user sent message
            //   collectedMessage.first()?.delete();
            //   // Sending a bot created message
            //   const messageSent = message.channel.send(userSentMessage);
            // });

            const channelInput = await channelSent.send(
              "Please mention the channel here:"
            );
            const collectedChannel: any = await message.channel.awaitMessages({
              // const collected: Collection< string, Message<boolean>> = await message.channel.awaitMessages({
              filter: msg_filter,
              max: 1,
            });
            // saving the user sent reply:
            const userMentionedChannel: string = collectedChannel.first()
              ?.content as string;
            const mentionedChannelID = userMentionedChannel
              .replace("<#", "")
              .replace(">", "");

            // Sending a message to the specified mentioned channel:
            (client.channels.cache.get(mentionedChannelID) as TextChannel).send(
              userSentMessage
            );

            break;
          case "embed":
            const embedCommandSent = message.channel as TextChannel;
            const embed_filter = (m: {
              author: { id: string };
              content: string;
            }) => m.author.id === message.author.id;

            const embedQuestions: Array<string> = [
              "Who do you want to mention?",
              "Embed Title:",
              "Embed Description:",
            ];

            let embed_input: Array<string> = [];

            for (let i = 0; i < embedQuestions.length; i++) {
              let embedInput = await embedCommandSent.send(embedQuestions[i]);
              const embedTitle: any = await message.channel.awaitMessages({
                filter: embed_filter,
                max: 1,
              });
              embed_input[i] = embedTitle.first().content;
            }

            const userEmbed = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle(embed_input[1])
              .setDescription(embed_input[2]);

            const embedChannelInput = await message.channel.send(
              "Please mention the channel here:"
            );
            const embedChannel: any = await message.channel.awaitMessages({
              // const collected: Collection< string, Message<boolean>> = await message.channel.awaitMessages({
              filter: embed_filter,
              max: 1,
            });
            // saving the user sent reply:
            const embedMentionedChannel: string = embedChannel.first()
              ?.content as string;
            const embedChannelID = embedMentionedChannel
              .replace("<#", "")
              .replace(">", "");

            // Sending a message to the specified mentioned channel:
            (client.channels.cache.get(embedChannelID) as TextChannel).send({
              content: embed_input[0],
              embeds: [userEmbed],
            });

            break;
        }
      }
    } else {
      message.channel.send(
        "You do not have enough permissions to use mod command!"
      );
    }
  }
}
