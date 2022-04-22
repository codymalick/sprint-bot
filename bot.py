from discord import Client, Intents
from discord_slash import SlashCommand, SlashContext
from sprint import Sprint
import os
import time

class Bot(Client):
    async def on_ready(self):
        print("Logged on as {0}".format(self.user))

    async def on_message(self, message):
        if message.author == self.user:
            return
        
        if message.content.startswith('$hello'):
            await message.channel.send('Hello!')


# A bit weird, but it's what's needed to get the libraries working
client = Bot(intents=Intents.default())
slash = SlashCommand(client, sync_commands=True)
GUILD = int(os.getenv('GUILD'))
sprints = {}

# Slash commands
@slash.slash(name="sprint", description="Start a writing sprint!", guild_ids=[GUILD])
async def sprint(ctx: SlashContext):
    sprint = sprints.get(GUILD)

    if(sprint):
       return await ctx.send('Sprint already started!')

    sprints[GUILD] = Sprint()
    
    await ctx.send(
        '''
        Sprint starting starts at {0}!\n
        Current participants: {1}\n
        Spring ending time: {2}! Get writing!!!
        '''.format(sprints[GUILD].start_time, "--> it's me beech", sprints[GUILD].end_time)
    )

