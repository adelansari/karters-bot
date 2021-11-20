import { Message, MessageEmbed, Collection } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

// //Command string imports
// import { verifyString } from "../authentication/VerifyCommand";
// import { commandArtString } from "./ArtCommand";
// import { commandTrackString } from "./TracksCommand";

export default class HelpCommand extends BaseCommand {
  constructor() {
    super("help", "misc", [], "All Commands");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      const helpEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("⚙ Commands");

      const commandsArray = [...client.commands.values()]; // converting commands Collection type to array
      const botCommands = commandsArray
        .filter((command, index, a) => a.indexOf(command) === index)  // Filtering out duplicate commands (caused by adding aliases)
        .filter((command) => command.name !== "help") // Filtering out the help command + its description
        .filter((command) => command.name !== "characters") // Filtering out characters/skins because it is unfinished
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

    /* By ProBoz
    ********************

    message.channel.send(`Help Menu: 
    .${verifyString.cmdName}: .${verifyString.cmdDesc}
    .${commandArtString.cmdName}: .${commandArtString.cmdDesc}
    .${commandTrackString.cmdName}: .${commandTrackString.cmdDesc}`);
    //There should be some styling added to this menu, try to loop through
    //a list

    ********************
    */
  }
}
