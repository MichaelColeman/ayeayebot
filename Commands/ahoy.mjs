import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder().setName("ahoy").setDescription("Replies with Matey!");

async function execute(interaction) {
  await interaction.reply("Matey!");
}

export { data, execute };
