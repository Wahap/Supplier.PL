import { Product } from "./product";

export class BillProduct
{
    id:number;
    billId:number;
    productId:number;
    wareHouseId:number;
    rowNumber:number;
    numberOfPackage:number;
    unitsInPackage:number;
    netSalePrice:number;
    tax:number;
    purchasePrice:number;
    product:Product;
    status:string;
   
}