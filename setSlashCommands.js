const { REST, Routes } = require('discord.js')
require('dotenv').config()

const commands = [
  {
    name: 'pirate',
    description: 'Replies with a pirate translation of whatever message you send to it.',
  },
]

if (!process.env.DISCORD_TOKEN) {
  console.log('token not found')
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

console.log(process.env.DISCORD_TOKEN)
;(async () => {
  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
})()
