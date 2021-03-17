import {DiscordClient} from 'botc-discord-client'
import {BotcService} from 'botc-domain'
import express, {Request, Response} from 'express'

let botcRouter = express.Router()

botcRouter.post('/event', ({body}: Request, response: Response) => {
    new BotcService(new DiscordClient()).postInvite(body.message)
    return response.status(200).send()
})

export default botcRouter
