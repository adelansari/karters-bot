import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import * as path from 'path';
import * as fs from 'fs';

/**
 * @MemesCommand - Display a meme related to any community
 * related event from the Karters official discord guild.
 * It's very similar to ArtCommand.ts - ProBoz
 */

export default class MemesCommand extends BaseCommand {
    constructor() {
        super ('memes', 'misc', [], "Random meme from some of the special moments.");
    };

    async run(client: DiscordClient, message: Message, args: Array<string>) {

        const memeFilePath = "/assets/memes/" as string;
        const memeImgDir:string = path.join(__dirname, `.${memeFilePath}`);
        const memeCollection = fs.readdirSync(memeImgDir);

        let previousArt: Array<string> = []; //store previous shown art here
        let decision = 0 as number; //the decision index

        let selector = Math.floor(Math.random() * memeCollection.length) as number;
        let selectorString = selector.toString() as string;

        while (previousArt.includes(selectorString)) {

            selector = Math.floor(Math.random() * memeCollection.length);

        };

        if (previousArt.length > Math.floor(memeCollection.length/2)) {

            previousArt.shift();
            previousArt.push(selectorString);

        } else {

            previousArt.push(selectorString);

        };

        // console.log(`The SelectorString: ${selectorString}`); //debug selector string number
        decision = Number(selectorString) as number;
        // console.log(`The decision: ${decision}`); //debug decision number

        // console.log(memeCollection[decision]);

        switch (memeCollection[decision]) {
            /**
             * Update this switch so that each meme file has its own message.
             */
            case 'luigiMansionSkate.mp4':
                const memeEmbed01 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(`Luigi's Mansion skate edition`)
                message.channel.send({ embeds: [memeEmbed01] });
                break;

            case 'Marine.mp4':
                const memeEmbed02 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(`Time to fly lol!`)
                message.channel.send({ embeds: [memeEmbed02] });
                break;

            case 'SeeYa.webm':
                const memeEmbed03 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(`Welp, there goes another one of 'em ...`)
                message.channel.send({ embeds: [memeEmbed03] });
                break;

            case 'sonicYTP_pingsForSquidGameMeme.mp4':
                const memeEmbed04 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(`That moment when sonicYTP pings everyone in the Karters discord server for a squid game meme game.`)
                message.channel.send({ embeds: [memeEmbed04] });
                break;
            
            case 'swipeUpToFlyCat.mp4':
                const memeEmbed05 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(`Swipe up to fly kitty cat!`)
                message.channel.send({ embeds: [memeEmbed05] });
                break;
            
            case 'thatBedIsMine.mp4':
                const memeEmbed06 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(`That bed is MINE!`)
                message.channel.send({ embeds: [memeEmbed06] });
                break;

            case 'weirdnessRandom1.webm':
                const memeEmbed07 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(`... and now for something completely different!`)
                message.channel.send({ embeds: [memeEmbed07] });
                break;
        
            default:
                break;
        };

        message.channel.send({ files: [`${__dirname}${memeFilePath}${memeCollection[decision]}`] });

    };
};