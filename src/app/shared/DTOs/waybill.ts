import { Customer } from "./customer";
import { Address } from "./address";
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

    customer:Customer;

    address:Address;
    isActive:boolean;

    waybillProducts:WaybillProduct[]=[];
}