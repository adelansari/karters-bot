// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-interactionCreate
import { Interaction } from "discord.js";
import wait from "timers/promises";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import { GlobalLinks } from '../reusableMiscComponents/GlobalLinks';
import * as path from 'path';

export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super("interactionCreate");
  }

  async run(client: DiscordClient, interaction: Interaction) {
    const memeFilePath = GlobalLinks.memesUrl as string;
    const memeImgDir:string = path.join(__dirname, `.${memeFilePath}`);
    console.log(memeImgDir)

    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === "memeSelect") {
      // await interaction.update({ content: 'Something was selected!', components: [] });
      await interaction.deferUpdate();
      await wait.setTimeout(4000);
      console.log(interaction.values[0]);
      await interaction.editReply({
        content: `You have selected ${interaction.values[0]}`,
        // components: [],
      });
    }
  }
}
