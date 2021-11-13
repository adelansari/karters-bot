import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import * as path from 'path';
import * as fs from 'fs';

/**
 * @ArtCommand - Display art related to The Karters and send
 * as a message. -ProBoz
 */

export default class ArtCommand extends BaseCommand {
  constructor() {
    super('art', 'misc', []);
  };

  async run(client: DiscordClient, message: Message, args: Array<string>) {

    
    let artCollection: Array<string|Buffer> = [
        'Captains_Cove.jpg',
        'Jungle_Rumble.jpg',
        'Molten_Mile.jpg',
    ];
    console.log(`Art collection Array: `); //see the total files
    console.log(artCollection); //see the total files
    

    /**
    //The logic in here needs to translate a Buffer (file name) into a string
    //right now it's "undefined" file names
    let artCollection: Array<string> = []; //use fs to push all art paths
    //from misc/assets/images

    fs.readdir(`${__dirname}/assets/images`, { withFileTypes: false }, (err, files) => {

        if (err) { console.log(err) } else {

            files.forEach(file => {
                //let fileName = file.toString();
                //console.log(`File name: ${fileName}, file type: ${fileName.valueOf()}`); //file name debug
                artCollection.push(`${file}`);
            });

        };
        console.log(`Art collection Array: `); //see the total files
        console.log(artCollection); //see the total files
    });
    */

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
    //message.channel.send({ files: [`${__dirname}/assets/images/${artCollection[decision]}`] }); //crashes the bot don't uncomment yet

    message.channel.send(`${artCollection[decision]} art!`); //art dir test

  };
};