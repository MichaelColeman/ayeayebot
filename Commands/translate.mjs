import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("translate")
  .setDescription("Translate yer message into a pirate slang, matey!");

async function execute(interaction) {
  await interaction.reply("pirate translated text");
}

export { data, execute };
