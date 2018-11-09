import { Product } from "./product";

export class ReturnBillProduct
{
    id:number;
    returnBillId:number;
    productId:number;
    numberOfPackage:number;
    unitsInPackage:number;
    netSalePrice:number;
    tax:number;
    purchasePrice:number;
    product:Product;
    status:string;
    
}