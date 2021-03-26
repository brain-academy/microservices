import {v4} from 'uuid/interfaces';

export interface User {
    id?: v4
    name: string
    discord: DiscordInfo
}

type DiscordInfo = {
    id: string
    username: string
}

export class User implements User {
    constructor(public name: string, public discord: DiscordInfo) {
    }
}

export interface UserSearch { }
