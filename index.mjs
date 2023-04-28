import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { fileURLToPath, pathToFileURL } from "url";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

//load environment variables
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.commands = new Collection();
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const commandsPath = path.join(dirName, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".mjs"));

for (const file of commandFiles) {
  const fileURL = pathToFileURL(path.join(commandsPath, file));

  await import(fileURL)
    .then((command) => {
      if (!command) {
        console.log("command not found");
      }
      if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(`[WARNING] The command at ${fileURL} is missing a required "data" or "execute" property.`);
      }
    })
    .catch((error) => console.log(error));
}
console.table(client.commands);

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

await client.login(process.env.DISCORD_TOKEN).catch((error) => {
  console.log(`Client login error: ${error}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    console.log(interaction);
    const command = client.commands.get(interaction.commandName);

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
  } catch (error) {
    console.log(`big error here ${error}`);
  }
});

//
// AI STUFF
//

client.on("messageCreate", async (message) => {
  if (!message.mentions.has(client.user)) {
    return;
  }
  const userMessage = message.content.replace(/<.*?>/, "").trim();
  // await message.reply(`generating reponse to "${userMessage}"...`);

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_TOKEN,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "you are a happy, helpful, drunken pirate who speaks with thick pirate slang. stay within 2000 characters in your response, please!",
        },
        { role: "user", content: userMessage },
      ],
    });

    await message.react("👋");
    await message.reply(completion.data.choices[0].message.content);
    // console.log(completion.data.choices[0].message.content);
  } catch (error) {
    console.log(error);
  }
});
