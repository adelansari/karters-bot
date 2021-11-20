import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import * as path from 'path';
import * as fs from 'fs';

/**
 * @ArtCommand - Display art related to The Karters and send
 * as a message. -ProBoz
 * 
 * In memory of 001 Abstract Ingenuity, the i01 bot
 */

import { CMDInterface } from '../..';

export const commandArtString: CMDInterface = { 
  cmdName: 'art',
  cmdDesc: `Post some game art from our game.`,
};

export default class ArtCommand extends BaseCommand {
  constructor() {
    super('art', 'misc', [], "Random game art.");
  };

  async run(client: DiscordClient, message: Message, args: Array<string>) {

    const artFilePath = "/assets/gameArt/" as string; //update this string if file path changes
    const imageDir:string = path.join(__dirname, `.${artFilePath}`)  // saving the gameArt path and correcting it
    const artCollection = fs.readdirSync(imageDir); // reading the "images" folder and saving the file names in an array.

    let previousArt: Array<string> = []; //store previous shown art here
    let decision = 0 as number; //the decision index

    let selector = Math.floor(Math.random() * artCollection.length) as number;
    let selectorString = selector.toString() as string;

    while (previousArt.includes(selectorString)) {

        selector = Math.floor(Math.random() * artCollection.length);

    };

    if (previousArt.length > Math.floor(artCollection.length/2)) {

        previousArt.shift();
        previousArt.push(selectorString);

    } else {

        previousArt.push(selectorString);

    };

    console.log(`The SelectorString: ${selectorString}`); //debug selector string number
    decision = Number(selectorString) as number;
    console.log(`The decision: ${decision}`); //debug decision number

    console.log(artCollection[decision]);

    message.channel.send(`${artCollection[decision]} art!`); //art dir test
    message.channel.send({ files: [`${__dirname}${artFilePath}${artCollection[decision]}`] });

  };
};
