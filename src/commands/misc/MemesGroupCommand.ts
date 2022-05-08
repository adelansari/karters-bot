import { Message, MessageActionRow, MessageSelectMenu } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { GlobalLinks } from '../../reusableMiscComponents/GlobalLinks';
import { GlobalMemeDescriptions } from '../../reusableMiscComponents/GlobalMemeDescriptions';
import * as path from 'path';
import * as fs from 'fs';

/**
 * @MemesGroupCommand - Display a meme using the "Discord UI" for
 * a command and be able to browse which meme you want to appear.
 * 
 * See InteractionCreateEvent.ts to see the async receiving
 * end for this message action row - ProBoz
 */

export default class MemesGroupCommand extends BaseCommand {
    constructor() {
        super('pickmemes', 'misc', [], "Random meme from some of the special moments, but you can choose a meme.");
    };

    async run(client: DiscordClient, message: Message, args: Array<string>) {

        const memeFilePath = GlobalLinks.memesUrl as string;
        const memeImgDir:string = path.join(__dirname, `.${memeFilePath}`);
        const memeGroupCollection = fs.readdirSync(memeImgDir);
        const presentMemeText = `Meme: ` as string;
        const presetOptionsText = `Here is the full meme collection you can choose from: ` as string;

        let memeGroup: string[] = [];

        memeGroupCollection.forEach(memeGroupItem => {

            memeGroup.push(memeGroupItem);

        });

        // message.channel.send(`Meme list contains: ${memeGroup}`); //debug

        const meme0: string[] = memeGroup.filter(meme0 => meme0.includes(GlobalMemeDescriptions.memeFileName01));
        const meme1: string[] = memeGroup.filter(meme1 => meme1.includes(GlobalMemeDescriptions.memeFileName02));
        const meme2: string[] = memeGroup.filter(meme2 => meme2.includes(GlobalMemeDescriptions.memeFileName03));
        const meme3: string[] = memeGroup.filter(meme3 => meme3.includes(GlobalMemeDescriptions.memeFileName04));
        const meme4: string[] = memeGroup.filter(meme4 => meme4.includes(GlobalMemeDescriptions.memeFileName05));
        const meme5: string[] = memeGroup.filter(meme5 => meme5.includes(GlobalMemeDescriptions.memeFileName08));
        const meme6: string[] = memeGroup.filter(meme6 => meme6.includes(GlobalMemeDescriptions.memeFileName09));
        const meme7: string[] = memeGroup.filter(meme7 => meme7.includes(GlobalMemeDescriptions.memeFileName10));
        const meme8: string[] = memeGroup.filter(meme8 => meme8.includes(GlobalMemeDescriptions.memeFileName11));
        const meme9: string[] = memeGroup.filter(meme9 => meme9.includes(GlobalMemeDescriptions.memeFileName18));
        const meme10: string[] = memeGroup.filter(meme10 => meme10.includes(GlobalMemeDescriptions.memeFileName07));

        // message.channel.send(`Meme 0 is: ${meme0}`); //debug, create one for each meme<number> variable

        if (memeGroup) {

            const memeRow = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("memeSelect")
                        .setPlaceholder("Vroom vroom choose a meme!")
                        .setOptions([
                            {
                                label: meme0[0], //dbus.mp4
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc09}`,
                                value: meme0[0],
                            },
                            {
                                label: meme1[0], //ForkliftStunts.webm
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc17}`,
                                value: meme1[0],
                            },
                            {
                                label: meme2[0], //GangOnRainbowRoad.mp4
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc16}`,
                                value: meme2[0],
                            },
                            {
                                label: meme3[0], //KartersMemeSpinoff.png
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc11}`,
                                value: meme3[0],
                            },
                            {
                                label: meme4[0], //luigiMansionSkate.mp4
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc01}`,
                                value: meme4[0],
                            },
                            {
                                label: meme5[0], //RealRockFM.mp4
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc13}`,
                                value: meme5[0],
                            },
                            {
                                label: meme6[0], //samurai_fight.mp4
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc12}`,
                                value: meme6[0],
                            },
                            {
                                label: meme7[0], //SeeYa.webm
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc03}`,
                                value: meme7[0],
                            },
                            {
                                label: meme8[0], //SeeYa2.webm
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc08}`,
                                value: meme8[0],
                            },
                            {
                                label: meme9[0], //wuggie1.webm
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc18}`,
                                value: meme9[0],
                            },
                            {
                                label: meme10[0], //PugDanceBattleScene.mp4
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc15}`,
                                value: meme10[0],
                            },
                        ])
                );
        
            await message.channel.send({ content: `${message.author.username}, ${presetOptionsText}`, components: [memeRow] });

        } else if (!memeGroup) {

            message.channel.send("Sorry, there are no memes available for you to select.");

        };
        
    };
};