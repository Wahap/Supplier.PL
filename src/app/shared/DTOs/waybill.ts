import { customer } from "./customer";
import { address } from "./address";
import { WaybillProduct } from "./waybillProduct";
export class Waybill
{
    id:number;

    customerId:number;

    addressId:number;
    deliveryAddressId:number;

    waybillStatus:number;

    createdDate:Date;  
    deliveryDate:Date;

    customer:customer;

    address:address;
    isActive:boolean;

    waybillProducts:WaybillProduct[]=[];
}