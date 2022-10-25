const { Client, GatewayIntentBits, Collection } = require('discord.js');

class DiscordClient
{
    constructor()
    {
        throw new Error('Use get()')
    }

    static get()
    {
        if(!DiscordClient.instance)
        {
            console.log("Initializing client...")
            DiscordClient.instance = new Client({ intents: [GatewayIntentBits.Guilds]})
        }

        return DiscordClient.instance
    }
}

module.exports = DiscordClient.get()