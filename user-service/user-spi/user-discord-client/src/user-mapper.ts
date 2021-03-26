import Discord, {GuildMember} from 'discord.js'
import {User} from 'user-domain'

export default function mapGuildMember({id, displayName}: GuildMember): User {
    return new User(displayName, {username: displayName, id: id})
}

export function mapDiscordUser(user: Discord.User): User {
    return new User(user.username, {username: user.username, id: user.id})
}
