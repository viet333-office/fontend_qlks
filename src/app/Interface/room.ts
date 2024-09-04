export interface Room {
    id?: number;
    name: string;
    room: string;
    value: number;
    status: string;
    stay: string
}

export interface IStatus {
    name: string
}
export interface RoomSearch {
    name: string;
    room: string;
    value: number;
    status: string;
    stay: string
    page: number,
    size: number
    arrange: string
}

export interface ResponseApi {
    status: boolean;
    message: string;
    content: Room[];
    totalPages: number;
    totalItems: number;
}

export interface DropdownEvent {
    value: { name: string };
}
