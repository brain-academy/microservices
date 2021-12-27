import Discord, {GuildMember} from 'discord.js'
import {Role, User} from 'user-domain'

export default function mapGuildMember({id, displayName, user: {username, avatar}}: GuildMember): User {
	return new User(username, {username: displayName, id: id, avatar})
}

export function mapDiscordRole(role: Discord.Role): Role {
	return {name: role.name}
}

export function mapDiscordUser(user: Discord.User): User {
	return new User(user.username, {username: user.username, id: user.id, avatar: user.avatar})
}
