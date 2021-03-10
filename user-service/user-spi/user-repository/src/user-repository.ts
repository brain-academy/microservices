import {Pool} from 'pg';
import {User, UserPort} from 'user-domain';
import {UserSearch} from 'user-domain/src/user';
import {v4} from 'uuid/interfaces';

const pool = new Pool({
    user: 'postgres',
    host: 'database',
    database: 'microservices',
    password: 'admin',
    port: 5432,
});
pool.connect()

export class UserRepository implements UserPort {

    findAll(): Promise<User[]> {
        return pool.query(`SELECT * from users`)
            .then(({rows: users}: {rows: User[]}) => users)
    }
    find(id: v4): Promise<User> {
        return pool.query(`SELECT * from users WHERE id = $1`, [id])
            .then(({rows: user}: {rows: User[]}) => user[0])
    }
    search(userSearch: UserSearch): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    create(user: User): Promise<v4 | undefined> {
        return pool.query(`INSERT into users (name, discord_username) VALUES ($1, $2) RETURNING id`, [user.name, user.discordUserame])
            .then(({rows}: {rows: {id: v4 | undefined}[]}) => {return rows[0].id})
    }
    update(id: v4, user: User): void {
        pool.query(`UPDATE users SET name = $1, discord_username = $2 WHERE id = $4`,
            [user.name, user.discordUserame, id])
    }
    delete(id: v4): void {
        pool.query(`DELETE from users where id = $1`, [id])
    }

}
