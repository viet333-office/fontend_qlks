export interface User{
     firstname:string,
     lastname:string,
     email:string,
     password:string,
     role:string
}
export interface Users{
    email:string,
    password:string
}
export interface ResponseApi {
    status: boolean;
    message: string;
    content: [];
}