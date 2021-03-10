import {v4} from 'uuid/interfaces';
import {User, UserSearch} from './user';

export interface UserPort {

    findAll(): Promise<User[]>
    find(id: v4): Promise<User>
    search(userSearch: UserSearch): Promise<User[]>
    create(user: User): Promise<v4 | undefined>
    update(id: v4, user: User): void
    delete(id: v4): void
}
