import {EventPort} from 'event-domain'
import Discord, {Intents} from 'discord.js'
import config from '../config.json'

const intents = new Intents([
    "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", // lets you request guild members (i.e. fixes the issue)
])
const client = new Discord.Client({ws: {intents}})
client.login(config.token)

export class DiscordClient implements EventPort {

    postInvite(message: string): void {
    client.channels.fetch(config.botc_irl_channel)
        .then(channel => (<Discord.TextChannel>channel).send(message))
    }

}
