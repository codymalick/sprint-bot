const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const Sprint = require('../lib/sprint');
const { mentionUser, formatMinutes } = require('../lib/utils');
const client = require('../lib/client')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sprint')
		.setDescription('Set a timer for a writing sprint!')
        .addIntegerOption(option => 
            option.setName('time')
                .setDescription('Length of sprint (minutes)')
                .setRequired(true))
        // .addIntegerOption(option =>
            // option.setName('delay')
                // .setDescription('Delay before the start of the sprint (minutes)')
                // .setRequired(false)) 
        .addBooleanOption(option => 
            option.setName('notify')
                .setDescription('Notify the channel using @here that the sprint is starting')
                .setRequired(false)),

	async execute(interaction) {
        const minutes = interaction.options.getInteger('time')

        if(minutes > 14)
        {
            interaction.reply({ content: "Sorry, sprints can only be 14 minutes long currently!", ephemeral: true})
            return 
        }
        const toMs = (minutes) => minutes * 60 * 1000

        // const delay = interaction.options.getInteger('delay') ?? 0
        const notify = interaction.options.getBoolean('notify') ?? false
        const userId = interaction.user.id
        const channelId = interaction.guildId

        const isSprintActive = Sprint.checkForActiveSprint(channelId)

        if(isSprintActive)
        {
            interaction.reply({ content: `Looks like there's already an active sprint, Use \`/join\` to participate!`, ephemeral: true })
            return
        }

        const sprint = await Sprint.startSprint(interaction.user.id, minutes, channelId)
        console.log(`Starting a ${minutes} minute sprint`)

        if(notify)
        {
            // if(delay !== 0)
            // {
            //     await interaction.reply(`✍️ @here ${formatMinutes(minutes)} sprint starting in ${formatMinutes(delay)}! ✍️`)
            //     await wait(toMs(delay))
            //     await interaction.followUp(`Sprint starting!!`)
            // } else {
                await interaction.reply(`✍ @here ${mentionUser(userId)} is starting a ${formatMinutes(minutes)} sprint! ✍️`)
            // }

        } else {
            // if(delay !== 0)
            // {
                // await interaction.reply(`✍️ ${formatMinutes(minutes)} sprint starting in ${formatMinutes(delay)}! ✍️`)
                // await wait(toMs(delay))
                // await interaction.followUp(`Sprint starting!!`)
            // } else {
                await interaction.reply(`✍ ${mentionUser(userId)} is starting a ${formatMinutes(minutes)} sprint! ✍️`)
            // }
        }
        await wait(toMs(minutes))
		await interaction.followUp(`🎆 The sprint is complete! Participants: ${sprint.participants.map(id => mentionUser(id))} 🎆`)
        Sprint.endSprint(channelId)
	},
};
