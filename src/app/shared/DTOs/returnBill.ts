import { Customer } from "./customer";
import { Address } from "./address";
import { Payment } from "./payment";
import { ReturnBillProduct } from "./returnBillProduct";
export class ReturnBill
{
  
    constructor() {
      this.createdDate=new Date();
      this.deliveryDate=new Date();
        
    }
    id:number;
    billNumber:number;   
    customerId:number;
    addressId:number;
    deliveryAddressId:number;
    extraDiscount:number;
    billStatus:number;
    createdDate:Date;  
    deliveryDate:Date;
    customer:Customer;
    address:Address;
    isActive:boolean;
    isPaid:boolean;
    returnBillProducts:ReturnBillProduct[]=[];
    payments:Payment[]=[];
}