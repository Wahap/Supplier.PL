import { PaymentType } from "./paymentType";

export class Payment
{
    /**
     *
     */
    constructor() {
       this.id=0;
       
        
    }
    id:number;
    paymentTypeId:number;
    billId:number;
    amount:number;
    paymentDate:Date;
    description:string;
    PaymentType:PaymentType;
}