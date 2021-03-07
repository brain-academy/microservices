import {Client} from 'pg'
import {User, UserPort} from 'user-domain'
import {v4} from 'uuid/interfaces'

const client = new Client({
    user: 'postgres',
    host: 'database',
    database: 'microservices',
    password: 'admin',
    port: 5432,
});
setTimeout(() => client.connect(), 5000)

export class UserRepository implements UserPort {

    find_all(): Promise<User[]> {
        return client.query(`SELECT * from users`)
            .then(({rows: users}: {rows: User[]}) => users)
    }
    get_user(id: v4): Promise<User> {
        return client.query(`SELECT * from users WHERE id = $1`, [id])
            .then(({rows: user}: {rows: User[]}) => user[0])
    }
    create_user(user: User): Promise<v4 | undefined> {
        return client.query(`INSERT into users (name, discord_username) VALUES ($1, $2) RETURNING id`, [user.name, user.discordUserame])
            .then(({rows}: {rows: {id: v4 | undefined}[]}) => {return rows[0].id})
    }
    update_user(id: v4, user: User): void {
        client.query(`UPDATE users SET name = $1, discord_username = $2 WHERE id = $4`,
            [user.name, user.discordUserame, id])
    }
    delete_user(id: v4): void {
        client.query(`DELETE from users where id = $1`, [id])
    }

}
