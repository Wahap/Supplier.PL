import { Product } from "./product";
import { Waybill } from "./wayBill";

export class WaybillProduct
{
    id:number;

    waybillId:number;

    productId:number;

    numberOfPackage:number;
    netSalePrice:number;
    tax:number;
    product:Product;

    status:string;

  //  waybill:Waybill;
}