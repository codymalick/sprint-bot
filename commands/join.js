const { SlashCommandBuilder } = require('discord.js');
const Sprint = require('../lib/sprint');
const { mentionUser } = require('../lib/utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('join a sprint'),

	async execute(interaction) {
        const id = interaction.guildId
        const userId = interaction.user.id
        Sprint.joinActiveSprint(id, userId)

        console.log(`${mentionUser(userId)} joined sprint ${id}`)

		await interaction.reply(`${mentionUser(userId)} joined the sprint!`)
	},
};
