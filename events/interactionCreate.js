async function handleInteractionCreate(interaction)
{
    if(!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName)

	if(!command) return

	try {
		await command.execute(interaction)
	} catch (error)
	{
		console.error(error)
		await interaction.reply( { content: 'Whoops, something broke while running this command!', ephemeral: true })
	}
}

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        handleInteractionCreate(interaction)
    }
};