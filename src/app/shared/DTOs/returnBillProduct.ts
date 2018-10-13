import { Product } from "./product";

export class ReturnBillProduct
{
    id:number;
    billId:number;
    productId:number;
    numberOfPackage:number;
    netSalePrice:number;
    tax:number;
    purchasePrice:number;
    product:Product;
    status:string;
}