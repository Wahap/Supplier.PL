import { address } from "./address";

export class customer
{
    id:number;
    eMail:string;
    isActive:boolean;
    lastname:string;
    customerName:string;
    companyName:string;
    phone:string;
    userName:string;
    password:string;
    addresses:address[];
}