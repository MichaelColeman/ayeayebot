import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ahoy")
  .setDescription("Replies with Matey!");

export async function execute(interaction) {
  await interaction.reply("Matey!");
}
