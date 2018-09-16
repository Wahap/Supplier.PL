import { Customer } from "./customer";
import { Address } from "./address";
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
    customer:Customer;
    address:Address;
    isActive:boolean;
    billProducts:BillProduct[]=[];
}