import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import * as path from "path";
import * as fs from "fs";
// import { promisify } from "util";

//import { CMDInterface } from "../../index.mjs";

// export const commandTrackString: CMDInterface = {
//   cmdName: "tracks",
//   cmdDesc: `Post some track art from our game.`,
// };

export default class TracksCommand extends BaseCommand {
  constructor() {
    super("tracks", "misc", ["track"], "Show a list of all tracks.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const trackFilePath = "/assets/tracks/" as string; //update this string if file path changes
    const imageDir: string = path.join(__dirname, `.${trackFilePath}`); // saving the tracks path and correcting it

    // reading the "images" folder and saving the file names in an array.
    const artList = fs.readdirSync(imageDir);
    // const artCollection = artList.filter((file) => file.endsWith(".jpg")); // filtering by .jpg
    const artCollection = artList;
    console.log(artCollection);
    console.log(args);

    let previousArt: Array<string> = []; //store previous shown art here
    let decision = 0 as number; //the decision index

    let selector = Math.floor(Math.random() * artCollection.length) as number;
    let selectorString = selector.toString() as string;

    while (previousArt.includes(selectorString)) {
      selector = Math.floor(Math.random() * artCollection.length);
    }

    if (previousArt.length > Math.floor(artCollection.length / 2)) {
      previousArt.shift();
      previousArt.push(selectorString);
    } else {
      previousArt.push(selectorString);
    }

    console.log(`The SelectorString: ${selectorString}`); // debug selector string number

    if (args[0] === undefined) {
      decision = Number(selectorString) as number;
      message.channel.send(`${artCollection[decision]} track!`); //art dir test
      message.channel.send({
        files: [`${__dirname}${trackFilePath}${artCollection[decision]}`],
      });
    } else if (args[0].toLowerCase() === "list") {
      for (let i = 0; i < artCollection.length; i++) {
        artCollection[i] = artCollection[i].replace(/_|.jpg|.png/g, " "); // removing '_' and
        artCollection[i] =
          artCollection[i].charAt(0).toUpperCase() +
          artCollection[i].substring(1);
      }
      message.channel.send(
        artCollection
          .map((i) => `${artCollection.indexOf(i) + 1}. ${i}`)
          .join("\n")
      );
    } else {
      decision = Number(args) as number;
      decision = decision - 1; // correction to the track refrencing
      if (artCollection[decision] !== undefined) {
        message.channel.send(`${artCollection[decision]} track!`); //art dir test
        message.channel.send({
          files: [`${__dirname}${trackFilePath}${artCollection[decision]}`],
        });
      } else {
        message.channel.send(`Track ${args} does not exist in the list!`); // in case there is an error
      }
    }
  }
}
