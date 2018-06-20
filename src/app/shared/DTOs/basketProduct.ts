import { Product } from "./product";

export class BasketProduct
{
    id:number;
    waybillId:number;
    billNumber:number;
    product:Product =new Product();
    package:number;
    status:string;
}