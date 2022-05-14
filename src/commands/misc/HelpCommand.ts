import { Message, MessageEmbed, Collection } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import skinsHelpEmbed from "./CharactersCommand"

export default class HelpCommand extends BaseCommand {
  constructor() {
    super("help", "misc", [], "All Commands");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      const helpEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("⚙ Help Menu")
        .setDescription('Followings are **The Karter Bot** commands. You can use ".help [command name]" to get more info (example: `.help characters`). ')
        // .addFields({ name: '\u200B', value: '\u200B' }); // To add a blank field to the embed

      const commandsArray = [...client.commands.values()]; // converting commands Collection type to array
      const botCommands = commandsArray
        .filter((command, index, a) => a.indexOf(command) === index)  // Filtering out duplicate commands (caused by adding aliases)
        .filter((command) => command.name !== "help") // Filtering out the help command + its description
        .filter((command) => command.name !== "ping") // Filtering out the ping command + its description
        .filter((command) => command.name !== "test") // Filtering out the test command + its description
        .filter((command) => command.name !== "mod") // Filtering out the mod command + its description
        .sort((a, b) => a.name.localeCompare(b.name));  // Alphabetically sorting the commands

      botCommands.forEach((command) => {
        helpEmbed.addField(command.getName(), command.getDescription());
      });
      message.channel.send({ embeds: [helpEmbed] }); // sending an embed with the commands
    } else {
      const command: boolean = client.commands.has(args[0]);
      if (command) {
        const cmd: any = client.commands.get(args[0]);
        const specificHelpEmbed = new MessageEmbed()
          .setColor("AQUA")
          .setTitle(`"${cmd.name}" description`)
          .setDescription(`**Description:** *${cmd.description}* \n **Alias:** "${cmd.aliases}"`);
        
        message.channel.send({ embeds: [specificHelpEmbed] });

        
      } else {
        message.channel.send("Oops! That command does not exist.");
      }
    }
  }
}
