import {v4} from 'uuid/interfaces';

export interface User {
    id?: v4
    name: string
    discordUserame: string
}

export class User implements User {
    constructor(public name: string, public discordUsername: string) {
    }
}
