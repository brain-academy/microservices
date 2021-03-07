import {v4} from 'uuid/interfaces'
import {User} from './user'
import {UserPort} from './user-port'

export class UserService {

    constructor(
        public port: UserPort
    ) { }

    find_all: () => Promise<User[]> = () => this.port.find_all()
    get_user: (id: v4) => Promise<User> = id => this.port.get_user(id)
    create_user: (user: User) => Promise<v4 | undefined> = user => this.port.create_user(user)
    update_user: (id: v4, user: User) => void = (id, user) => this.port.update_user(id, user)
    delete_user: (id: v4) => void = id => this.port.delete_user(id)

}
