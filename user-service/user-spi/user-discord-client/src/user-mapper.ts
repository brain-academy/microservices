import Discord, {GuildMember} from 'discord.js'
import {DayOfWeek, User} from 'user-domain'

export default function mapGuildMember(member: ([string, GuildMember])): User {
    return new User(member[1].displayName, member[1].displayName)
}

export function mapDiscordUser(user: Discord.User): User {
    return new User(user.username, user.username)
}
