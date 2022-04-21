# sprint-bot, a bot for writing!
from discord import Client, Intents
from discord_slash import SlashCommand, SlashContext
import os

client = Client(intents=Intents.default())
slash = SlashCommand(client, sync_commands=True)
GUILD = int(os.getenv('GUILD'))

async def on_ready():
    print("Logged on as {0.user}".format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return
    
    if message.content.startswith('$hello'):
        await message.channel.send('Hello!')

@slash.slash(name="sprint", description="Start a writing sprint!", guild_ids=[GUILD])
async def sprint(ctx: SlashContext):
    message = "Sprint starting soon!!"
    await ctx.send(message)

def main():
    print("I'm a bot beep boop")
    client.run(os.getenv('TOKEN'), bot=True)

if __name__ == "__main__":
    main()