
import { registerCommands, registerEvents } from './utils/registry';
import config from '../slappey.json';
import botTokenJson from './botToken.json'; // keep this hidden inside src/botToken.json
import DiscordClient from './client/client';
import { Intents } from 'discord.js';
// const client = new DiscordClient({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });  // Original code
// const client = new DiscordClient({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] }); // This doesn't work properly
const client = new DiscordClient({
  intents: 32767,
});

(async () => {
  client.prefix = config.prefix || client.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(botTokenJson.token);
})();

export interface CMDInterface {
  //interface for help command
  cmdName: string,
  cmdDesc: string,
};
