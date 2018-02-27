import { customer } from "./customer";
import { address } from "./address";
import { WaybillProduct } from "./waybillProduct";
export class Waybill
{
    id:number;

    customerId:number;

    addressId:number;

    waybillStatus:number;

    waybillDate:Date;

    customer:customer;

    address:address;
    isActive:boolean;

    waybillProducts:WaybillProduct[]=[];
}