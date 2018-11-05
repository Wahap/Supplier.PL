import { Customer } from "./customer";
import { Address } from "./address";
import { BillProduct } from "./billProduct";
import { DiscountRate } from "./discountRate";
import { Payment } from "./payment";
export class Bill
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
    discountRateId:number;
    extraDiscount:number;
    billStatus:number;
    createdDate:Date;  
    deliveryDate:Date;
    customer:Customer;
    address:Address;
    isActive:boolean;
    isPaid:boolean;
    grossPrice:number;
    waybillId:number;//No need to have relation bill and waybill, its using just info
    billProducts:BillProduct[]=[];
    discountRate:DiscountRate=new DiscountRate();
    payments:Payment[]=[];
    priceTypeId:number;//Not Mapped in Db
}