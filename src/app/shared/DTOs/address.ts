import { city } from "./city";

export  class Address
{
    id:number;
    customerId:number;
    cityId:number;
    city:city;
    postCode:string;
    street:string;
    branchName:string;
    isActive:boolean;
    
}