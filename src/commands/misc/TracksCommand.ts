import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import * as path from "path";
import * as fs from "fs";
// import { promisify } from "util";

export default class TracksCommand extends BaseCommand {
  constructor() {
    super("tracks", "misc", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const imageDir: string = path.join(__dirname, "./assets/images/"); // saving the image path and correcting it
    // let artCollection: Array<string> = [];
    // fs.readdir('./src/commands/misc/assets/images',(err, data) => {
    //   if (err) { console.log(err) } else {
    //     for (let i = 0; i < data.length; i++) {
    //       artCollection.push(data[i]);
    //       console.log('Output 1: ', artCollection)
    //     }
    //     console.log('Output 2: ', artCollection)
    //   }
    // })
    // console.log('Output 3: ', artCollection)

    // reading the "images" folder and saving the file names in an array.
    const artList = fs.readdirSync(imageDir);
    const artCollection = artList.filter((file) => file.endsWith(".jpg")); // filtering by .jpg
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
        files: [`${__dirname}/assets/images/${artCollection[decision]}`],
      });
    } else if (args[0].toLowerCase() === "list") {
      for (let i = 0; i < artCollection.length; i++) {
        artCollection[i] = artCollection[i].replace(/_|.jpg/g, ' '); // removing '_' and 
        artCollection[i] = artCollection[i].charAt(0).toUpperCase() + artCollection[i].substring(1);
      }
      message.channel.send(artCollection.map((i) => `${artCollection.indexOf(i)+1}. ${i}`).join("\n"));
    } else {
      decision = Number(args) as number;
      message.channel.send(`${artCollection[decision]} track!`); //art dir test
      message.channel.send({
        files: [`${__dirname}/assets/images/${artCollection[decision]}`],
      });
    }

    //message.channel.send({ files: [`${__dirname}/assets/images/${artCollection[decision]}`] }); //crashes the bot don't uncomment yet

    // const files = fs.readdir(imageDir,(err, files) => {
    //   console.log(files)
    // })

    // const files: Promise<string[]> = promisify(fs.readdir)(imageDir, { encoding: "utf-8" });
  }
}
