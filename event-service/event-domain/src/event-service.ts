import {EventPort} from './event-port'

export class EventService {

    constructor(
            private eventPort: EventPort
    ) { }

    postInvite: (message: string) => void = (message) => this.eventPort.postInvite(message)

}
