import { receivedOrderProduct } from "./receivedOrderProduct";

export class receivedOrder
{
    id:number; 

    customerId:number;

    addressId:number;

    orderStatus:number;

  
    orderDate:Date;

    receivedOrderProducts:receivedOrderProduct[];
}