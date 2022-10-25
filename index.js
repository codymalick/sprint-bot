// https://discordjs.guide/creating-your-bot/#creating-configuration-files
// Require the necessary discord.js classes
const fs = require('node:fs')
const path = require('node:path')
const client = require('./lib/client')
const { Collection } = require('discord.js');
const { token } = require('./config.json');

client.commands = new Collection()

// Collect valid commands
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for(const file of commandFiles)
{
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)

	// Set a new item in the Collection
	client.commands.set(command.data.name, command)
}

// Set up event handlers
const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for(const file of eventFiles)
{
	const filePath = path.join(eventsPath, file)
	const event = require(filePath)
	if(event.once)
	{
		client.once(event.name, (...args) => event.execute(...args))
	} else {
		client.on(event.name, (...args) => event.execute(...args))
	}
}

// Login to Discord with your client's token
client.login(token);

module.exports = {
	client
}