import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config(); //load environment variables
const __filename = fileURLToPath(import.meta.url); //get file path to this file
const __dirname = path.dirname(__filename); //use file path to get files directory

//grab all command files from the commands directory
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".mjs"));

const myPromise = new Promise((resolve, reject) => {
  const commands = [];
  for (const file of commandFiles) {
    const filePath = `file:\\\\\\` + path.join(commandsPath, file);
    import(filePath)
      .then((command) => {
        // console.log(command.data.toJSON());
        commands.push(command.data.toJSON());
        //commands is empty!!
      })
      .catch((error) => console.log(`error at ${filePath}: ${error}`));
  }
  resolve(commands);
});

myPromise.then((value) => {
  console.log(value);
});

//construct an instance of the rest module
// const rest = new REST().setToken(process.env.DISCORD_TOKEN);

//deploy commands
// (async () => {
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
