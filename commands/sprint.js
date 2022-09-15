const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('sprint')
		.setDescription('Set a timer for a writing sprint!')
        .addIntegerOption(option => 
            option.setName('time')
                .setDescription('Length of sprint in minutes')
                .setRequired(true)),

	async execute(interaction) {
        const minutes = interaction.options.getInteger('time')
        const seconds = minutes * 60 // minutes * 60

        console.log(`Starting a ${minutes} minute sprint`)
        await interaction.reply(`Starting ${minutes} minute(s) sprint!`)

        await new Promise(resolve => setTimeout(resolve, seconds * 1000))
		await interaction.followUp('The sprint is complete!')
	},
};
