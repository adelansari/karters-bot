import {
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  TextChannel,
} from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import * as path from "path";
import * as fs from "fs";
import { Pagination } from "discordjs-button-embed-pagination";

export default class CharactersCommand extends BaseCommand {
  constructor() {
    super(
      "characters",
      "misc",
      ["skins"],
      "Showcasing game characters and their skins."
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const charactersFilePath = "/assets/skins/" as string; //update this string if file path changes
    const imageDir: string = path.join(__dirname, `.${charactersFilePath}`); // saving the skins path and correcting it

    const characterList = fs.readdirSync(imageDir); // Character list extracted from file names.

    // Saving every individual path for characters in an Array string.
    let skinFilePath = [] as Array<string>;
    let skinsList = [] as Array<string[]>;
    for (let i = 0; i < characterList.length; i++) {
      skinFilePath[i] = path.join(
        __dirname,
        `.${charactersFilePath}/${characterList[i]}/`
      );
      skinsList[i] = fs.readdirSync(skinFilePath[i]);
    }

    // Combining array of multiple arrays into one string array.
    let skinListConcat: Array<string> = Array.prototype.concat(...skinsList);

    // Returning a random integer from 0 to skinsList.length
    const randomSkinIndex = Math.floor(Math.random() * skinsList.length);

    // Function to return a random image name from character file using index
    function skinRandom(imgArr: string[]) {
      return imgArr[Math.floor(Math.random() * imgArr.length)];
    }

    // if user input was only .characters or .skins, it will show a list, check that it is not undefined or have a crash
    let inputForThisCommand = args[0];

    if (inputForThisCommand === undefined) {
      inputForThisCommand = "spacethefinalfrontier";
    }

    if (inputForThisCommand !== undefined) {
      let makeItLowerCase = inputForThisCommand.toLowerCase();
      switch (makeItLowerCase) {
        case "spacethefinalfrontier":
          const blankEmbed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(
              "Whoops! Use `.characters help` or `.skins help` to view the characters help menu."
            );
          message.channel.send({ embeds: [blankEmbed] });
          break;

        case "list":
          // Create skinUrl out of the raw image in github:
          const skinUrl: string =
            "https://raw.githubusercontent.com/adelansari/karters-bot/development/src/commands/misc/assets/skins/";
          
          // Correcting file names in PowerShell if necessary:
          // Get-ChildItem -recurse -name | ForEach-Object { Rename-Item $_ $_.replace(" ","_") }
          let charEmbeds: MessageEmbed[][] = [];
          let charEmbedGrab: MessageEmbed[] = [];
          let skinImgUrls: string[] = [];
          let skinArrays: string[] = [];

          for (let i = 0; i < characterList.length; ++i) {
            let skinArrays = skinsList[i]
            for (let j = 0; j < skinsList[i].length; ++j) {
              skinImgUrls.push(skinUrl + `${characterList[i]}/${skinArrays[j]}`);
              charEmbedGrab.push(
                new MessageEmbed()
                  .setTitle("All Characters")
                  .setDescription(`Character name ${characterList[i]}`)
                  .setImage(skinImgUrls[j])
              );
            }
            charEmbeds.push(charEmbedGrab);
            await new Pagination(message.channel as TextChannel, charEmbeds[i], "page").paginate()
          }
          
          

          // characterList.forEach((characters, i) => {
          //   skinsList[i].forEach((skins, j) => {
          //     skinImgUrls[i][j] = skinUrl + `${characters}/${skins}`;
          //     charEmbeds[i].push(
          //       new MessageEmbed()
          //         .setTitle("All Characters")
          //         .setDescription(`Character name ${characters}`)
          //         .setImage( skinImgUrls[i][j])
          //     );
          //   });
          // });

          // await new Pagination(message.channel as TextChannel, charEmbeds[1], "page").paginate()

          const selectOptions: object[] = [];
          characterList.forEach((characters, index) => {
            selectOptions.push({ label: characters, value: index });
          });

          // const skinRow = new MessageActionRow()
          // const skinEmbed = new MessageEmbed()
          // const skinSelect = new MessageSelectMenu()
          //   .setCustomId("skinSelect")
          //   .setPlaceholder("Vroom vroom choose a character!")
          //   .addOptions()

          // // creating an embed with a list of game characters
          // const listCharacterEmbed = new MessageEmbed()
          //   .setColor("#0099ff")
          //   .setTitle("List of characters: ")
          //   .setDescription(
          //     characterList
          //     .map((i) => `${characterList.indexOf(i) + 1}. ${i}`)
          //     .join("\n")
          //   )
          // message.channel.send({ embeds: [listCharacterEmbed] });
          break;

        case "random":
          message.channel.send({
            files: [
              `${skinFilePath[randomSkinIndex]}${skinRandom(
                skinsList[randomSkinIndex]
              )}`,
            ],
          });
          break;

        case "help":
          const skinsHelpEmbed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Characters and Skins")
            .setDescription(
              "The command can be used by both `.characters` or `skins`"
            )
            .addFields(
              {
                name: ".characters list",
                value: "Shows a list of game characters.",
              },
              {
                name: ".characters [NAME]",
                value:
                  "Shows a random skin from the name character. Example: `.characters Puma`",
              },
              {
                name: ".characters random",
                value: "Shows a random skin from a random game character.",
              }
            );

          message.channel.send({ embeds: [skinsHelpEmbed] });
          break;

        default:
          if (characterList.indexOf(args[0]) > -1) {
            const characterIndex = characterList.indexOf(args[0]);
            message.channel.send({
              files: [
                `${skinFilePath[characterIndex]}${skinRandom(
                  skinsList[characterIndex]
                )}`,
              ],
            });
          } else {
            const failCharacterEmbed = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle(
                `Character ${args} does not exist in the list! Character name is case-sensitive (refer to ".characters list").`
              );
            message.channel.send({ embeds: [failCharacterEmbed] });
          }
          break;
      }
    }
  }
}
