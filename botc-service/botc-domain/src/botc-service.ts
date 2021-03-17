import {BotcPort} from './botc-port'

export class BotcService {

    constructor(
        private botcPort: BotcPort
    ) { }

    postInvite: (message: string) => void = (message) => this.botcPort.postInvite(message)

}
