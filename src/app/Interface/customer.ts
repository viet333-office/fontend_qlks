export interface Customer {
    id?:number;
    name: string;
    cccd: string;
    address: string;
    phone: string;
}
export interface CustomerSearch {
    name: string;
    cccd: string;
    address: string;
    phone: string;
    page: number,
    size: number
    sortType:string
}

export interface ResponseApi {
    status: boolean;
    message: string;
    content: Customer[];
    totalPages: number;
    totalItems: number;
  }

//   export interface PageEvent {
//     first: number | undefined;
//     page: number;
//     rows: number;
//     pageCount: number;
// }