import Discord, {Guild, GuildMember, Intents, TextChannel} from 'discord.js'
import {DayOfWeek, User, UserPort} from 'user-domain'
import {BotcPort} from 'user-domain/src/botc-port'
import {UserSearch} from 'user-domain/src/user'
import {v4} from 'uuid/interfaces'
import config from '../config.json'
import {getBotcSubscriptions} from './botc-subscription'
import mapGuildMember from './user-mapper'

const intents = new Intents([
    "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", // lets you request guild members (i.e. fixes the issue)
])
const client = new Discord.Client({ws: {intents}})
client.login(config.token)

client.on('ready', () => {
    client.guilds.fetch(config.server_id)
        .then(g => {
            guild = g
            return guild.members.fetch()
        })
        .then(members => users = [...users, ...members])
})

let users: ([string, GuildMember])[] = []
let guild: Guild

export class DiscordClient implements UserPort, BotcPort {

    findAll(): Promise<User[]> {
        return Promise.resolve(users.map(mapGuildMember))
    }
    find(id: v4): Promise<User> {
        throw new Error('Method not implemented.')
    }
    search(userSearch: UserSearch): Promise<User[]> {
        throw new Error('Method not implemented.')
    }
    getBotcSubscriptions(): Promise<Map<DayOfWeek, User[]>> {
        return client.channels.fetch(config.botc_irl_channel)
            .then(channel => (<TextChannel>channel).messages.fetch({limit: 2}))
            .then(messages => getBotcSubscriptions(messages.array()[1]))
    }
    create(user: User): Promise<v4 | undefined> {
        throw new Error('Method not implemented.')
    }
    update(id: v4, user: User): void {
        throw new Error('Method not implemented.')
    }
    delete(id: v4): void {
        throw new Error('Method not implemented.')
    }

}
