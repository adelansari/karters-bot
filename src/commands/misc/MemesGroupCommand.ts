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
 * This is experimental, command is WIP keep this filtered out for now
 * inside HelpCommand.ts - ProBoz
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

        if (memeGroup) {

            const memeRow = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("memeSelect")
                        .setPlaceholder("Vroom vroom choose a meme!")
                        .setOptions([
                            {
                                label: memeGroup[0],
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc09}`,
                                value: memeGroup[0],
                            },
                            {
                                label: memeGroup[1],
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc17}`,
                                value: memeGroup[1],
                            },
                            {
                                label: memeGroup[2],
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc16}`,
                                value: memeGroup[2],
                            },
                            {
                                label: memeGroup[3],
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc11}`,
                                value: memeGroup[3],
                            },
                            {
                                label: memeGroup[4],
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc01}`,
                                value: memeGroup[4],
                            },
                            {
                                label: memeGroup[7],
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc13}`,
                                value: memeGroup[7],
                            },
                            {
                                label: memeGroup[8],
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc12}`,
                                value: memeGroup[8],
                            },
                            {
                                label: memeGroup[9],
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc03}`,
                                value: memeGroup[9],
                            },
                            {
                                label: memeGroup[10],
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc08}`,
                                value: memeGroup[10],
                            },
                            {
                                label: memeGroup[17],
                                description: `${presentMemeText}${GlobalMemeDescriptions.memeDesc18}`,
                                value: memeGroup[17],
                            }
                        ])
                );
        
            await message.channel.send({ content: `${message.author.username}, ${presetOptionsText}`, components: [memeRow] });

        } else if (!memeGroup) {

            message.channel.send("Sorry, there are no memes available for you to select.");

        };
        
    };
};