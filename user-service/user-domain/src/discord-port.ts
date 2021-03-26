import {DayOfWeek} from "./day-of-week"
import {User} from "./user"

export interface DiscordPort {
    getBotcSubscriptions(): Promise<Map<DayOfWeek, User[]>>
    sendDM(id: string, message: string): void
}
