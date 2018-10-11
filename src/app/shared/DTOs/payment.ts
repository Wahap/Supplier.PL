import { PaymentType } from "./paymentType";

export class Payment
{
    /**
     *
     */
    constructor() {
       this.id=0;
       this.paymentDate=new Date();
        
    }
    id:number;
    paymentTypeId:number;
    billId:number;
    documentType:number;//1:Bill 2:VendorBill
    amount:number;
    paymentDate:Date;
    description:string;
    PaymentType:PaymentType;
}