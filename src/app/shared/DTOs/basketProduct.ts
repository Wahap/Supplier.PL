import { product } from "./product";

export class BasketProduct
{
    id:number;
    waybillId:number;
    product:product =new product();
    package:number;
    status:string;
}