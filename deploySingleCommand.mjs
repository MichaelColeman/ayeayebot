import { fileURLToPath, pathToFileURL } from "node:url";
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const commandPath = path.join(__dirname, "commands/p.mjs");

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

import(pathToFileURL(commandPath)).then((command) => {
  let commandJSON = "";

  if ("data" in command && "execute" in command) {
    commandJSON = command.data.toJSON();
  } else {
    console.log(`[WARNING] The command at is missing a required "data" or "execute" property.`);
  }

  (async () => {
    try {
      console.log(`Starting deployment..`);

      if (!commandJSON) {
        return;
      }

      const data = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
        body: [commandJSON],
      });

      console.table(data);
    } catch (error) {
      console.log(error);
    }
  })();
});
