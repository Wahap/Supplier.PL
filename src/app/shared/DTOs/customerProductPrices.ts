import { Product } from "./product";
import { Customer } from "./customer";   

export class CustomerProductPrices
{
    id:number;
    customerId:number;
    price:number;
    productId:number;
    product:Product;
    customer:Customer;
}