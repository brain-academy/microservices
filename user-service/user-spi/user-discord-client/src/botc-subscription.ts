import {Message, MessageReaction} from 'discord.js'
import {DayOfWeek, User} from 'user-domain'
import {mapDiscordUser} from './user-mapper'

export function getBotcSubscriptions(message: Message): Promise<Map<DayOfWeek, User[]>> {
    const days = fromMessage(message)
    const reactions = message.reactions.cache.array()
    const emojis = reactions.map(reaction => reaction.emoji.name)
    if (days.length > 1 && emojis.includes('good'))
        throw new Error(':good: emote alors que le message contient plusieurs jours d\'invitation possibles')
    if (days.length === 1 && !emojis.includes('good'))
        throw new Error('Un seul jour d\'invitation et pas d\'emote :good:')
    if (days.length === 1) {
        return (reactions
            .find(reaction => reaction.emoji.name === 'good') as MessageReaction).users
            .fetch()
            .then(users => users.array().map(user => mapDiscordUser(user)))
            .then(users => new Map([[days[0], users]]))
    } else {
        return reactions
            .reduce((acc, {emoji, users}) => {
                const day = emojiToDayOfWeek(emoji.name)
                if (!day) return acc
                return acc.then(map => users.fetch().then(users => map.set(day as DayOfWeek, users.array().map(users => mapDiscordUser(users)))))
            }, Promise.resolve(new Map<DayOfWeek, User[]>()))
    }
}

function emojiToDayOfWeek(emoji: string): DayOfWeek | null {
    switch (emoji) {
        case 'regional_indicator_L':
            return DayOfWeek.MONDAY
        case 'regional_indicator_M':
            return DayOfWeek.TUESDAY
        case 'regional_indicator_C':
            return DayOfWeek.WEDNESDAY
        case 'regional_indicator_J':
            return DayOfWeek.THURSDAY
        case 'regional_indicator_V':
            return DayOfWeek.FRIDAY
        case '250pxBMR_Logo':
            return DayOfWeek.SATURDAY
        case '250pxTB_Logo':
            return DayOfWeek.SUNDAY
        default:
            return null
    }
}

function fromMessage({content}: Message): DayOfWeek[] {
    return Object.values(DayOfWeek)
        .filter(key => content.includes(key))
}
