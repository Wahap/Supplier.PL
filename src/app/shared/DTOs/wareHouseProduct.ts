import { Product } from "./product";

export class WareHouseProduct
{
    id:number;
    wareHouseId:number;
    productId:number;
    package:number;
    unitsInPackage:number;
    product:Product;
    status:string;//not mapped
}