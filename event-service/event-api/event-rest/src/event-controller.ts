import {DiscordClient} from 'event-discord-client'
import {EventService} from 'event-domain'
import express, {Request, Response} from 'express'

let botcRouter = express.Router()

botcRouter.post('/event', ({body}: Request, response: Response) => {
    new EventService(new DiscordClient()).postInvite(body.message)
    return response.status(200).send()
})

export default botcRouter
