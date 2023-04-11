import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("translate")
  .setDescription("Translate yer message into a pirate slang, matey!");

export async function execute(interaction) {
  await interaction.reply("pirate translated text");
}
