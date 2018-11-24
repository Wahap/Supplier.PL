import { Product } from "./product";

export class ReceivedOrderProduct
{
   id:number;
   receivedOrderId:number;
   productId:number;
   numberOfPackage:number;
   unitsInPackage:number;
   wareHouseId:number;
   netSalePrice:number;
   purchasePrice:number;
   tax:number;
   rowNumber:number;
   status:string;
   product:Product;
}