import BaseEvent from '../../utils/structures/BaseEvent';
import { Message, MessageEmbed } from 'discord.js';
import DiscordClient from '../../client/client';
import { CommandPermissionList } from '../../reusableMiscComponents/CommandPermissionList';
import { GlobalLinks } from '../../reusableMiscComponents/GlobalLinks';

export default class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  };

  async run(client: DiscordClient, message: Message) {
    if (message.author.bot) return;
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {

        const deniedReply: string = `I apologize, you cannot use that command here.`;
        let canRunCommand: boolean = true;
        const pumaFilePath: string = GlobalLinks.pumaPFPUrl;

        CommandPermissionList.forEach((deniedChannelString) => {
          if (message.channel.id === deniedChannelString)  {
            const deniedEmbed = new MessageEmbed()
              .setColor("DARK_RED")
              .setDescription(deniedReply)
            message.channel.send({ embeds: [deniedEmbed], files: [`${__dirname}${pumaFilePath}`] });
            canRunCommand = false;
            return;
          };
        });

        if (canRunCommand) {
          command.run(client, message, cmdArgs);
        };

      };
    };
  };
};