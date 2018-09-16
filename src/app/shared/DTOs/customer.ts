import { Address } from "./address";

export class Customer
{
    id:number;
    customerNumber:string;
    eMail:string;
    isActive:boolean;
    lastname:string;
    customerName:string;
    companyName:string;
    phone:string;
    userName:string;
    password:string;
    addresses:Address[];
}