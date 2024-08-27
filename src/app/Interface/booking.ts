

export interface Booking {
    id?: number;
    start: Date | null;
    end: Date | null;
    id_customer:string;
    id_room: string;
}
export interface BookingSearch {
    start: Date;
    end:Date;
    id_customer: string;
    id_room:string;
    page: number,
    size: number
    arrange:string
}

export interface ResponseApi {
    status: boolean;
    message: string;
    content: Booking[];
    totalPages: number;
    totalItems: number;
  }