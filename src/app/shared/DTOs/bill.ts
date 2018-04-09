import { customer } from "./customer";
import { address } from "./address";
import { BillProduct } from "./billProduct";
export class Bill
{
    id:number;
    billNumber:number;   
    customerId:number;
    addressId:number;
    billStatus:number;
    createdDate:Date;  
    deliveryDate:Date;
    customer:customer;
    address:address;
    isActive:boolean;
    billProducts:BillProduct[]=[];
}