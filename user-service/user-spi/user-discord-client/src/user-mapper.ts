import Discord, {GuildMember} from 'discord.js'
import {Role, User} from 'user-domain'

export default function mapGuildMember({id, displayName, roles}: GuildMember): User {
    return new User(displayName, {username: displayName, id: id})
}

export function mapDiscordRole(role: Discord.Role): Role {
	return {name: role.name}
}

export function mapDiscordUser(user: Discord.User): User {
    return new User(user.username, {username: user.username, id: user.id})
}
