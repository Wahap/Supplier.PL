import { Product } from "./product";

export class VendorBillProduct
{
    id:number;
    numberOfPackage:number;
    productId:number;
    vendorBillId:number;
    purchasePrice:number;
    tax:number;
    status:string;
    product:Product;
}