import {v4} from 'uuid/interfaces'
import {User} from './user'
import {UserPort} from './user-port'

export class UserService {

    constructor(
        public port: UserPort
    ) { }

    find_all: () => Promise<User[]> = () => this.port.findAll()
    get_user: (id: v4) => Promise<User> = id => this.port.find(id)
    create_user: (user: User) => Promise<v4 | undefined> = user => this.port.create(user)
    update_user: (id: v4, user: User) => void = (id, user) => this.port.update(id, user)
    delete_user: (id: v4) => void = id => this.port.delete(id)

}
