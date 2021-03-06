import { Customer } from "./customer";
import { Address } from "./address";
import { DiscountRate } from "./discountRate";
import { WaybillProduct } from "./waybillProduct";
export class Waybill
{
    /**
     *
     */
    constructor() {
        //set dates default values
      this.createdDate=new Date();
      this.deliveryDate=new Date();
      this.convertedBillNumber=0;
      this.id=0;
      this.extraDiscount=0;
        
    }
    id:number;
    customerId:number;
    addressId:number;
    deliveryAddressId:number;
    discountRateId:number;
    convertedBillNumber:number;
    waybillStatus:number;
    createdDate:Date;
    deliveryDate:Date;
    customer:Customer;
    address:Address;
    isActive:boolean;
    extraDiscount:number;
    waybillProducts:WaybillProduct[]=[];
    discountRate:DiscountRate=new DiscountRate();
    priceTypeId:number;
    
}