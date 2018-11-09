import { VendorBillProduct } from "./vendorBillProduct";
import { Payment } from "./payment";

export class VendorBill
{
     /**
      *
      */
     constructor() {
         this.id=0;
         
     }
    id:number;
    billNumber:number;
    supplierId:number;
    isPaid:boolean;
    billDate:Date;

    vendorBillProducts:VendorBillProduct[]=[];
    payments:Payment[]=[];
}