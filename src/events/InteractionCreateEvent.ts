// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-interactionCreate
import { Interaction, MessageAttachment, MessageEmbed } from "discord.js";
import wait from "timers/promises";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import * as path from "path";
import * as fs from "fs";

export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super("interactionCreate");
  }

  async run(client: DiscordClient, interaction: Interaction) {

    // For MemesGroup command
    const memeFilePath = "/commands/misc/assets/memes/" as string; //update this string if file path changes
    const memeDir: string = path.join(__dirname, `./..${memeFilePath}`); // saving the memes path and correcting it

    if (interaction.isSelectMenu()) {
      if (interaction.customId === "memeSelect") {
        // Finding the path of the chosen meme from the SelectionMenu and correcting it
        const memeChosenPath: string = path.join(
          `${memeDir}/${interaction.values[0]}`
        );
        // await interaction.update({ content: `You have selected ${interaction.values[0]}`, files: [memeChosenPath], components: [] });

        await interaction.deferUpdate();
        await wait.setTimeout(4000);
        const file = new MessageAttachment(memeChosenPath);
        await interaction.editReply({
          content: `You have selected ${interaction.values[0]}`,
          files: [file],
          // components: [],
        });
      }
    }

    // For Art command
    const artFilePath = "/commands/misc/assets/gameArt/" as string; //update this string if file path changes
    const imageDir: string = path.join(__dirname, `./..${artFilePath}`); // saving the gameArt path and correcting it
    const artCollection = fs.readdirSync(imageDir); // reading the "images" folder and saving the file names in an array.

    const embeds: MessageEmbed[] = [];
    const files: MessageAttachment[] = [];
    for (let i = 0; i < artCollection.length; ++i) {
      files.push(
        new MessageAttachment(path.join(`${imageDir}${artCollection[i]}`))
      );
      embeds.push(
        new MessageEmbed()
          .setTitle("All Arts")
          .setDescription(`Image ${i + 1}/${artCollection.length}`)
          .setImage(`attachment://${artCollection[i]}`)
      );
    }

    let embedNext = 0;
    if (interaction.isButton()) {
      if (interaction.customId === "nextbtn") {
        ++embedNext
        await interaction.deferUpdate();
        await wait.setTimeout(4000);
        await interaction.reply({ embeds: [embeds[embedNext]], files: [files[embedNext]], components: [row] });

      }

    }

    // if (interaction.isButton()) {
    //   const filter = (i: any) =>
    //     i.customId === "nextbtn";
    //   const collector = interaction.channel.createMessageComponentCollector({
    //     filter,
    //     time: 15000,
    //   });

    //   collector.on("collect", async (i: any) => {
    //     if (i.customId === "nextbtn") {
    //       await i.update({ content: "A button was clicked!", components: [] });
    //     }
    //   });

    //   collector.on("end", (collected) =>
    //     console.log(`Collected ${collected.size} items`)
    //   );
    // }
  }
}
