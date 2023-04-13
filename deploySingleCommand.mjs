import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "path";

//expose environment variables to this file
dotenv.config();

const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const commandPath = path.join(__dirname, "commands/ahoy.mjs");

// Construce and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

import(pathToFileURL(commandPath)).then((command) => {
  const commandJSON = command.data.toJSON();

  if ("data" in command && "execute" in command) {
    console.log(commandJSON);
    console.log(command);
  } else {
    console.log(`[WARNING] The command at is missing a required "data" or "execute" property.`);
  }

  (async () => {
    try {
      console.log(`Starting deployment..`);
      const data = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
        body: [commandJSON],
      });
      console.table(data);
    } catch (error) {
      console.log(error);
    }
  })();
});

// (async () => {
//   const command = import(filePath)
//   console.log(command)
// })();
