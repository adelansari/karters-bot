import { Message, MessageActionRow, MessageSelectMenu } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { GlobalLinks } from '../../reusableMiscComponents/GlobalLinks';
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
        super('groupMemes', 'misc', [], "Random meme from some of the special moments, but you can choose a meme.");
    };

    async run(client: DiscordClient, message: Message, args: Array<string>) {
        message.channel.send('This is a test command.');

        const memeFilePath = GlobalLinks.memesUrl as string;
        const memeImgDir:string = path.join(__dirname, `.${memeFilePath}`);
        const memeGroupCollection = fs.readdirSync(memeImgDir);

        let memeGroup: string[] = [];

        memeGroupCollection.forEach(memeGroupItem => {

            memeGroup.push(memeGroupItem);

        });

        message.channel.send(`Meme list contains: ${memeGroup}`); //debug

        if (memeGroup) {

            const memeRow = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("memeSelect")
                        .setPlaceholder("Vroom vroom choose a meme!")
                        .addOptions([
                            {
                                label: memeGroup[0],
                                description: `Meme: ${memeGroup[0]}`,
                                value: memeGroup[0],
                            },
                            {
                                label: memeGroup[1],
                                description: `Meme: ${memeGroup[1]}`,
                                value: memeGroup[1],
                            },

                        ])
                );
        
            await message.reply({ content: 'Here is the full collection:', components: [memeRow] }); 
            /**
             * Todo - How do you get the bot to Interact with these messages using
             * MessageComponentInteraction? - ProBoz
             */

        } else if (!memeGroup) {

            message.channel.send("Sorry, there are no memes available for you to select.");

        };
        
    };
};