const { SlashCommandBuilder } = require('discord.js');
const Sprint = require('../lib/sprint');
const { mentionUser } = require('../lib/utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('join a sprint')
		.addIntegerOption(option =>
            option.setName('wordcount')
                .setDescription('Your word count at the start of the sprint')
                .setRequired(false)),

	async execute(interaction) {
        const id = interaction.guildId
        const userId = interaction.user.id
		const wordCount = interaction.options.getInteger('wordcount')

        const joined = Sprint.joinActiveSprint(id, userId, wordCount)

		if(!joined) {
			interaction.reply({ content: `Couldn't join sprint`, ephemeral: true})
			return
		}
		
        console.log(`${mentionUser(userId)} joined sprint ${id}`)

		let message = `${mentionUser(userId)} joined the sprint!`

		if(wordCount)
		{
			message = `${message}\nStarting Word Count: ${mentionUser(userId)} ${wordCount}`
		}

		await interaction.reply(message)
	},
};
