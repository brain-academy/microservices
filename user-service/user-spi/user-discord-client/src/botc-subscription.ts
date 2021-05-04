import {Message, MessageReaction} from 'discord.js'
import {DayOfWeek, User} from 'user-domain'
import {mapDiscordUser} from './user-mapper'

export function getBotcSubscriptions(message: Message): Promise<Map<DayOfWeek, User[]>> {
    const days = fromMessage(!!message.content ? message.content : message.embeds[0].description || '')
    const reactions = message.reactions.cache.array()
    const emojis = reactions.map(reaction => reaction.emoji.name)
    console.log({days, emojis})
    if (days.length > 1)
        console.log(`Plusieurs jours trouvés dans le message d'invitation. Impossible de déterminer quel est le jour d'invitation.`)
    if (days.length === 1 && !emojis.includes('✅'))
        console.log('Un seul jour d\'invitation et pas d\'emote :✅:')
    if (days.length === 1) {
        return (reactions
            .find(reaction => reaction.emoji.name === '✅') as MessageReaction).users
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

function fromMessage(content: string): DayOfWeek[] {
    return Object.values(DayOfWeek)
        .filter(key => content.includes(key))
}
