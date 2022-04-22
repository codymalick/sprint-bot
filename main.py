# sprint-bot, a bot for writing!
import bot
import os

def main():
    print("I'm a bot beep boop")
    bot.client.run(os.getenv('TOKEN'), bot=True)

if __name__ == "__main__":
    main()