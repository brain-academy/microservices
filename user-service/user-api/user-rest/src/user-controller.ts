import express, {Request, Response} from 'express'
import {DiscordClient} from 'user-discord-client'
import {User, UserService} from 'user-domain'
import {UserRepository} from 'user-repository'
import {v4} from 'uuid/interfaces'

let userRouter = express.Router()

userRouter.get('/', (_: Request, response: Response) => {
    new UserService(new DiscordClient(), new DiscordClient()).findAll()
        .then(users => response.send(users))
})

userRouter.get('/:id', ({params}: Request, response: Response) => {
    new UserService(new UserRepository(), new DiscordClient()).find(<v4>(params["id"] as unknown))
        .then(user => response.send(user))
})

userRouter.post('/', ({body}: Request, response: Response) => {
    new UserService(new UserRepository(), new DiscordClient()).create(body as User)
        .then(id => response.send(id))
})

userRouter.put('/:id', ({params, body}: Request, response: Response) => {
    response.send(new UserService(new UserRepository(), new DiscordClient()).update(<v4>(params["id"] as unknown), body as User))
})

userRouter.delete('/:id', ({params}: Request, response: Response) => {
    response.send(new UserService(new UserRepository(), new DiscordClient()).delete(<v4>(params["id"] as unknown)))
})

userRouter.get('/botc/subscriptions', (_: Request, response: Response) => {
    return new UserService(new DiscordClient(), new DiscordClient).getBotcSubscriptions()
        .then(it => {
            let serialized = Array.from(it)
            console.log(serialized)
            return serialized
        })
        .then(it => response.status(200).json(it))
})

export default userRouter
