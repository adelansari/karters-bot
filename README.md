# karters-bot

### A fan made discord bot for [The Karters](https://store.steampowered.com/app/488350/The_Karters/) racing game.  


![Alt](https://repobeats.axiom.co/api/embed/bd7eb4e8b8060eebde9935248cd77c0c33898e09.svg "Repobeats analytics image")  


## Dependencies
- [Typescript](https://www.typescriptlang.org/download),
- [ts-node](https://www.npmjs.com/package/ts-node),
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev),
- [Discord.js](https://discord.js.org/#/),

- Note: ts-node and typescript need to be installed globally for every dev team member. It is normally not recommended, but it is how this project works. `npm install -g ts-node`, `npm install -g typescript`

- Note: slappey may need to be installed globally for whoever generates the commands. `npm install -g slappey`

- Note: Run this project with `npx nodemon ./src/index.ts` during development.  



## Project Notes

Run `npm install` after cloning repo.
`npm run start` starts the bot

Make sure you check `index.ts` file in the root of src for which method of bot token you are using to login.

To run the bot, type `npm run dev` or `yarn dev`.

See the reusableMiscComponents folder directory for all bot data being globally used across different commands.


## Commands

⚙ Help Menu  

Followings are The Karter Bot commands. You can use `.help [command name]` to get more info (example: `.help characters`).  

```
Help Command:
.help           -  A list of help commands.

Game Commands:
.art            -  Pages of embeded game art gallary
.characters     -  Selection menu of game characters and embed pages of skins
.tracks         -  Show a list of all known tracks, use `.tracks list` to see the list.

Misc. Commands:
.memes          -  Random meme from some of the special moments.
.pickmemes      -  Random meme from some of the special moments, but you can choose a meme.

Mod Commands:
.verify         -  Verifying members with captcha.
.mod message    -  It send the user message as a bot after asking a series of questions.
.mod embed      -  It creates an embed after asking a series of questions.

```
