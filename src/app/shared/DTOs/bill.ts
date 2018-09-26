import { Customer } from "./customer";
import { Address } from "./address";
import { BillProduct } from "./billProduct";
import { DiscountRate } from "./discountRate";
export class Bill
{
    id:number;
    billNumber:number;   
    customerId:number;
    addressId:number;
    deliveryAddressId:number;
    discountRateId:number;
    extraDiscount:number;
    billStatus:number;
    createdDate:Date;  
    deliveryDate:Date;
    customer:Customer;
    address:Address;
    isActive:boolean;
    billProducts:BillProduct[]=[];
    discountRate:DiscountRate=new DiscountRate();
}