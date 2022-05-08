import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { GlobalLinks } from '../../reusableMiscComponents/GlobalLinks';
import { GlobalMemeDescriptions } from '../../reusableMiscComponents/GlobalMemeDescriptions';
import * as path from 'path';
import * as fs from 'fs';

/**
 * @MemesCommand - Display a meme related to any community
 * related event from the Karters official discord guild.
 * It's very similar to ArtCommand.ts - ProBoz
 * 
 * Note: If you want to make any of these memes selectable,
 * see events/InteractionCreateEvent.ts
 */

export default class MemesCommand extends BaseCommand {
    constructor() {
        super ('memes', 'misc', [], "Random meme from some of the special moments.");
    };

    async run(client: DiscordClient, message: Message, args: Array<string>) {

        const memeFilePath = GlobalLinks.memesUrl as string;
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
            case GlobalMemeDescriptions.memeFileName05:
                const memeEmbed01 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc01)
                message.channel.send({ embeds: [memeEmbed01] });
                break;

            case GlobalMemeDescriptions.memeFileName06:
                const memeEmbed02 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc02)
                message.channel.send({ embeds: [memeEmbed02] });
                break;

            case GlobalMemeDescriptions.memeFileName10:
                const memeEmbed03 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc03)
                message.channel.send({ embeds: [memeEmbed03] });
                break;

            case GlobalMemeDescriptions.memeFileName12:
                const memeEmbed04 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc04)
                message.channel.send({ embeds: [memeEmbed04] });
                break;
            
            case GlobalMemeDescriptions.memeFileName14:
                const memeEmbed05 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc05)
                message.channel.send({ embeds: [memeEmbed05] });
                break;
            
            case GlobalMemeDescriptions.memeFileName15:
                const memeEmbed06 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc06)
                message.channel.send({ embeds: [memeEmbed06] });
                break;

            case GlobalMemeDescriptions.memeFileName17:
                const memeEmbed07 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc07)
                message.channel.send({ embeds: [memeEmbed07] });
                break;

            case GlobalMemeDescriptions.memeFileName11:
                const memeEmbed08 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc08)
                message.channel.send({ embeds: [memeEmbed08] });
                break;

            case GlobalMemeDescriptions.memeFileName01:
                const memeEmbed09 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc09)
                message.channel.send({ embeds: [memeEmbed09] });
                break;

            case GlobalMemeDescriptions.memeFileName13:
                const memeEmbed10 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc10)
                message.channel.send({ embeds: [memeEmbed10] });
                break;

            case GlobalMemeDescriptions.memeFileName04:
                const memeEmbed11 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc11)
                message.channel.send({ embeds: [memeEmbed11] });
                break;

            case GlobalMemeDescriptions.memeFileName09:
                const memeEmbed12 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc12)
                message.channel.send({ embeds: [memeEmbed12] });
                break;

            case GlobalMemeDescriptions.memeFileName08:
                const memeEmbed13 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc13)
                message.channel.send({ embeds: [memeEmbed13] });
                break;

            case GlobalMemeDescriptions.memeFileName16:
                const memeEmbed14 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc14)
                message.channel.send({ embeds: [memeEmbed14] });
                break;

            case GlobalMemeDescriptions.memeFileName07:
                const memeEmbed15 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc15)
                message.channel.send({ embeds: [memeEmbed15] });
                break;

            case GlobalMemeDescriptions.memeFileName03:
                const memeEmbed16 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc16)
                message.channel.send({ embeds: [memeEmbed16] });
                break;

            case GlobalMemeDescriptions.memeFileName02:
                const memeEmbed17 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc17)
                message.channel.send({ embeds: [memeEmbed17] });
                break;

            case GlobalMemeDescriptions.memeFileName18:
                const memeEmbed18 = new MessageEmbed()
                    .setColor("GOLD")
                    .setDescription(GlobalMemeDescriptions.memeDesc18)
                message.channel.send({ embeds: [memeEmbed18] });
                break;
        
            default:
                break;
        };

        message.channel.send({ files: [`${__dirname}${memeFilePath}${memeCollection[decision]}`] });

    };
};