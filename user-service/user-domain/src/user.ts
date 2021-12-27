import {v4} from 'uuid/interfaces';

export interface User {
    id?: v4
    name: string
    discord: DiscordInfo
	roles: Role[]
}

export interface Role {
	name: string
}

interface DiscordInfo {
    id: string
    username?: string | null
	avatar?: string | null
}

export class User implements User {
    constructor(public name: string, public discord: DiscordInfo, public roles: Role[] = []) {
    }
}

export interface UserSearch { }
