import { Command } from '../../Interfaces';

/**
 * Example ping command
 */

export const command: Command = {

    name: 'ping',
    aliases: ['hello'],
    run: async(client, message, args) => {

        message.channel.send(`${client.ws.ping} ping!`);

    },

};