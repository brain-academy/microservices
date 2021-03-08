import {GuildMember} from 'discord.js'
import {User} from 'user-domain'

export default function mapDiscordUser(member: ([string, GuildMember])): User {
    return new User(member[1].displayName, member[1].displayName)
}
