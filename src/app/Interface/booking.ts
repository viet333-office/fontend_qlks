import { Customer } from "./customer";
import { Room } from "./room";

export interface Booking {
    id?: number;
    start: Date;
    end: Date;
    customer: Customer
    room: Room
}
