import Discord, {Guild, Intents, TextChannel} from 'discord.js'
import {DayOfWeek, User, UserPort} from 'user-domain'
import {DiscordPort} from 'user-domain/src/discord-port'
import {UserSearch} from 'user-domain/src/user'
import {v4} from 'uuid/interfaces'
import config from '../config.json'
import {getBotcSubscriptions} from './botc-subscription'
import mapGuildMember, {mapDiscordRole} from './user-mapper'

const intents = new Intents([
	"GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS",
])
const client = new Discord.Client({ws: {intents}})
client.login(config.token)

client.on('ready', () => {
	console.log('discord-client is ready...')
	client.guilds.fetch(config.server_id)
		.then(g => {
			g.roles.fetch()
				.then(_ => {
					guild = g
					return guild.members.fetch()
				})
				.then(members => {
					members.reduce((acc, user) => {
						return acc.set(user.id, user)
					}, users)
				})
		})
})

let users: Map<string, Discord.GuildMember> = new Map()
let guild: Guild

export class DiscordClient implements UserPort, DiscordPort {

	findAll(): Promise<User[]> {
		return Promise.resolve(Array.from(users.values()).map(discordUser => ({
			...mapGuildMember(discordUser),
			roles: discordUser.roles.cache.map(mapDiscordRole)
		})
		))
	}
	find(id: string): Promise<User> {
		const discordUser = users.get(id) ?? throwExpression("failed")
		const user: User = {...mapGuildMember(discordUser), roles: discordUser.roles.cache.map(mapDiscordRole)}
		return Promise.resolve(user)
	}
	search(userSearch: UserSearch): Promise<User[]> {
		throw new Error('Method not implemented.')
	}
	getBotcSubscriptions(): Promise<Map<DayOfWeek, User[]>> {
		return client.channels.fetch(config.botc_irl_channel)
			.then(channel => (<TextChannel>channel).messages.fetch({limit: 1}))
			.then(messages => getBotcSubscriptions(messages.array()[0]))
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
	sendDM(id: string, message: string): void {
		users.get(id)?.send(message)
	}

}

function throwExpression(message: string): never {
	throw new Error(message)
}
