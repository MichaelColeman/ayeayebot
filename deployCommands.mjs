import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

//expose environment variables
dotenv.config();

//get current file path and directory
const __filename = import.meta.url;
const __dirname = path.dirname(__filename);

//grab all command files from the commands directory
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".mjs"));

//create an array of import statements that the promise.all method can call.
const importCommands = commandFiles.map((commandFile) => {});

// for (const file of commandFiles) {
//   console.log(file);

//   const filePath = `file:\\\\\\` + path.join(commandsPath, file);
//   console.log(filePath);
//     import(filePath)
//       .then((command) => {
//         // console.log(command.data.toJSON());
//         commands.push(command.data.toJSON());
//         //commands is empty!! WTF. async problem
//       })
//       .catch((error) => console.log(`error at ${filePath}: ${error}`));
// }

//construct an instance of the rest module
// const rest = new REST().setToken(process.env.DISCORD_TOKEN);

//deploy commands
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
