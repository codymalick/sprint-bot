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
        .addIntegerOption(option =>
            option.setName('wordcount')
                .setDescription('Your word count at the start of the sprint')
                .setRequired(false))
        .addBooleanOption(option => 
            option.setName('notify')
                .setDescription('Notify the channel using @here that the sprint is starting')
                .setRequired(false)),

	async execute(interaction) {
        const minutes = interaction.options.getInteger('time')
        const toMs = (minutes) => minutes * 60 * 1000

        const wordCount = interaction.options.getInteger('wordcount')
        const notify = interaction.options.getBoolean('notify') ?? false
        const userId = interaction.user.id
        const channelId = interaction.guildId

        const isSprintActive = Sprint.checkForActiveSprint(channelId)

        if(isSprintActive)
        {
            interaction.reply({ content: `Looks like there's already an active sprint, Use \`/join\` to participate!`, ephemeral: true })
            return
        }

        const sprint = await Sprint.startSprint(interaction.user.id, minutes, channelId, wordCount)
        console.log(`Starting a ${minutes} minute sprint`)

        let message = `✍ ${mentionUser(userId)} is starting a ${formatMinutes(minutes)} sprint! ✍️`
        if(notify)
        {
            message = `@here ${message}`
        }
        if(wordCount)
        {
            message = `${message}\nStarting Word Count: ${mentionUser(userId)} ${wordCount}`
        }

        await interaction.reply(message)
        await wait(toMs(minutes))

        let completeMessage = `🎆 The sprint is complete! Participants: ${sprint.participants.map(participant => `${mentionUser(participant.username)}`)} 🎆`

        // sprint.participants.map((participant) => {
        //     if(participant.wordCount)
        //     {
        //         completeMessage = `${completeMessage}\n${mentionUser(participant.username)} ${participant.wordCount}`
        //     }
        // })

        await interaction.channel.send(completeMessage)
        Sprint.endSprint(channelId)
	},
};
