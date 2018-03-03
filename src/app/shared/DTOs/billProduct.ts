import { product } from "./product";

export class BillProduct
{
    id:number;
    billId:number;
    productId:number;
    numberOfPackage:number;
    netSalePrice:number;
    tax:number;
    product:product;
    status:string;
}