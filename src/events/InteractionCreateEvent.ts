// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-interactionCreate
import {
  Interaction,
  MessageAttachment,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
  TextChannel,
  User,
} from "discord.js";
import wait from "timers/promises";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import { GlobalLinks } from "../reusableMiscComponents/GlobalLinks";
import { GlobalMemeDescriptions } from "../reusableMiscComponents/GlobalMemeDescriptions";
import * as path from "path";
import * as fs from "fs";
import { Pagination } from "discordjs-button-embed-pagination";
import { cwd } from "process";

// initializing embed as zero for ArtCommand embeds
// let embedNext = 0;

export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super("interactionCreate");
  }

  async run(client: DiscordClient, interaction: Interaction) {
    /**
     * For MemesGroupCommand, see MemesGroupCommand.ts
     */
    const memeFilePath = GlobalLinks.memesGroupUrl as string; //update this string if file path changes
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
        let memeDescription: string = ``;
        switch (interaction.values[0]) {
          /**
           * Update this switch if you want a meme to be
           * one you can select from MemesGroupCommand.ts
           */
          case GlobalMemeDescriptions.memeFileName01:
            memeDescription = GlobalMemeDescriptions.memeDesc09;
            break;

          case GlobalMemeDescriptions.memeFileName02:
            memeDescription = GlobalMemeDescriptions.memeDesc17;
            break;

          case GlobalMemeDescriptions.memeFileName03:
            memeDescription = GlobalMemeDescriptions.memeDesc16;
            break;

          case GlobalMemeDescriptions.memeFileName04:
            memeDescription = GlobalMemeDescriptions.memeDesc11;
            break;

          case GlobalMemeDescriptions.memeFileName05:
            memeDescription = GlobalMemeDescriptions.memeDesc01;
            break;

          case GlobalMemeDescriptions.memeFileName08:
            memeDescription = GlobalMemeDescriptions.memeDesc13;
            break;

          case GlobalMemeDescriptions.memeFileName09:
            memeDescription = GlobalMemeDescriptions.memeDesc12;
            break;

          case GlobalMemeDescriptions.memeFileName10:
            memeDescription = GlobalMemeDescriptions.memeDesc03;
            break;

          case GlobalMemeDescriptions.memeFileName11:
            memeDescription = GlobalMemeDescriptions.memeDesc08;
            break;

          case GlobalMemeDescriptions.memeFileName18:
            memeDescription = GlobalMemeDescriptions.memeDesc18;
            break;

          case GlobalMemeDescriptions.memeFileName07:
            memeDescription = GlobalMemeDescriptions.memeDesc15;
            break;

          default:
            break;
        }
        await interaction.editReply({
          content: `${interaction.user.username}, you have selected ${interaction.values[0]} - ${memeDescription}`,
          files: [file],
          components: [], //keep this list blank so the multi select isn't rendered again
        });
      }

      // /**
      //  * For CharactersCommand, see CharactersCommand.ts
      //  */

      if (interaction.customId === "skinSelect") {
        const skinUrl: string =
          "https://raw.githubusercontent.com/adelansari/karters-bot/development/src/commands/misc/assets/skins/";
        const charactersFilePath = "/src/commands/misc/assets/skins/" as string;
        const imageDir: string = path.join(__dirname, `.${charactersFilePath}`);
        await interaction.deferUpdate();
        await wait.setTimeout(4000);
        let charEmbedGrab = [];
        let skinFiles: Array<string> = fs.readdirSync(
          path.join(
            process.cwd(),
            `.${charactersFilePath}/${interaction.values[0]}/`
          )
        );

        for (let j = 0; j < skinFiles.length; j++) {
          charEmbedGrab.push(
            new MessageEmbed()
              .setTitle(`${interaction.values[0]}`)
              .setDescription(`Character name ${interaction.values[0]}`)
              .setImage(skinUrl + `${interaction.values[0]}/${skinFiles[j]}`)
          );
        }

        await new Pagination(
          interaction.channel as TextChannel,
          charEmbedGrab,
          "page",
          300000
        ).paginate();

        interaction.deleteReply();
      }
    }

    // /**
    //  * For CharactersCommand, see CharactersCommand.ts
    //  */

    // /**
    //  * For ArtCommand, see ArtCommand.ts
    //  * Code is working, however there is a better implementation of the code using discordjs-button-embed-pagination.
    //  */

    // // For Art command
    // const artFilePath = GlobalLinks.artUrl as string; //update this string if file path changes
    // const imageDir: string = path.join(__dirname, `./..${artFilePath}`); // saving the gameArt path and correcting it
    // const artCollection = fs.readdirSync(imageDir); // reading the "images" folder and saving the file names in an array.

    // const embeds: MessageEmbed[] = [];
    // const files: MessageAttachment[] = [];
    // for (let i = 0; i < artCollection.length; ++i) {
    //   files.push(
    //     new MessageAttachment(path.join(`${imageDir}${artCollection[i]}`))
    //   );
    //   embeds.push(
    //     new MessageEmbed()
    //       .setTitle("All Arts")
    //       .setDescription(`Image ${i + 1}/${artCollection.length}`)
    //       .setImage(`attachment://${artCollection[i]}`)
    //   );
    // }

    // if (interaction.isButton()) {
    //   // creating Buttons
    //   const button1 = new MessageButton()
    //     .setCustomId("previousbtn")
    //     .setLabel("Previous")
    //     .setEmoji("◀")
    //     .setStyle("SECONDARY");
    //   // .setDisabled(embedNext === 0);

    //   const button2 = new MessageButton()
    //     .setCustomId("nextbtn")
    //     .setLabel("Next")
    //     .setEmoji("▶")
    //     .setStyle("SECONDARY");
    //   // .setDisabled(embedNext === artCollection.length - 1);

    //   // create an array of buttons
    //   const buttonList = [button1, button2];

    //   // Create a MessageActionRow and add the button to that row.
    //   const row = new MessageActionRow().addComponents(buttonList);

    //   const buttonSelected = interaction.customId;

    //   switch (buttonSelected) {
    //     case "nextbtn":
    //       if (embedNext < artCollection.length - 1) {
    //         embedNext++;
    //         await interaction.deferUpdate();
    //         await wait.setTimeout(2500);
    //         await interaction.editReply({
    //           embeds: [embeds[embedNext]],
    //           files: [files[embedNext]],
    //           components: [row],
    //         });
    //         if (embedNext === artCollection.length - 1) {
    //           embedNext = -1;
    //         }
    //       }
    //       break;
    //     case "previousbtn":
    //       if (embedNext > 0) {
    //         embedNext--;
    //         await interaction.deferUpdate();
    //         await wait.setTimeout(2500);
    //         await interaction.editReply({
    //           embeds: [embeds[embedNext]],
    //           files: [files[embedNext]],
    //           components: [row],
    //         });
    //         if (embedNext === 0) {
    //           embedNext = artCollection.length;
    //         }
    //       }
    //       break;
    //   }

    // }
  }
}
