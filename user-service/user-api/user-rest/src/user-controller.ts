import express, {Request, Response} from 'express'
import {DiscordClient} from 'user-discord-client'
import {User, UserService} from 'user-domain'
import {UserRepository} from 'user-repository'
import {v4} from 'uuid/interfaces'

let users_router = express.Router()

users_router.get('/', (_: Request, response: Response) => {
    new UserService(new DiscordClient()).find_all()
        .then(users => response.send(users))
})

users_router.get('/:id', ({params}: Request, response: Response) => {
    new UserService(new UserRepository()).get_user(<v4>(params["id"] as unknown))
        .then(user => response.send(user))
})

users_router.post('/', ({body}: Request, response: Response) => {
    new UserService(new UserRepository()).create_user(body as User)
        .then(id => response.send(id))
})

users_router.put('/:id', ({params, body}: Request, response: Response) => {
    response.send(new UserService(new UserRepository()).update_user(<v4>(params["id"] as unknown), body as User))
})

users_router.delete('/:id', ({params}: Request, response: Response) => {
    response.send(new UserService(new UserRepository()).delete_user(<v4>(params["id"] as unknown)))
})

export default users_router
