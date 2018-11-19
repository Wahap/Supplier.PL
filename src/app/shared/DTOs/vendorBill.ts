import { VendorBillProduct } from "./vendorBillProduct";
import { Payment } from "./payment";

export class VendorBill
{
     /**
      *
      */
     constructor() {
         this.id=0;
         this.totalPurchasePrice=0;
     }
    id:number;
    billNumber:number;
    supplierId:number;
    isPaid:boolean;
    billDate:Date;
    totalPurchasePrice:number;
    vendorBillProducts:VendorBillProduct[]=[];
    payments:Payment[]=[];
}