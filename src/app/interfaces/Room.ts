export interface Room {
    id: number;
    code: string;
    capacity: number;
    workstationType: string | null;
    workstationCount: number | null;
}