import Discord, {GuildMember, Intents} from 'discord.js';
import {User, UserPort} from 'user-domain';
import {v4} from 'uuid/interfaces';
import config from '../config.json';
import mapDiscordUser from './user-mapper';

const intents = new Intents([
    Intents.NON_PRIVILEGED, // include all non-privileged intents, would be better to specify which ones you actually need
    "GUILD_MEMBERS", // lets you request guild members (i.e. fixes the issue)
]);
const client = new Discord.Client({ws: {intents}})
client.login(config.token)

client.on('ready', () => {
    console.log('fetching')
    client.guilds.fetch(config.server_id)
        .then(guild => guild.members.fetch())
        .then(members => users = [...users, ...members])
    console.log({users})
})

let users: ([string, GuildMember])[] = []

export class DiscordClient implements UserPort {
    findAll(): Promise<User[]> {
        console.log('findAll')
        return Promise.resolve(users.map(user => mapDiscordUser(user)))
    }
    find(id: v4): Promise<User> {
        throw new Error('Method not implemented.');
    }
    create(user: User): Promise<v4 | undefined> {
        throw new Error('Method not implemented.');
    }
    update(id: v4, user: User): void {
        throw new Error('Method not implemented.');
    }
    delete(id: v4): void {
        throw new Error('Method not implemented.');
    }
}
