import { receivedOrderProduct } from "./receivedOrderProduct";

export class receivedOrder
{
    id:number; 

    customerId:number;

    addressId:number;

    status:number;

  
    orderDate:Date;

    receivedOrderProducts:receivedOrderProduct[];
}