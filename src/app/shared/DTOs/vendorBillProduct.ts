import { Product } from "./product";

export class VendorBillProduct
{
    id:number;
    numberOfPackage:number;
    unitsInPackage:number;
    productId:number;
    wareHouseId:number;
    vendorBillId:number;
    purchasePrice:number;
    tax:number;
    status:string;
    product:Product;
}