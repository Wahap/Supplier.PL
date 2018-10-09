import { VendorBillProduct } from "./vendorBillProduct";

export class VendorBill
{
    id:number;
    billNumber:string;
    supplierId:number;
    isPaid:boolean;
    billDate:Date;

    vendorBillProducts:VendorBillProduct[]=[];
}