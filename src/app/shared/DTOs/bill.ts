import { customer } from "./customer";
import { address } from "./address";
import { BillProduct } from "./billProduct";
export class Bill
{
    id:number;
    billNumber:number;   
    customerId:number;
    addressId:number;
    deliveryAddressId:number;
    billStatus:number;
    createdDate:Date;  
    deliveryBillDate:Date;
    customer:customer;
    address:address;
    isActive:boolean;
    billProducts:BillProduct[]=[];
}