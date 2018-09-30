import { Address } from "./address";

export class Customer
{
    /**
     *
     */
    constructor() {
       this.id=0;
       this.addresses=[];
        
    }
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
    extraDiscount:number;
    addresses:Address[];
}