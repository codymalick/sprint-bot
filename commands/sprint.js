const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;


module.exports = {
	data: new SlashCommandBuilder()
		.setName('sprint')
		.setDescription('Set a timer for a writing sprint!')
        .addIntegerOption(option => 
            option.setName('time')
                .setDescription('Length of sprint (minutes)')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('delay')
                .setDescription('Delay before the start of the sprint (minutes)')
                .setRequired(false)) 
        .addBooleanOption(option => 
            option.setName('notify')
                .setDescription('Notify the channel using @here that the sprint is starting')
                .setRequired(false)),

	async execute(interaction) {
        const minutes = interaction.options.getInteger('time')
        const toMs = (minutes) => minutes * 60 * 1000

        const delay = interaction.options.getInteger('delay') ?? 0
        const notify = interaction.options.getBoolean('notify') ?? false

        console.log(`Starting a ${minutes} minute sprint`)
        if(notify)
        {
            if(delay !== 0)
            {
                await interaction.reply(`@here a ${minutes} minute(s) sprint is starting in ${minutes} minutes(s)`)
                await wait(toMs(minutes))
                await interaction.followUp(`Sprint starting!!`)
            } else {
                await interaction.reply(`@here starting ${minutes} minute(s) sprint!`)
            }

        } else {
            if(delay !== 0)
            {
                await interaction.reply(`Starting a ${minutes} minute(s) sprint is starting in `)
                await wait(toMs(minutes))
                await interaction.followUp(`Sprint starting!!`)
            } else {
                await interaction.reply(`Starting ${minutes} minute(s) sprint!`)
            }
        }
        await wait(toMs(minutes))
		await interaction.followUp('The sprint is complete!')
	},
};
