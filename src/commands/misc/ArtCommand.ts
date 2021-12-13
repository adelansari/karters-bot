import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import * as path from 'path';
import * as fs from 'fs';

/**
 * @ArtCommand - Display art related to The Karters and send
 * as a message. -ProBoz
 * 
 * In memory of 001 Abstract Ingenuity, the i01 bot
 */

export default class ArtCommand extends BaseCommand {
  constructor() {
    super('art', 'misc', [], "Random game art.");
  };

  async run(client: DiscordClient, message: Message, args: Array<string>) {

    const artFilePath = "/assets/gameArt/" as string; //update this string if file path changes
    const imageDir:string = path.join(__dirname, `.${artFilePath}`)  // saving the gameArt path and correcting it
    const artCollection = fs.readdirSync(imageDir); // reading the "images" folder and saving the file names in an array.

    let previousArt: Array<string> = []; //store previous shown art here
    let decision = 0 as number; //the decision index

    let selector = Math.floor(Math.random() * artCollection.length) as number;
    let selectorString = selector.toString() as string;

    while (previousArt.includes(selectorString)) {

        selector = Math.floor(Math.random() * artCollection.length);

    };

    if (previousArt.length > Math.floor(artCollection.length/2)) {

        previousArt.shift();
        previousArt.push(selectorString);

    } else {

        previousArt.push(selectorString);

    };

    // console.log(`The SelectorString: ${selectorString}`); //debug selector string number
    decision = Number(selectorString) as number;
    // console.log(`The decision: ${decision}`); //debug decision number

    // console.log(artCollection[decision]);
    
    switch (artCollection[decision]) {
      /**
       * Update this switch so that each file has its own message with embed.
       */
      case 'BeachTrack_01.png':
        const artEmbed01 = new MessageEmbed()
          .setColor("DARK_AQUA")
          .setDescription(`Soak up the sun on this beach island getaway racetrack! Watch out for the crabs they like to snap away at those tires.`)
        message.channel.send({ embeds: [artEmbed01] });
        break;

      case 'BeachTrack_02.png':
        const artEmbed02 = new MessageEmbed()
          .setColor("DARK_AQUA")
          .setDescription(`Soak up the sun on this beach island getaway racetrack! This is a nice curve to drift on in front of the big conch shell.`);
        message.channel.send({ embeds: [artEmbed02] });
        break;

      case 'BeachTrack_03.png':
        const artEmbed03 = new MessageEmbed()
          .setColor("DARK_AQUA")
          .setDescription(`Soak up the sun on this beach island getaway racetrack!`)
        message.channel.send({ embeds: [artEmbed03] });
        break;

      case 'Molten Mile-min.jpg':
        const artEmbed04 = new MessageEmbed()
          .setColor("DARK_AQUA")
          .setDescription(`Be careful how you drift on these corners, you wouldn't want to fall into the lava.`)
        message.channel.send({ embeds: [artEmbed04] });
        break;
      
      case 'vulcano_art_design_concept_11_archways-min.jpg':
        const artEmbed05 = new MessageEmbed()
          .setColor("DARK_AQUA")
          .setDescription(`Molten Mile archways art concept.`)
        message.channel.send({ embeds: [artEmbed05] });
        break;
      
      case 'vulcano_art_enviro_concept_b_dragon-min.jpg':
        const artEmbed06 = new MessageEmbed()
          .setColor("DARK_AQUA")
          .setDescription(`Live dragons on the Molten Mile!`)
        message.channel.send({ embeds: [artEmbed06] });
        break;

      case 'vulcano_art_enviro_concept_c_gate-min.jpg':
        const artEmbed07 = new MessageEmbed()
          .setColor("DARK_AQUA")
          .setDescription(`Enter if you dare on the Molten Mile!`)
        message.channel.send({ embeds: [artEmbed07] });
        break;

      case 'vulcano_art_enviro_concept_d_drop-min.jpg':
        const artEmbed08 = new MessageEmbed()
          .setColor("DARK_AQUA")
          .setDescription(`Tiki statue on the Molten Mile!`)
        message.channel.send({ embeds: [artEmbed08] });
        break;

      case 'vulcano_art_model_concept_12_trap_trunk-min.jpg':
        const artEmbed09 = new MessageEmbed()
          .setColor("DARK_AQUA")
          .setDescription(`Watch out for this trap trunk!`)
        message.channel.send({ embeds: [artEmbed09] });
        break;

      case 'vulcano_art_model_concept_13_trap_axe-min.jpg':
        const artEmbed10 = new MessageEmbed()
          .setColor("DARK_AQUA")
          .setDescription(`Watch out for this swinging axe trap!`)
        message.channel.send({ embeds: [artEmbed10] });
        break;
    
      default:
        break;
    };

    message.channel.send({ files: [`${__dirname}${artFilePath}${artCollection[decision]}`] });

  };
};
