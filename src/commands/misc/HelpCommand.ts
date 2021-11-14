import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

//Command string imports
import { verifyString } from '../authentication/VerifyCommand';
import { commandArtString } from './ArtCommand';
import { commandTrackString } from './TracksCommand';

export default class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'misc', []);
  };

  async run(client: DiscordClient, message: Message, args: Array<string>) {

    message.channel.send(`Help Menu: 
    .${verifyString.cmdName}: .${verifyString.cmdDesc}
    .${commandArtString.cmdName}: .${commandArtString.cmdDesc}
    .${commandTrackString.cmdName}: .${commandTrackString.cmdDesc}`);
    //There should be some styling added to this menu, try to loop through
    //a list

  };
};