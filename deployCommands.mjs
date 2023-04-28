import { fileURLToPath, pathToFileURL } from "node:url";
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "path";

dotenv.config();

//make array of command  from the commands directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".mjs"));

const commands = [];
//create a array of command json
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  console.log(filePath);
  await import(pathToFileURL(filePath))
    .then((command) => {
      console.log(command.data.toJSON());
      commands.push(command.data.toJSON());
    })
    .catch((error) => console.log(`error at ${filePath}: ${error}`));
}

// // construct an instance of the rest module
// const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// // deploy commands
// (async () => {
//   console.log(commands);
//   try {
//     console.log(`started refreshing ${commands.length} application (/) commands.`);
//     console.log(`commands: ${commands}`);
//     //put method fully refreshes all commands in the guild
//     // const data = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILDID), {
//     //   body: commands,
//     // });
//     // console.log(`reloaded ${data.length} application (/) commands`);
//   } catch (error) {
//     console.error(error);
//   }
// })();
