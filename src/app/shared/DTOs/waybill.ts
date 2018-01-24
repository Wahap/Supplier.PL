import { customer } from "./customer";
import { address } from "./address";
export class Waybill
{
    id:number;

    customerId:number;

    addressId:number;

    waybillStatus:number;

    waybillDate:Date;

    customer:customer;

    address:address;
}