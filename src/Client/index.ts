import { Client, Collection } from 'discord.js';
import path from 'path';
import { readdirSync } from 'fs';
import { Command, Event, Config } from '../Interfaces';
import { PrefixConfig, TokenConfig } from '../Interfaces/Config';
import botTokenJson from '../botToken.json'; //keep this hidden inside src/botToken.json
import configJson from '../config.json';

class ExtendClient extends Client {

    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public botToken: Config<TokenConfig> = botTokenJson;
    public config: Config<PrefixConfig> = configJson;
    public aliases: Collection<string, Command> = new Collection();

    public async init() {
        this.login(this.botToken.bot_token);
    

        /* Commands */
        const commandPath = path.join(__dirname, "..", "Commands");
        readdirSync(commandPath).forEach((dir) => {

            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'));

            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`)
                this.commands.set(command.name, command);

                if(command?.aliases.length !== 0) {
                    command.aliases.forEach((alias) => {

                        this.aliases.set(alias, command);
                        
                    });
                };
            };

        });

        /* Events */
        const eventPath = path.join(__dirname, "..", "Events");
        readdirSync(eventPath).forEach(async (file) => {

            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            console.log(event);
            this.on(event.name, event.run.bind(null, this))
        });
    };
};

export default ExtendClient;