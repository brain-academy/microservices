import Discord, {MessageReaction, TextChannel} from 'discord.js'
import {EventPort} from 'event-domain'
import config from '../config.json'

const PLAYERS_REGEX = /.*joueurs maximum.*/
const MAXIMUM_PLAYERS_REGEX = /(\d+)[^,.\d\n]+?(?=(joueurs maximum))/

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(config.token)

client.once('ready', () => {
    console.log('discord-client is ready...')
    return client.channels.fetch(config.botc_irl_channel)
        .then(channel => (<TextChannel>channel).messages.fetch({limit: 10}))
})
client.on('messageReactionAdd', ({message, emoji: {name}}, user) => {
    if(name === '✅') {
        console.log({message: message.embeds})
        const maxPlayersCount = getMaxPlayers(message.embeds[0].description || '')
        let reactions = message.reactions.cache.array();
        (reactions
            .find(reaction => reaction.emoji.name === '✅') as MessageReaction).users
            .fetch()
            .then(users => {
                if(users.size - 1 > maxPlayersCount)
                    user.send(`Hello ${user.username} !\nDésolé, mais le nombre maximal de ${maxPlayersCount} participants prévu pour cet événement est déjà atteint... :sob:\nTu es néanmoins placé sur la liste d'attente et passera en liste principale si une place venait à se libérer. :fingers_crossed: Tu peux éventuellement contacter l'organisateur de l'événement pour savoir s'il peut te faire une place.`)
            })
    }
})

const getMaxPlayers: (message: string) => number = (message: string) => +(message.match(PLAYERS_REGEX)?.[0].match(MAXIMUM_PLAYERS_REGEX)?.[0] || Number.MAX_VALUE)

export class DiscordClient implements EventPort {

    postInvite(message: string): void {
        client.channels.fetch(config.botc_irl_channel)
            .then(channel => (<Discord.TextChannel>channel).send(message))
    }

}
