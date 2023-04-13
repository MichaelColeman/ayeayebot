import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const commandID = "1092204791427502172";

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// for guild-based commands
rest
  .delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, commandID))
  .then(() => console.log("Successfully deleted guild command"))
  .catch(console.error);

// for global commands

// rest
//  .delete (Routes.applicationCommand(process.env.CLIENT_ID, commandID))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);
