import { ReceivedOrderProduct } from "./receivedOrderProduct";
import { DiscountRate } from "./discountRate";

export class ReceivedOrder
{
    /**
     *
     */
    constructor() {
      
        this.createdDate=new Date();
        this.deliveryDate=new Date();
        this.convertedWaybillId=0;
        this.id=0;
        this.extraDiscount=0;
    }
    id:number; 
    customerId:number;
    addressId:number;
    deliveryAddressId:number;
    orderStatus:number;
    createdDate:Date;
    deliveryDate:Date;
    extraDiscount:number;
    convertedWaybillId:number;
    priceTypeId:number;
    discountRateId:number;
    receivedOrderProducts:receivedOrderProduct[]=[];
    discountRate:DiscountRate=new DiscountRate();
}