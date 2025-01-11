import { User } from "./User";

export interface Reservation {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    roomCode: string;
    buildingCode: string;
    status: string;
}

export interface ReservationWithPerson {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    roomCode: string;
    buildingCode: string;
    status: string;
    person: User;
}