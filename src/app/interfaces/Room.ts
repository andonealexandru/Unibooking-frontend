export interface Room {
    id: number;
    code: string;
    buildingCode: string;
    capacity: number;
    workstationType: string | null;
    workstationCount: number | null;
}

export interface RoomInput {
    id: number;
    code: string;
    buildingCode: string;
    capacity: number | null;
    workstationType: string | null;
    workstationCount: number | null;
}


export interface RoomWithSlot {
    id: number;
    code: string;
    buildingCode: string;
    capacity: number;
    workstationType: string | null;
    workstationCount: number | null;
    start: string;
    end: string;
    date: string;
}