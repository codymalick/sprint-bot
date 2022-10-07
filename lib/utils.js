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

module.exports = {
    mentionUser,
    formatMinutes
}