import { registerCommands, registerEvents } from "./utils/registry";
import config from "../slappey.json";
/**
 * @botTokenJson - keep this line commented out during production
 */
import botTokenJson from "./botToken.json"; // keep this hidden inside src/botToken.json

import DiscordClient from "./client/client";
import { Intents } from "discord.js";
// import dotenv from "dotenv"; //login for heroku environment
import { readConfigFile } from "typescript";
// dotenv.config() //login for heroku environment


// const client = new DiscordClient({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });  // Original code

// The number 32767 means ALL_INTENTS. There are 15 Intents in total.
// GUILDS, GUILD_MEMBERS, GUILD_BANS, GUILD_EMOJIS_AND_STICKERS, GUILD_INTEGRATIONS, GUILD_WEBHOOKS, GUILD_INVITES, 
// GUILD_VOICE_STATES, GUILD_PRESENCES, GUILD_MESSAGES, GUILD_MESSAGE_REACTIONS, GUILD_MESSAGE_TYPING, DIRECT_MESSAGES, DIRECT_MESSAGE_REACTIONS, DIRECT_MESSAGE_TYPING
const client = new DiscordClient({
  intents: 32767,
});

(async () => {
  client.prefix = config.prefix || client.prefix;
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");

  /**
   * Login with botTokenJson.token during development
   * Login with process.env.TOKEN during production
   */
  await client.login(botTokenJson.token);
  // await client.login(process.env.TOKEN);
})();

// export interface CMDInterface {
//   //interface for help command
//   cmdName: string;
//   cmdDesc: string;
// }
