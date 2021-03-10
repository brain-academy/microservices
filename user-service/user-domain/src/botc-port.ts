import {DayOfWeek} from "./day-of-week";
import {User} from "./user";

export interface BotcPort {
    getBotcSubscriptions(): Promise<Map<DayOfWeek, User[]>>
}
