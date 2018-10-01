import { PaymentType } from "./paymentType";

export class Payment
{
    id:number;
    paymentTypeId:number;
    billId:number;
    amount:number;
    paymentDate:Date;
    description:string;
    PaymentType:PaymentType;
}