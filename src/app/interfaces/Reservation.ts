import { User } from "./User";

export interface Reservation {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    roomCode: string;
}

export interface ReservationWithPerson {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    roomCode: string;
    status: string;
    person: User;
}