import {v4} from 'uuid/interfaces'
import {DiscordPort} from './discord-port'
import {DayOfWeek} from './day-of-week'
import {User, UserSearch} from './user'
import {UserPort} from './user-port'

export class UserService {

    constructor(
        public userPort: UserPort,
        public discordPort: DiscordPort
    ) { }

    findAll: () => Promise<User[]> = () => this.userPort.findAll()
    find: (id: string) => Promise<User> = id => this.userPort.find(id)
    search: (userSearch: UserSearch) => Promise<User[]> = (userSearch) => this.userPort.search(userSearch)
    create: (user: User) => Promise<v4 | undefined> = user => this.userPort.create(user)
    update: (id: v4, user: User) => void = (id, user) => this.userPort.update(id, user)
    delete: (id: v4) => void = id => this.userPort.delete(id)
    getBotcSubscriptions: () => Promise<Map<DayOfWeek, User[]>> = () => this.discordPort.getBotcSubscriptions()
    sendDM: (id: string, message: string) => void = (id, message) => this.discordPort.sendDM(id, message)

}
