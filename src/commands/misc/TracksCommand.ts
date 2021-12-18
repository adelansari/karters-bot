import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import * as path from "path";
import * as fs from "fs";
// import { promisify } from "util";

export default class TracksCommand extends BaseCommand {
  constructor() {
    super("tracks", "misc", ["track"], "Show a list of all tracks, use `.tracks list` to see the list.");
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const trackFilePath = "/assets/tracks/" as string; //update this string if file path changes
    const imageDir: string = path.join(__dirname, `.${trackFilePath}`); // saving the tracks path and correcting it

    // reading the "assets/gameArt/Tracks" folder and saving the file names in an array.
    const trackArtList = fs.readdirSync(imageDir);
    const trackCollection = trackArtList as string[];
    console.log(trackCollection);
    console.log(args);

    let previousArt: Array<string> = []; //store previous shown  track art here
    let decision = 0 as number; //the decision index

    let selector = Math.floor(Math.random() * trackCollection.length) as number;
    let selectorString = selector.toString() as string;

    while (previousArt.includes(selectorString)) {
      selector = Math.floor(Math.random() * trackCollection.length);
    }

    if (previousArt.length > Math.floor(trackCollection.length / 2)) {
      previousArt.shift();
      previousArt.push(selectorString);
    } else {
      previousArt.push(selectorString);
    }

    // console.log(`The SelectorString: ${selectorString}`); // debug selector string number

    let inputForTracks = args[0];

    if (inputForTracks === undefined) {
      inputForTracks = 'trackspaceiswide';
    };

    if (inputForTracks !== undefined) {
      let madeLowerCase = inputForTracks.toLowerCase();
      switch (madeLowerCase) {
        case 'trackspaceiswide':
          decision = Number(selectorString) as number;
          message.channel.send({
            files: [`${__dirname}${trackFilePath}${trackCollection[decision]}`],
          });
          break;
        
        case "list":
          for (let i = 0; i < trackCollection.length; i++) {
            trackCollection[i] = trackCollection[i].replace(/_|.jpg|.png/g, " "); // removing '_' and
            trackCollection[i] =
            trackCollection[i].charAt(0).toUpperCase() +
            trackCollection[i].substring(1);
          };
          const trackListEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Our track list: `)
            .setDescription(trackCollection
              .map((i) => `${trackCollection.indexOf(i) + 1}. ${i}`)
              .join("\n"))
          message.channel.send({ embeds: [trackListEmbed] });

        default:
          console.warn(`Tracks Command has an argument of ${args} and was not intended.`);
          break;
      }
    }

    //=========================== DarkSlayer source code =================================================

    /**
     * Needs improved handling of a track art picker, leave this commented out, here for now - ProBoz.
     * IDEA: Maybe there is a way to use MessageButton in the discord.js library to determine which
     * track for the end user to pick. I'll visit this idea at a later time. - ProBoz. 
     */

    // if (args[0] === undefined) {
    //   decision = Number(selectorString) as number;
    //   message.channel.send({
    //     files: [`${__dirname}${trackFilePath}${trackCollection[decision]}`],
    //   });
    // } else if (args[0].toLowerCase() === "list") {
    //   for (let i = 0; i < trackCollection.length; i++) {
    //     trackCollection[i] = trackCollection[i].replace(/_|.jpg|.png/g, " "); // removing '_' and
    //     trackCollection[i] =
    //       trackCollection[i].charAt(0).toUpperCase() +
    //       trackCollection[i].substring(1);
    //   }
    //   message.channel.send(
    //     trackCollection
    //       .map((i) => `${trackCollection.indexOf(i) + 1}. ${i}`)
    //       .join("\n")
    //   );
    // } else {
    //   decision = Number(args) as number;
    //   decision = decision - 1; // correction to the track refrencing
    //   if (trackCollection[decision] !== undefined) {
    //     message.channel.send({
    //       files: [`${__dirname}${trackFilePath}${trackCollection[decision]}`],
    //     });
    //   } else {
    //     message.channel.send(`Track ${args} does not exist in the list!`); // in case there is an error
    //   }
    // }

    //=========================== End DarkSlayer source code =================================================
  }
}
