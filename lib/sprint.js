const fs = require('fs')
const readline = require('node:readline')

class Sprinter
{
    namePath = "resources/authors.txt"
    activeSprints = new Map()
    
    constructor()
    {
        console.log("Initializing Sprinter")
    }

    async readFileLine(path, random)
    {
        const fileStream = fs.createReadStream(path)

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        })

        
        let index = 0
        for await (const line of rl)
        {
            if(index === random)
            {
                return line
            }
            index++
        }
    }

    async getName()
    {
        const random = Math.floor(Math.random() * 419) // length of authors file, for simplicity
        
        return random
    }

    async startSprint(user, length, channelId)
    {
        const sprint = {
            name: channelId,
            length: length,
            participants: [user]
        }

        this.activeSprints.set(channelId, sprint)
        return sprint
    }

    endSprint(channelId)
    {
        this.activeSprints.delete(channelId)
        console.log(this.activeSprints)
    }

    joinActiveSprint(sprintId, userId)
    {
        const sprint = this.activeSprints.get(sprintId.toString())

        if(sprint === null || sprint === undefined)
        {
            console.log("Invalid sprint id")
            console.log(sprintId, userId)
            return
        }

        if(!sprint.participants.includes(userId))
        {
            sprint.participants.push(userId)
        }
    }
}

class SprintManager
{
    constructor()
    {
        throw new Error('Use getInstance()')
    }

    static getInstance()
    {
        if (!SprintManager.instance)
        {
            SprintManager.instance = new Sprinter()
        }
        return SprintManager.instance;
    }
}

module.exports = SprintManager.getInstance();