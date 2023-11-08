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

    async startSprint(user, length, channelId, wordCount)
    {
        const sprint = {
            name: channelId,
            length: length,
            participants: [
                { 
                    username: user,
                    wordCount: wordCount 
                }
            ]
        }

        this.activeSprints.set(channelId, sprint)
        return sprint
    }

    endSprint(channelId)
    {
        this.activeSprints.delete(channelId)
        console.log(this.activeSprints)
    }

    checkForActiveSprint(channelId)
    {
        const activeSprint = this.activeSprints.get(channelId)

        if(activeSprint === null || activeSprint === undefined)
        {
            return false
        }

        return true
    }

    checkForActiveParticipants(userId, participants)
    {
        participants.forEach((participant) => {
            if(participant.username === userId) return true
        })

        return false
    }

    joinActiveSprint(sprintId, userId, wordCount)
    {
        const sprint = this.activeSprints.get(sprintId.toString())

        if(sprint === null || sprint === undefined)
        {
            console.log("Invalid sprint id")
            console.log(sprintId, userId)
            return false
        }

        const participating = this.checkForActiveParticipants(userId, sprint.participants)
        if(!participating)
        {
            sprint.participants.push({ username: userId, wordCount: wordCount })
            return true
        }

        return false
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