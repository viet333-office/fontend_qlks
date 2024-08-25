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
}