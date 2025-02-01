import { Building } from "./Building";

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    code: string;
}

export interface UserWithPermissions {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    code: string;
    accessibleBuildings: Building[];
}