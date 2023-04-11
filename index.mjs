import fs from "node:fs";
import path from "node:path";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config(); //load environment variables
const __filename = fileURLToPath(import.meta.url); //get file path to this file
const __dirname = path.dirname(__filename); //use file path to get files directory

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

await client.login(process.env.DISCORD_TOKEN);

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".mjs"));

if (commandFiles.length === 0) {
  console.error("commandFiles array is empty");
} else {
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const fileURL = new URL(`file://${filePath}`);
    import(fileURL)
      .then((result) => {
        if ("data" in result && "execute" in result) {
          console.log(`adding command in ${file}`);
          client.commands.set(result.data.name, result);
        } else {
          console.log(`[Warning] The command at ${filePath} is missing a required "data" or "execute" property`);
        }
      })
      .catch((error) => {
        console.log(`import error at ${filePath}: ${error}`);
      });
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`no command matching ${interaction.commandName} was found`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "there was an error while executing this command!", ephemeral: true });
    } else {
      await interaction.reply({ content: "there was an error while executing this command!", ephemeral: true });
    }
  }
  console.log(interaction);
});
