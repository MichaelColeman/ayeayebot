import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("p")
  .setDescription("use /p to let AyeAyebot know that you are talking to them!");

export async function execute(interaction) {
  await interaction.reply("Piratey reply");
}
