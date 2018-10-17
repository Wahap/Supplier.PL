export class Log
{
    id:number;
    DocumentId:number;
    DocumentType:number;//Bill:1, VendorBill:2, ReturnBill:3, Waybill:4
    operation:string;
    logDate:Date;
    ipAddress:string;
    identifier:string;//db or txt
}