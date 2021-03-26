import express, {Request, Response} from 'express'
import {DiscordClient} from 'user-discord-client'
import {User, UserService} from 'user-domain'
import {UserRepository} from 'user-repository'
import {v4} from 'uuid/interfaces'

let userRouter = express.Router()

userRouter.route('/')
    .get((_: Request, response: Response) => {
        new UserService(new DiscordClient(), new DiscordClient()).findAll()
            .then(users => response.send(users))
    })
    .post(({body}: Request, response: Response) => {
        new UserService(new UserRepository(), new DiscordClient()).create(body as User)
            .then(id => response.send(id))
    })

userRouter.route('/:id')
    .get(({params}: Request, response: Response) => {
        new UserService(new UserRepository(), new DiscordClient()).find(<v4>(params["id"] as unknown))
            .then(user => response.send(user))
    })
    .put(({params, body}: Request, response: Response) => {
        response.send(new UserService(new UserRepository(), new DiscordClient()).update(<v4>(params["id"] as unknown), body as User))
    })
    .delete(({params}: Request, response: Response) => {
        response.send(new UserService(new UserRepository(), new DiscordClient()).delete(<v4>(params["id"] as unknown)))
    })

userRouter.get('/botc/subscriptions', (_: Request, response: Response) => {
    return new UserService(new DiscordClient(), new DiscordClient()).getBotcSubscriptions()
        .then(it => response.status(200).json(Array.from(it)))
})

userRouter.post('/:discordId/dm', ({body: {message}, params}: Request, response: Response) => {
    console.log({id: params.discordId, message})
    new UserService(new DiscordClient(), new DiscordClient()).sendDM(params.discordId, message)
    return response.status(202).send()
})

export default userRouter
