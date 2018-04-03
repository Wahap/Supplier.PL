import { product } from "./product";

export class BasketProduct
{
    id:number;
    waybillId:number;
    billNumber:number;
    product:product =new product();
    package:number;
    status:string;
}