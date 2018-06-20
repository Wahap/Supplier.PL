import { Product } from "./product";
import { customer } from "./customer";   

export class CustomerProductPrices
{
    id:number;
    customerId:number;
    price:number;
    productId:number;
    product:Product;
    customer:customer;
}