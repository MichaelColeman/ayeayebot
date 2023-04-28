import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("p")
  .setDescription("use /p to let AyeAyebot know that you are talking to them!");

async function execute(interaction) {
  await interaction.reply("generating piratey response...");
}
export { data, execute };
