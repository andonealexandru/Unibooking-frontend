import { User } from "./User";

export interface Reservation {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    roomCode: string;
    buildingCode: string;
    status: string;
    description: string;
}

export interface ReservationWithPerson {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    roomCode: string;
    buildingCode: string;
    status: string;
    description: string;
    person: User;
}