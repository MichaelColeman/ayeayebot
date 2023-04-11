import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("translate")
  .setDescription(
    "Aye, ye be needin' me to translate yer message into the language of the high seas! I'll do me best to give ye a pirate's tongue."
  );

export async function execute(interaction) {
  await interaction.reply("pirate translated text");
}
