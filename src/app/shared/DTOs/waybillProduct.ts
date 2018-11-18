import { Product } from "./product";
import { Waybill } from "./wayBill";

export class WaybillProduct
{
    id:number;
    waybillId:number;
    productId:number;
    wareHouseId:number;
    rowNumber:number;
    numberOfPackage:number;
    unitsInPackage:number;
    netSalePrice:number;
    purchasePrice:number;
    tax:number;
    product:Product;
    status:string;

  //  waybill:Waybill;
}