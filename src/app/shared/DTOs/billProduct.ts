import { Product } from "./product";

export class BillProduct
{
    id:number;
    billId:number;
    productId:number;
    numberOfPackage:number;
    netSalePrice:number;
    tax:number;
    product:Product;
    status:string;
}