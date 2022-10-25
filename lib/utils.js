function mentionUser(userId)
{
    return `<@${userId}>`
}

function formatMinutes(minutes)
{
    if (minutes === 1)
    {
        return `${minutes} minute`
    }

    return `${minutes} minute`
}

function handleError(error)
{
    console.log(`Error: ${JSON.stringify(error)}`)
}

module.exports = {
    mentionUser,
    formatMinutes,
    handleError
}